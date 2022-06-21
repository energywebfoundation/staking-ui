import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  checkRevealedSnapshots,
  checkRevealedSnapshotsSuccess,
  checkSnapshots,
  enrolToSnapshots,
} from './snapshot.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { EnvService } from '../../shared/services/env/env.service';
import { ClaimsService } from '../../shared/services/claims/claims.service';
import { getUserSnapshotRoles, getSnapshotStatus } from './snapshot.selectors';
import { RoleEnrolmentStatus } from '../role-enrolment/models/role-enrolment-status.enum';
import { forkJoin } from 'rxjs';

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

  checkSnapshots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkSnapshots),
      withLatestFrom(this.store.select(getUserSnapshotRoles)),
      map(([, snapshotRoles]) => {
        const snapshots = this.envService.snapshotRoles
          .filter(
            (role, index) => getSnapshotStatus(snapshotRoles, index) === RoleEnrolmentStatus.NOT_ENROLED
          );
        return enrolToSnapshots({ claims: snapshots });
      })
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
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private envService: EnvService,
    private claimService: ClaimsService
  ) {}
}
