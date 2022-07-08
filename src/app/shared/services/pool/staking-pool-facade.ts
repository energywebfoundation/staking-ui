import { Injectable } from '@angular/core';
import { StakingPoolService } from 'iam-client-lib';
import { BigNumber } from 'ethers';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../loading.service';

@Injectable({
  providedIn: 'root'
})
export class StakingPoolFacade {
  private pool: StakingPoolService;

  constructor(private loadingService: LoadingService) {}

  isPoolDefined(): boolean {
    return Boolean(this.pool);
  }

  setPool(pool: StakingPoolService) {
    this.pool = pool;
  }

  putStake(stake: BigNumber | number) {
    return this.wrapWithLoadingService(this.pool.putStake(stake));
  }

  getStartDate() {
    return this.wrapWithLoadingService(this.pool.getStart());
  }

  getEndDate() {
    return this.wrapWithLoadingService(this.pool.getEnd());
  }

  checkReward() {
    return this.wrapWithLoadingService(this.pool.checkReward());
  }

  getStake() {
    return this.wrapWithLoadingService(this.pool.getStake());
  }

  withdraw() {
    return this.wrapWithLoadingService(this.pool.withdraw());
  }

  getHardCap() {
    return this.wrapWithLoadingService(this.pool.getHardCap());
  }

  getContributionLimit() {
    return this.wrapWithLoadingService(this.pool.getContributionLimit());
  }

  getTotalStaked() {
    return this.wrapWithLoadingService(this.pool.getTotalStaked());
  }

  partialWithdraw(value: BigNumber) {
    return this.wrapWithLoadingService(this.pool.partialWithdraw(value));
  }

  getHourlyRatio() {
    return this.wrapWithLoadingService(this.pool.getRatio());
  }

  private wrapWithLoadingService<T>(
    source: Promise<T> | Observable<T>,
    loaderConfig?: { message: string | string[]; cancelable?: boolean }
  ) {
    this.loadingService.show(
      loaderConfig?.message || '',
      !!loaderConfig?.cancelable
    );
    return from(source).pipe(finalize(() => this.loadingService.hide()));
  }
}
