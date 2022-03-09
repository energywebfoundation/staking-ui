import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as poolSelectors from '../../../state/pool/pool.selectors';
import * as PoolActions from '../../../state/pool/pool.actions';
import { MAX_STAKE_AMOUNT } from '../../../state/pool/models/const';
import { exponentialToString } from '../../../utils/functions/exponential-to-string/exponential-to-string';
import { RoleEnrolmentSelectors } from '@state';
import { WithdrawComponent } from '../withdraw/withdraw.component';
import { MatDialog } from '@angular/material/dialog';
import { MINIMAL_ETHEREUM_VALUE } from '../../../../environments/models/minimal_ethereum_value';
import { StakeSuccessComponent } from '../stake-success/stake-success.component';

@Component({
  selector: 'app-stake',
  templateUrl: './stake.component.html',
  styleUrls: ['./stake.component.scss']
})
export class StakeComponent implements OnInit {
  readonly MINIMAL_VALUE = MINIMAL_ETHEREUM_VALUE;
  inputFocused: boolean;
  tokenAmount: number;
  amountToStake = new FormControl('', [Validators.min(this.MINIMAL_VALUE), Validators.required, Validators.max(MAX_STAKE_AMOUNT)]);
  amountBorderValues$ = this.store.select(poolSelectors.amountBorderValues).pipe(tap(({maxPossibleAmount, balance}) => {
    this.setAmountValidators(maxPossibleAmount, balance);
    this.tokenAmount = +maxPossibleAmount;
  }));
  notContainingPatronRole$ = this.store.select(RoleEnrolmentSelectors.notContainingPatronRole);

  balance$ = this.store.select(poolSelectors.getBalance);
  earnedReward$ = this.store.select(poolSelectors.getReward);
  stakeAmount$ = this.store.select(poolSelectors.getStakeAmount);
  isWithdrawDisabled$ = this.store.select(poolSelectors.isWithdrawDisabled);
  getContributorLimit$ = this.store.select(poolSelectors.getContributorLimit);
  calculatedPercent$ = this.store.select(poolSelectors.calculateStakedPercent);
  isStakeDisabled$ = this.store.select(poolSelectors.isStakeDisabled);
  stakingPoolEnds = this.store.select(poolSelectors.stakingPoolEnds);
  stakingPoolBegin$ = this.store.select(poolSelectors.stakingPoolBegin);
  getIsLimitReached$ = this.store.select(poolSelectors.getIsLimitReached);

  constructor(private store: Store, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.notContainingPatronRole$.subscribe((v) => v ? this.amountToStake.disable() : this.amountToStake.enable());
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
    this.dialog.open(WithdrawComponent, {
      width: '400px',
      maxWidth: '100%',
      disableClose: true,
      backdropClass: 'backdrop-shadow'
    });
  }

  openConfiguration() {
    this.dialog.open(StakeSuccessComponent, {
      width: '400px',
      maxWidth: '100%',
      disableClose: true,
      backdropClass: 'backdrop-shadow'
    });
  }

  setAmountValidators(maxAmount: number, balance: number) {
    this.amountToStake.setValidators([Validators.min(this.MINIMAL_VALUE), Validators.required, Validators.max(maxAmount), this.checkIfValueIsSmallerThanBalance(balance)]);
  }

  private checkIfValueIsSmallerThanBalance(balance: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      if (control.value > balance) {
        return {
          insufficientValue: true
        }
      }
      return null;
    };
  }

}
