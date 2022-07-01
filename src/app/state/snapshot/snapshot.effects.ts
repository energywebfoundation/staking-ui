import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  checkRevealedSnapshots,
  checkRevealedSnapshotsSuccess,
  enrolToSnapshotRole,
  enrolToSnapshotRoleSuccess,
  syncSnapshotEnrolment,
  syncSnapshotEnrolmentSuccess,
  updateRevealedSnapshots,
} from './snapshot.actions';
import {
  filter,
  finalize,
  map,
  mergeMap,
  switchMap,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { EnvService } from '../../shared/services/env/env.service';
import { ClaimsService } from '../../shared/services/claims/claims.service';
import { getSnapshotStatus, getUserSnapshotRoles } from './snapshot.selectors';
import { forkJoin, from, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Claim } from 'iam-client-lib';
import { LoadingService } from '../../shared/services/loading.service';
import { RoleEnrolmentStatus } from '../role-enrolment/models/role-enrolment-status.enum';

@Injectable()
export class SnapshotEffects {
  checkEnrolments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkRevealedSnapshots),
      this.getSnapshotEnrolments(true, this.envService.snapshotRoles)
    )
  );

  updateEnrolments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRevealedSnapshots),
      this.getSnapshotEnrolments(false, this.envService.snapshotRoles)
    )
  );

  enrolForSnapshot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enrolToSnapshotRole),
      tap(() => this.loadingService.show()),
      tap(({ id }) => (this.snapshotId = id)),
      tap(
        ({ id }) => (this.snapshotStatus = RoleEnrolmentStatus.ENROLED_APPROVED)
      ),
      map(({ id }) => this.envService.snapshotRoles[id]),
      filter(Boolean),
      switchMap((role: string) =>
        this.claimService.createClaim(role).pipe(
          mergeMap(() => [
            updateRevealedSnapshots(),
            enrolToSnapshotRoleSuccess({
              status: RoleEnrolmentStatus.ENROLED_APPROVED,
            }),
          ]),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  publishSnapshot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(syncSnapshotEnrolment),
      tap(() => this.loadingService.show()),
      tap(({ id }) => (this.snapshotId = id)),
      tap(
        ({ id }) => (this.snapshotStatus = RoleEnrolmentStatus.ENROLED_SYNCED)
      ),
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
        this.claimService.publishApprovedClaim(claim).pipe(
          mergeMap(() => [
            updateRevealedSnapshots(),
            syncSnapshotEnrolmentSuccess({
              status: RoleEnrolmentStatus.ENROLED_SYNCED,
            }),
          ]),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  checkSnapshotRoleStatus = createEffect(() =>
    this.actions$.pipe(
      ofType(enrolToSnapshotRoleSuccess, syncSnapshotEnrolmentSuccess),
      tap(() => {
        this._pool = true;
      }),
      switchMap(() =>
        timer(0, 3000).pipe(
          this.getSnapshotEnrolments(false, this.envService.snapshotRoles),
          takeWhile(() => this._pool)
        )
      )
    )
  );

  disablePool$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkRevealedSnapshotsSuccess),
        filter(() => this.pool),
        map(({ snapshotRoles }) => {
          const rolesWithSnapshotName = snapshotRoles.filter(
            (role) =>
              role.claimType === this.envService.snapshotRoles[this.snapshotId]
          );
          const statuses = getSnapshotStatus(
            rolesWithSnapshotName,
            this.snapshotId
          );
          if (
            statuses.includes(this.snapshotStatus) ||
            statuses.includes(RoleEnrolmentStatus.REJECTED)
          ) {
            this._pool = false;
            this.snapshotStatus = null;
            this.snapshotId = null;
          }
        })
      ),
    { dispatch: false }
  );

  get pool() {
    return this._pool;
  }

  private _pool = true;
  private snapshotId: number;
  private snapshotStatus: RoleEnrolmentStatus;

  private getSnapshotEnrolments(
    showLoader: boolean,
    predefinedSnapshotRoles: string[]
  ) {
    return switchMap(() =>
      this.claimService.getClaims(showLoader).pipe(
        map((roles) => {
          const snapshotRoles = new Set(predefinedSnapshotRoles);
          return roles.filter((role) => snapshotRoles.has(role.claimType));
        }),
        switchMap((roles: Claim[]) => {
          return forkJoin([
            ...roles.map((role) =>
              from(this.claimService.hasOnChainRole(role))
            ),
          ]);
        }),
        map((snapshotRoles) => {
          if (showLoader) {
            this.loadingService.hide();
          }
          return checkRevealedSnapshotsSuccess({ snapshotRoles });
        })
      )
    );
  }

  constructor(
    private actions$: Actions,
    private store: Store,
    private envService: EnvService,
    private claimService: ClaimsService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {}
}
