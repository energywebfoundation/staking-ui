import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as RoleEnrolmentActions from './role-enrolment.actions';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { EnvService } from '../../shared/services/env/env.service';
import { LoadingService } from '../../shared/services/loading.service';
import { from } from 'rxjs';
import { IamService } from '../../shared/services/iam.service';
import { RegistrationTypes } from 'iam-client-lib';
import { RoleEnrolmentStatus } from './models/role-enrolment-status.enum';

const REQUIRED_ROLE_FOR_STAKING = 'email.roles.verification.apps.energyweb.iam.ewc';

@Injectable()
export class RoleEnrolmentEffects {

  detectActualEnrolmentStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleEnrolmentActions.detectActualStatus),
      filter(() => this.envService.checkStakingVerification),
      tap(() => this.loadingService.show()),
      switchMap(() => from(this.iamService.claimsService.getClaimsByRequester({
          did: this.iamService.signerService.did,
        })).pipe(
          map((roles) => {
            const enrolments = roles.filter((item) =>
              item.claimType === REQUIRED_ROLE_FOR_STAKING && item.registrationTypes.includes(RegistrationTypes.OnChain));
            if (enrolments.length === 0) {
              return RoleEnrolmentActions.setStatus({status: RoleEnrolmentStatus.NOT_ENROLED});
            }
            if (enrolments[0].isAccepted) {
              return RoleEnrolmentActions.setStatus({status: RoleEnrolmentStatus.ENROLED_APPROVED});
            }
            return RoleEnrolmentActions.setStatus({status: RoleEnrolmentStatus.ENROLED_NOT_APPROVED});
          }),
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
      switchMap(() => from(this.iamService.claimsService.hasOnChainRole(this.iamService.signerService.did, REQUIRED_ROLE_FOR_STAKING, 1))
        .pipe(
          filter((v) => !v),
          map(() => RoleEnrolmentActions.setStatus({status: RoleEnrolmentStatus.ENROLED_SYNCED})),
        )),
      finalize(() => this.loadingService.hide())
    )
  );

  constructor(private actions$: Actions,
              private store: Store,
              private envService: EnvService,
              private loadingService: LoadingService,
              private iamService: IamService) {
  }
}
