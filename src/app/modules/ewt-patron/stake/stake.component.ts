import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as poolSelectors from '../../../state/pool/pool.selectors';
import * as PoolActions from '../../../state/pool/pool.actions';
import { MAX_STAKE_AMOUNT } from '../../../state/pool/models/const';
import { exponentialToString } from '../../../utils/functions/exponential-to-string/exponential-to-string';

export const MINIMAL_ETHEREUM_VALUE = 0.000000000000000001;

@Component({
  selector: 'app-stake',
  templateUrl: './stake.component.html',
  styleUrls: ['./stake.component.scss']
})
export class StakeComponent {
  readonly MINIMAL_VALUE = MINIMAL_ETHEREUM_VALUE;
  inputFocused: boolean;
  tokenAmount: number;
  amountToStake = new FormControl('', [Validators.min(this.MINIMAL_VALUE), Validators.required, Validators.max(MAX_STAKE_AMOUNT)]);
  maxAmount$ = this.store.select(poolSelectors.getMaxPossibleAmountToStake).pipe(tap(value => {
    this.setAmountValidators(value);
    this.tokenAmount = +value;
  }));
  balance$ = this.store.select(poolSelectors.getBalance);
  earnedReward$ = this.store.select(poolSelectors.getReward);
  stakeAmount$ = this.store.select(poolSelectors.getStakeAmount);
  isWithdrawDisabled$ = this.store.select(poolSelectors.isWithdrawDisabled);
  getContributorLimit$ = this.store.select(poolSelectors.getContributorLimit);
  calculatedPercent$ = this.store.select(poolSelectors.calculateStakedPercent);
  isStakeDisabled$ = this.store.select(poolSelectors.isStakeDisabled);
  stakingPoolEnds = this.store.select(poolSelectors.stakingPoolEnds);
  stakingPoolBegin$ = this.store.select(poolSelectors.stakingPoolBegin);
  ratio$ = this.store.select(poolSelectors.ratio);

  constructor(private store: Store) {
  }

  clear(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inputFocused = false;
    this.amountToStake.setValue('');
  }

  isAmountInvalid() {
    return this.amountToStake.invalid;
  }

  calcStakeAmount(percent: number) {
    this.amountToStake.setValue((this.tokenAmount * percent) / 100);
  }

  private putStake() {
    this.store.dispatch(PoolActions.putStake({amount: exponentialToString(this.amountToStake.value)}));
  }

  stake() {
    this.putStake();
    this.amountToStake.reset();
  }

  withdraw() {
    this.store.dispatch(PoolActions.openWithdrawDialog());
  }

  setAmountValidators(maxAmount: number) {
    this.amountToStake.setValidators([Validators.min(this.MINIMAL_VALUE), Validators.required, Validators.max(maxAmount)]);
  }

}
