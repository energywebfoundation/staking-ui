import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IamService } from '../../shared/services/iam.service';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { LoadingService } from '../../shared/services/loading.service';
import { Store } from '@ngrx/store';
import * as UserClaimActions from './user.actions';

@Injectable()
export class UserEffects {
  setUpUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserClaimActions.setUpUser),
      tap(() => this.loadingService.show()),
      switchMap(() =>
        this.iamService.getDidDocument().pipe(
          map(didDocument => UserClaimActions.setDidDocument({ didDocument })),
          finalize(() => this.loadingService.hide())
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private iamService: IamService,
    private loadingService: LoadingService
  ) {}
}
