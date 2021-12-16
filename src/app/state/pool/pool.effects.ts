import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IamService } from '../../shared/services/iam.service';
import { LoadingService } from '../../shared/services/loading.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { PoolState } from './pool.reducer';
import * as PoolActions from './pool.actions';
import { catchError, filter, finalize, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { BigNumber, utils } from 'ethers';
import { Stake, StakeStatus } from 'iam-client-lib';
import { StakeSuccessComponent } from '../../modules/ewt-patron/stake-success/stake-success.component';
import { ToastrService } from 'ngx-toastr';
import { StakingPoolServiceFacade } from '../../shared/services/staking/staking-pool-service-facade';
import { StakingPoolFacade } from '../../shared/services/pool/staking-pool-facade';
import { WithdrawComponent } from '../../modules/ewt-patron/withdraw/withdraw.component';
import { EnvService } from '../../shared/services/env/env.service';

const {formatEther, parseEther} = utils;

@Injectable()
export class PoolEffects {
  initPool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.initPool),
      switchMap(() => this.createPool())
    )
  );

  setOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.setOrganization),
      filter(() => Boolean(this.stakingPoolFacade.isPoolDefined())),
      switchMap(() => this.createPool())
    )
  );

  setFinishDateOfStakingPool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.stakingPoolFinishDate),
      switchMap(() => this.stakingPoolFacade.getEndDate()
        .pipe(
          map((d) => d.toNumber()),
          map((date) => PoolActions.stakingPoolFinishDateSuccess({date}))
        )
      )
    ));

  setStartDateOfStakingPool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.stakingPoolStartDate),
      switchMap(() => this.stakingPoolFacade.getStartDate()
        .pipe(
          map((d) => d.toNumber()),
          map((date: number) => PoolActions.stakingPoolStartDateSuccess({date}))
        )
      )
    ));

  stakeIsInStakingStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.getStakeSuccess),
      map(({stake}) => stake.status),
      filter((status: StakeStatus) => status === StakeStatus.STAKING),
      mergeMap(() => [
        PoolActions.getAccountBalance(),
        PoolActions.checkReward(),
        PoolActions.totalStaked()
      ])
    )
  );

  stakeIsInNonStakingStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.getStakeSuccess),
      map(({stake}) => stake.status),
      filter((status: StakeStatus) => status === StakeStatus.NONSTAKING),
      mergeMap(() => [PoolActions.getAccountBalance(), PoolActions.totalStaked()])
    )
  );

  getStake$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.getStake),
      switchMap(() =>
        this.stakingPoolFacade.getStake()
          .pipe(
            filter<Stake>(Boolean),
            map((stake) => PoolActions.getStakeSuccess({stake}))
          )
      )
    )
  );

  putStake$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.putStake),
      tap(() => this.loadingService.show('Staking EWT')),
      switchMap(({amount}) => {
          return this.stakingPoolFacade.putStake(parseEther(amount))
            .pipe(
              map(() => {
                this.dialog.open(StakeSuccessComponent, {
                  width: '400px',
                  maxWidth: '100%',
                  disableClose: true,
                  backdropClass: 'backdrop-shadow'
                });
                return PoolActions.getStake();
              }),
              catchError(err => {
                console.error(err);
                this.toastr.error(err.message);
                return of(PoolActions.putStakeFailure({err: err.message}));
              }),
              finalize(() => this.loadingService.hide())
            );
        }
      )
    )
  );

  withdrawReward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.withdrawReward),
      tap(() => this.loadingService.show('Unstaking EWT')),
      switchMap(({value}) =>
        this.stakingPoolFacade.partialWithdraw(parseEther(value.toString())).pipe(
          mergeMap(() => {
            this.dialog.closeAll();
            return [PoolActions.withdrawRewardSuccess(), PoolActions.getStake()];
          }),
          catchError(err => {
            console.error(err);
            return of(PoolActions.withdrawRewardFailure({err}));
          }),
          finalize(() => {
            this.loadingService.hide();
          })
        ),
      )
    )
  );

  withdrawAllReward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.withdrawAllReward),
      tap(() => this.loadingService.show('Withdrawing your reward...')),
      switchMap(() =>
        this.stakingPoolFacade.withdraw().pipe(
          mergeMap(() => {
            this.dialog.closeAll();
            return [PoolActions.withdrawRewardSuccess(), PoolActions.getStake()];
          }),
          catchError(err => {
            console.error(err);
            return of(PoolActions.withdrawRewardFailure({err}));
          }),
          finalize(() => {
            this.loadingService.hide();
          })
        ),
      )
    )
  );


  checkReward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.checkReward),
      switchMap(() =>
        this.stakingPoolFacade.checkReward().pipe(
          map((reward) => PoolActions.checkRewardSuccess({reward})),
          catchError(err => {
            console.error(err);
            return of(PoolActions.checkRewardFailure(err));
          })
        )
      )
    )
  );

  getAccountBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.getAccountBalance),
      switchMap(() =>
        from(this.iamService.getBalance())
          .pipe(
            map((balance) => formatEther(balance)),
            map(balance => PoolActions.getAccountSuccess({balance}))
          )
      )
    )
  );

  showProgressBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.openWithdrawDialog),
      map(() => {
        this.dialog.open(WithdrawComponent, {
          width: '400px',
          maxWidth: '100%',
          disableClose: true,
          backdropClass: 'backdrop-shadow'
        });
      })
    ), {dispatch: false}
  );

  getOrganizationLimit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.getHardCap),
      switchMap(() => this.stakingPoolFacade.getHardCap().pipe(
          map((cap: BigNumber) => PoolActions.getHardCapSuccess({cap})),
          catchError(err => {
            console.error(err);
            return of(PoolActions.getHardCapFailure({err: err?.message}));
          })
        )
      )
    )
  );

  getTotalStaked = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.totalStaked),
      switchMap(() => this.stakingPoolFacade.getTotalStaked().pipe(
          map((cap: BigNumber) => PoolActions.totalStakedSuccess({cap})),
          catchError(err => {
            console.error(err);
            return of(PoolActions.totalStakedFailure({err: err?.message}));
          })
        )
      )
    )
  );

  getContributorLimit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.getContributorLimit),
      switchMap(() => this.stakingPoolFacade.getContributionLimit().pipe(
          map((cap: BigNumber) => PoolActions.getContributorLimitSuccess({cap})),
          catchError(err => {
            console.error(err);
            return of(PoolActions.getContributorLimitFailure({err: err?.message}));
          })
        )
      )
    )
  );

  getRatio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoolActions.getRatio),
      switchMap(() => this.stakingPoolFacade.getHourlyRatio().pipe(
          map((ratio: BigNumber) => PoolActions.getRatioSuccess({ratio})),
          catchError(err => {
            console.error(err);
            return of(PoolActions.getRatioFailure({err: err?.message}));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions,
              private store: Store<PoolState>,
              private iamService: IamService,
              private loadingService: LoadingService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private stakingService: StakingPoolServiceFacade,
              private stakingPoolFacade: StakingPoolFacade,
              private envService: EnvService) {
  }

  private createPool() {
    return from(this.stakingService.createPool())
      .pipe(
        mergeMap(() => [PoolActions.getStake(), PoolActions.getHardCap(), PoolActions.getContributorLimit(),
          PoolActions.stakingPoolFinishDate(), PoolActions.stakingPoolStartDate(), PoolActions.totalStaked(), PoolActions.getRatio()])
      );
  }
}
