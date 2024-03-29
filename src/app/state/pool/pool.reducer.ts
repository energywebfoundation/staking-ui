import { Action, createReducer, on } from '@ngrx/store';
import * as PoolActions from './pool.actions';
import { Stake } from 'iam-client-lib';
import { BigNumber } from 'ethers';

export const USER_FEATURE_KEY = 'pool';

export interface PoolState {
  balance: string;
  performance: number;
  annualReward: number;
  reward: BigNumber;
  userStake: Stake;
  withdrawing: boolean;
  contributorLimit: BigNumber;
  organizationLimit: BigNumber;
  endDate: number;
  startDate: number;
  totalStaked: BigNumber;
  ratio: BigNumber;
}

export const initialState: PoolState = {
  balance: '0',
  performance: 100,
  annualReward: 10,
  reward: BigNumber.from(0),
  userStake: null,
  withdrawing: false,
  contributorLimit: null,
  organizationLimit: null,
  endDate: null,
  startDate: null,
  totalStaked: null,
  ratio: null,
};

const poolReducer = createReducer(
  initialState,
  on(PoolActions.checkRewardSuccess, (state, { reward }) => ({
    ...state,
    reward,
  })),
  on(PoolActions.getAccountSuccess, (state, { balance }) => ({
    ...state,
    balance,
  })),
  on(PoolActions.getStakeSuccess, (state, { stake }) => ({
    ...state,
    userStake: {
      amount: stake.amount,
      status: stake.status,
      depositEnd: stake.depositEnd,
      depositStart: stake.depositStart,
    },
  })),
  on(PoolActions.withdrawalDelayExpired, (state) => ({
    ...state,
    withdrawing: false,
  })),
  on(PoolActions.withdrawRewardSuccess, (state) => ({
    ...state,
    reward: BigNumber.from(0),
  })),
  on(PoolActions.getContributorLimitSuccess, (state, { cap }) => ({
    ...state,
    contributorLimit: cap,
  })),
  on(PoolActions.getRatioSuccess, (state, { ratio }) => ({ ...state, ratio })),
  on(PoolActions.getHardCapSuccess, (state, { cap }) => ({
    ...state,
    organizationLimit: cap,
  })),
  on(PoolActions.totalStakedSuccess, (state, { cap }) => ({
    ...state,
    totalStaked: cap,
  })),
  on(PoolActions.stakingPoolFinishDateSuccess, (state, { date }) => ({
    ...state,
    endDate: date,
  })),
  on(PoolActions.stakingPoolStartDateSuccess, (state, { date }) => ({
    ...state,
    startDate: date,
  }))
);

export function reducer(state: PoolState | undefined, action: Action) {
  return poolReducer(state, action);
}
