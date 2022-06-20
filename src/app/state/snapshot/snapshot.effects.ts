import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  checkRevealedSnapshots,
  checkRevealedSnapshotsSuccess,
} from './snapshot.actions';
import { map, switchMap } from 'rxjs/operators';
import { EnvService } from '../../shared/services/env/env.service';
import { ClaimsService } from '../../shared/services/claims/claims.service';

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

  constructor(
    private actions$: Actions,
    private store: Store,
    private envService: EnvService,
    private claimService: ClaimsService
  ) {}
}
