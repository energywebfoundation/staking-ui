import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  checkRevealedSnapshots,
  checkRevealedSnapshotsSuccess,
  checkSnapshots,
  enrolToSnapshot,
} from './snapshot.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { EnvService } from '../../shared/services/env/env.service';
import { ClaimsService } from '../../shared/services/claims/claims.service';
import { getRevealedSnapshots, getSnapshotStatus } from './snapshot.selectors';

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
          map((snapshotRoles) =>
            checkRevealedSnapshotsSuccess({ snapshotRoles })
          )
        )
      )
    )
  );

  checkSnapshots$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkSnapshots),
        withLatestFrom(getRevealedSnapshots),
        map(([, snapshotRoles]) => {
          const snapshots = this.envService.snapshotRoles.map((role, index) => {
            return getSnapshotStatus(snapshotRoles, index);
          });
          console.log(snapshots);
        })
      ),
    { dispatch: false }
  );

  enrolFor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enrolToSnapshot),
      switchMap(({ claimType }) =>
        this.claimService
          .createClaim(claimType)
          .pipe(map(() => checkRevealedSnapshots()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private envService: EnvService,
    private claimService: ClaimsService
  ) {}
}
