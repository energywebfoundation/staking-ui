import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as RoleEnrolmentActions from './role-enrolment.actions';
import { catchError, filter, finalize, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { EnvService } from '../../shared/services/env/env.service';
import { LoadingService } from '../../shared/services/loading.service';
import { from, of } from 'rxjs';
import { IamService } from '../../shared/services/iam.service';
import { Claim, RegistrationTypes } from 'iam-client-lib';
import { RoleEnrolmentStatus } from './models/role-enrolment-status.enum';
import { SwitchboardToastrService } from '../../shared/services/switchboard-toastr.service';
import { truthy } from '@operators';

const REQUIRED_ROLE_FOR_STAKING = 'email.roles.verification.apps.energyweb.iam.ewc';
const PATRON_ROLE_VERSION = 1;

@Injectable()
export class RoleEnrolmentEffects {

  detectActualEnrolmentStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.detectActualStatus),
      filter(() => this.envService.checkStakingVerification),
      tap(() => this.loadingService.show()),
      switchMap(() => from(this.iamService.claimsService.getClaimsByRequester({
          did: this.iamService.signerService.did,
          namespace: 'verification.apps.energyweb.iam.ewc'
        })).pipe(
          map((roles) => roles
            .filter(item => !item.isRejected)
            .filter((item) => item.claimType === REQUIRED_ROLE_FOR_STAKING && item.registrationTypes.includes(RegistrationTypes.OnChain))),
          mergeMap((roles) => [RoleEnrolmentActions.setStatus({status: this.getStatus(roles)}), RoleEnrolmentActions.setEnrolment({enrolment: roles[0]})]),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  checkIfApprovedRoleIsSynced$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.setStatus),
      filter(({status}) => status === RoleEnrolmentStatus.ENROLED_APPROVED),
      tap(() => this.loadingService.show()),
      switchMap(() => from(this.iamService.claimsService.hasOnChainRole(this.iamService.signerService.did, REQUIRED_ROLE_FOR_STAKING, PATRON_ROLE_VERSION))
        .pipe(
          truthy(),
          map(() => RoleEnrolmentActions.setStatus({status: RoleEnrolmentStatus.ENROLED_SYNCED})),
          finalize(() => this.loadingService.hide())
        )),
    )
  );

  addEnrolmentToClaimManager$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.addRole),
      tap(() => this.loadingService.show('Adding role...')),
      switchMap(() => from(this.iamService.claimsService.getClaimsByRequester({
          did: this.iamService.signerService.did,
          namespace: 'verification.apps.energyweb.iam.ewc'
        })).pipe(
          map(roles => roles.filter(item => !item.isRejected)),
          switchMap((roles: Claim[]) => from(this.iamService.claimsService.registerOnchain(roles[0]))
            .pipe(
              map(() => RoleEnrolmentActions.setStatus({status: RoleEnrolmentStatus.ENROLED_SYNCED})),
              catchError(err => {
                console.log(err);
                this.toastrService.error(err?.message);
                return of(RoleEnrolmentActions.addRoleFailure({error: err}));
              }),
              finalize(() => this.loadingService.hide())
            )),
        )
      ),
    )
  );

  enrolForPatronRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.enrolFor),
      tap(() => this.loadingService.show()),
      switchMap(({email}) => from(this.iamService.claimsService.createClaimRequest({
          registrationTypes: [RegistrationTypes.OnChain],
          claim: {
            fields: [{
              key: 'email',
              value: email
            }],
            claimType: REQUIRED_ROLE_FOR_STAKING,
            claimTypeVersion: PATRON_ROLE_VERSION
          }
        })).pipe(
          map(() => RoleEnrolmentActions.setStatus({status: RoleEnrolmentStatus.ENROLED_NOT_APPROVED})),
          catchError(err => {
            console.log(err);
            this.toastrService.error(err?.message);
            return of(RoleEnrolmentActions.enrolForFailure({error: err}));
          }),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  cancelEnrolmentRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.cancelEnrolmentRequest),
      tap(() => this.loadingService.show('Canceling enrolment request...')),
      switchMap(() => from(this.iamService.claimsService.getClaimsByRequester({
          did: this.iamService.signerService.did,
          namespace: 'verification.apps.energyweb.iam.ewc'
        })).pipe(
          map(roles => roles.filter(item => !item.isRejected)),
          switchMap((roles) => from(this.iamService.claimsService.deleteClaim({
              id: roles[0]?.id,
            }))
              .pipe(
                map(() => RoleEnrolmentActions.setStatus({status: RoleEnrolmentStatus.NOT_ENROLED})),
                catchError(err => {
                  console.log(err);
                  this.toastrService.error(err?.message);
                  return of(RoleEnrolmentActions.cancelEnrolmentRequestFailure({error: err}));
                }),
                finalize(() => this.loadingService.hide())
              )
          ),
        finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  constructor(private actions$: Actions,
              private store: Store,
              private envService: EnvService,
              private loadingService: LoadingService,
              private iamService: IamService,
              private toastrService: SwitchboardToastrService) {
  }


  private getStatus(enrolments) {
    if (enrolments.length === 0) {
      return RoleEnrolmentStatus.NOT_ENROLED;
    }
    if (enrolments[0].isAccepted) {
      return RoleEnrolmentStatus.ENROLED_APPROVED;
    }
    return RoleEnrolmentStatus.ENROLED_NOT_APPROVED;
  }
}
