import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  checkRevealedSnapshots,
  checkRevealedSnapshotsSuccess,
  checkSnapshots,
  enrolToSnapshotRole,
  enrolToSnapshots,
  syncSnapshotEnrolment,
} from './snapshot.actions';
import {
  filter,
  finalize,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { EnvService } from '../../shared/services/env/env.service';
import { ClaimsService } from '../../shared/services/claims/claims.service';
import { getSnapshotStatus, getUserSnapshotRoles } from './snapshot.selectors';
import { RoleEnrolmentStatus } from '../role-enrolment/models/role-enrolment-status.enum';
import { forkJoin, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SnapshotSuccessComponent } from '../../modules/ewt-patron/snapshot-success/snapshot-success.component';
import { Claim } from 'iam-client-lib';

@Injectable()
export class SnapshotEffects {
  checkEnrolments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkRevealedSnapshots),
      switchMap(() =>
        this.claimService.getClaims().pipe(
          map((roles) => {
            const snapshotRoles = new Set(this.envService.snapshotRoles);
            return roles.filter((role) => snapshotRoles.has(role.claimType));
          }),
          switchMap((roles: Claim[]) => {
            return forkJoin([
              ...roles.map((role) =>
                from(this.claimService.hasOnChainRole(role))
              ),
            ]);
          }),
          map((snapshotRoles) =>
            checkRevealedSnapshotsSuccess({ snapshotRoles })
          )
        )
      )
    )
  );

  checkSnapshots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkSnapshots),
      withLatestFrom(this.store.select(getUserSnapshotRoles)),
      map(([, snapshotRoles]) => {
        const snapshots = this.envService.snapshotRoles.filter(
          (role, index) =>
            getSnapshotStatus(snapshotRoles, index) ===
            RoleEnrolmentStatus.NOT_ENROLED
        );
        return enrolToSnapshots({ claims: snapshots });
      })
    )
  );

  enrolForSnapshot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enrolToSnapshotRole),
      map(({ id }) => this.envService.snapshotRoles[id]),
      filter(Boolean),
      switchMap((role: string) =>
        this.claimService
          .createClaim(role)
          .pipe(map(() => checkRevealedSnapshots()))
      )
    )
  );

  publishSnapshot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(syncSnapshotEnrolment),
      map(({ id }) => this.envService.snapshotRoles[id]),
      filter(Boolean),
      withLatestFrom(this.store.select(getUserSnapshotRoles)),
      map(([roleName, roles]) =>
        roles
          .filter((role) => role.claimType === roleName)
          .filter((role) => !role.isRejected)
          .filter((role) => role.isAccepted)
          .shift()
      ),
      switchMap((claim: Claim) =>
        this.claimService
          .publishApprovedClaim(claim)
          .pipe(map(() => checkRevealedSnapshots()))
      )
    )
  );

  enrolForSnapshots$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(enrolToSnapshots),
        switchMap(({ claims }) =>
          forkJoin(
            ...claims.map((claim) => {
              return this.claimService.createClaim(claim);
            })
          ).pipe(
            finalize(() => {
              this.dialog.open(SnapshotSuccessComponent, {
                width: '400px',
                maxWidth: '100%',
              });
            })
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private envService: EnvService,
    private claimService: ClaimsService,
    private dialog: MatDialog
  ) {}
}
