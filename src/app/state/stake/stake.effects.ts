import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IamService } from '../../shared/services/iam.service';
import { LoadingService } from '../../shared/services/loading.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { StakeState } from './stake.reducer';
import * as StakeActions from './stake.actions';
import { mergeMap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StakingPoolServiceFacade } from '../../shared/services/staking/staking-pool-service-facade';
import * as PoolActions from '../pool/pool.actions';

@Injectable()
export class StakeEffects {
  initStakingPoolService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StakeActions.initStakingPool),
      switchMap(() =>
        from(this.stakingService.init()).pipe(
          mergeMap(() => {
            return [
              PoolActions.initPool(),
              PoolActions.getAccountBalance(),
            ];
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<StakeState>,
    private iamService: IamService,
    private loadingService: LoadingService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private stakingService: StakingPoolServiceFacade
  ) {}
}
