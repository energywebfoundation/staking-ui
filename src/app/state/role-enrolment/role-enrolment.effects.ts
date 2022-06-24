import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as RoleEnrolmentActions from './role-enrolment.actions';
import {
  catchError,
  filter,
  finalize,
  map,
  mergeMap,
  switchMap,
  takeWhile,
  tap
} from 'rxjs/operators';
import { EnvService } from '../../shared/services/env/env.service';
import { LoadingService } from '../../shared/services/loading.service';
import { from, of, timer } from 'rxjs';
import { IamService } from '../../shared/services/iam.service';
import { Claim, RegisterOnchainOptions, RegistrationTypes } from 'iam-client-lib';
import { RoleEnrolmentStatus } from './models/role-enrolment-status.enum';
import { SwitchboardToastrService } from '../../shared/services/switchboard-toastr.service';
import { truthy } from '@operators';

const PATRON_ROLE_VERSION = 1;

@Injectable()
export class RoleEnrolmentEffects {
  detectActualEnrolmentStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.detectActualStatus),
      filter(() => this.envService.checkStakingVerification),
      tap(() => this.loadingService.show()),
      switchMap(() =>
        this.getClaims().pipe(
          map(roles =>
            roles
              .filter(item => !item.isRejected)
              .filter(
                item =>
                  item.claimType === this.envService.patronRole &&
                  item.registrationTypes.includes(RegistrationTypes.OnChain)
              )
          ),
          mergeMap(roles => [
            RoleEnrolmentActions.setStatus({ status: this.getStatus(roles) }),
            RoleEnrolmentActions.setEnrolment({ enrolment: roles[0] })
          ]),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  checkIfApprovedRoleIsSynced$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.setStatus),
      filter(({ status }) => status === RoleEnrolmentStatus.ENROLED_APPROVED),
      tap(() => this.loadingService.show()),
      switchMap(() =>
        from(
          this.iamService.claimsService.hasOnChainRole(
            this.iamService.signerService.did,
            this.envService.patronRole,
            PATRON_ROLE_VERSION
          )
        ).pipe(
          truthy(),
          map(() =>
            RoleEnrolmentActions.setStatus({
              status: RoleEnrolmentStatus.ENROLED_SYNCED
            })
          ),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  addEnrolmentToClaimManager$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.addRole),
      tap(() => this.loadingService.show('Adding role...')),
      switchMap(() =>
        this.getClaims().pipe(
          map(roles => roles.filter(item => !item.isRejected)),
          switchMap((roles: Claim[]) =>
            from(this.iamService.claimsService.registerOnchain(roles[0] as RegisterOnchainOptions)).pipe(
              map(() =>
                RoleEnrolmentActions.setStatus({
                  status: RoleEnrolmentStatus.ENROLED_SYNCED
                })
              ),
              catchError(err => {
                console.log(err);
                this.toastrService.error(err?.message);
                return of(RoleEnrolmentActions.addRoleFailure({ error: err }));
              }),
              finalize(() => this.loadingService.hide())
            )
          )
        )
      )
    )
  );

  enrolForPatronRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.enrolFor),
      tap(() => this.loadingService.show()),
      switchMap(({ email }) =>
        from(
          this.iamService.claimsService.createClaimRequest({
            registrationTypes: [RegistrationTypes.OnChain],
            claim: {
              requestorFields: [
                {
                  key: 'email',
                  value: email
                }
              ],
              claimType: this.envService.patronRole,
              claimTypeVersion: PATRON_ROLE_VERSION
            }
          })
        ).pipe(
          map(() =>
            RoleEnrolmentActions.setStatus({
              status: RoleEnrolmentStatus.ENROLED_NOT_APPROVED
            })
          ),
          catchError(err => {
            console.log(err);
            this.toastrService.error(err?.message);
            return of(RoleEnrolmentActions.enrolForFailure({ error: err }));
          }),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  cancelEnrolmentRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.cancelEnrolmentRequest),
      tap(() => this.loadingService.show('Checking enrolment request...')),
      switchMap(() =>
        this.getClaims().pipe(
          map(roles => roles.filter(item => !item.isRejected)[0]),
          map(role => {
            if (!role) {
              return RoleEnrolmentActions.claimDoNotExist();
            }
            return RoleEnrolmentActions.deleteClaim({ id: role.id });
          }),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  deleteClaim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.deleteClaim),
      tap(() => this.loadingService.show('Canceling enrolment request...')),
      switchMap(({ id }) =>
        from(this.iamService.claimsService.deleteClaim({ id })).pipe(
          map(() =>
            RoleEnrolmentActions.setStatus({
              status: RoleEnrolmentStatus.NOT_ENROLED
            })
          ),
          catchError(err => {
            console.log(err);
            this.toastrService.error(err?.message);
            return of(
              RoleEnrolmentActions.cancelEnrolmentRequestFailure({ error: err })
            );
          }),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  searchForEnroledRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.setStatus),
      filter(
        ({ status }) => status === RoleEnrolmentStatus.ENROLED_NOT_APPROVED
      ),
      tap(() => (this._pool = true)),
      switchMap(() =>
        timer(0, 30000).pipe(
          switchMap(() =>
            this.getClaims().pipe(
              map(roles => {
                const isNotRejected = roles.filter(item => !item.isRejected)[0];
                if (isNotRejected?.isAccepted) {
                  return RoleEnrolmentActions.enrolmentApproved();
                }

                const allRejected = roles.filter(item => item.isRejected);
                if (!isNotRejected && allRejected) {
                  return RoleEnrolmentActions.enrolmentRejected();
                }
                return RoleEnrolmentActions.continuePooling();
              })
            )
          ),
          takeWhile(() => this._pool)
        )
      )
    )
  );

  enrolmentRejected$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RoleEnrolmentActions.enrolmentRejected),
        map(() => {
          this._pool = false;
          this.toastrService.error(
            'Enrolment Rejected! Probably you used this email twice or from restricted domain',
            'Email Enrolment',
            { disableTimeOut: true }
          );
        })
      ),
    { dispatch: false }
  );

  enrolmentApproved$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RoleEnrolmentActions.enrolmentApproved),
        map(() => {
          this._pool = false;
        })
      ),
    { dispatch: false }
  );

  get pool() {
    return this._pool;
  }

  private _pool = true;

  constructor(
    private actions$: Actions,
    private store: Store,
    private envService: EnvService,
    private loadingService: LoadingService,
    private iamService: IamService,
    private toastrService: SwitchboardToastrService
  ) {}

  private getClaims() {
    return from(
      this.iamService.claimsService.getClaimsByRequester({
        did: this.iamService.signerService.did,
        namespace: this.envService.patronRole.split('.roles.').pop()
      })
    );
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
