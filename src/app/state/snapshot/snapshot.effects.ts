import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IamService } from '../../shared/services/iam.service';
import { LoadingService } from '../../shared/services/loading.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  checkRevealedSnapshots,
  checkRevealedSnapshotsSuccess
} from './snapshot.actions';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable()
export class SnapshotEffects {
  checkEnrolments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkRevealedSnapshots),
      switchMap(() =>
        this.getClaims().pipe(
          map(roles => roles.filter(role => !role.isRejected)),
          map(roles => roles.map(role => role.namespace)),
          map(namespaces =>
            namespaces.filter(
              namespace =>
                namespace.includes('snapshot') &&
                namespace.includes('consortiapool.apps')
            )
          ),
          map(roleNamespaces =>
            checkRevealedSnapshotsSuccess({ snapshotRoles: roleNamespaces })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private iamService: IamService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  private getClaims() {
    return from(
      this.iamService.claimsService.getClaimsByRequester({
        did: this.iamService.signerService.did
      })
    );
  }
}
