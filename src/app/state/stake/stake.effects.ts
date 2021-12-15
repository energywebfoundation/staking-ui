import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SearchType } from 'iam-client-lib';
import { IamService } from '../../shared/services/iam.service';
import { LoadingService } from '../../shared/services/loading.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { StakeState } from './stake.reducer';
import * as StakeActions from './stake.actions';
import { catchError, finalize, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { combineLatest, from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StakingPoolServiceFacade } from '../../shared/services/staking/staking-pool-service-facade';
import * as PoolActions from '../pool/pool.actions';
import { Provider } from './models/provider.interface';
import * as LayoutActions from '../layout/layout.actions';
import { filterProviders } from './operators/filter-providers/filter-providers';


@Injectable()
export class StakeEffects {
  initStakingPoolService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StakeActions.initStakingPool),
      switchMap(() =>
        from(this.stakingService.init())
          .pipe(
            mergeMap(() => {
              // Redirect action is needed here,
              // because there is a race condition between redirection and staking pool initialization.
              // When redirect is called before successful initialization of staking pool then we get errors
              // while getting list of providers/organizations.
              return [PoolActions.initPool(), PoolActions.getAccountBalance(), LayoutActions.redirect()];
            })
          )
      )
    )
  );

  constructor(private actions$: Actions,
              private store: Store<StakeState>,
              private iamService: IamService,
              private loadingService: LoadingService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private stakingService: StakingPoolServiceFacade) {
  }
}
