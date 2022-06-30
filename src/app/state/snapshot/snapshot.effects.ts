import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  checkRevealedSnapshots,
  checkRevealedSnapshotsSuccess,
  enrolToSnapshotRole,
  syncSnapshotEnrolment,
  updateRevealedSnapshots,
} from './snapshot.actions';
import {
  filter,
  finalize,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { EnvService } from '../../shared/services/env/env.service';
import { ClaimsService } from '../../shared/services/claims/claims.service';
import { getUserSnapshotRoles } from './snapshot.selectors';
import { forkJoin, from, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Claim } from 'iam-client-lib';
import { LoadingService } from '../../shared/services/loading.service';

@Injectable()
export class SnapshotEffects {
  checkEnrolments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkRevealedSnapshots),
      this.getSnapshotEnrolments(true)
    )
  );

  updateEnrolments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRevealedSnapshots),
      this.getSnapshotEnrolments(false)
    )
  );

  enrolForSnapshot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enrolToSnapshotRole),
      tap(() => this.loadingService.show()),
      map(({ id }) => this.envService.snapshotRoles[id]),
      filter(Boolean),
      switchMap((role: string) =>
        this.claimService.createClaim(role).pipe(
          map(() => checkRevealedSnapshots()),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  publishSnapshot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(syncSnapshotEnrolment),
      tap(() => this.loadingService.show()),
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
          map(() => checkRevealedSnapshots()),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  private getSnapshotEnrolments(showLoader: boolean) {
    if (showLoader) {
      this.loadingService.show();
    }
    return switchMap(() =>
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
