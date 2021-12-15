import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PoolState, USER_FEATURE_KEY } from './pool.reducer';
import { Stake, StakeStatus } from 'iam-client-lib';
import { utils } from 'ethers';
import { MAX_STAKE_AMOUNT } from './models/const';
import { getStatus } from '../role-enrolment/role-enrolment.selectors';
import { RoleEnrolmentStatus } from '../role-enrolment/models/role-enrolment-status.enum';

const {formatEther} = utils;

export const getStakeState = createFeatureSelector<PoolState>(USER_FEATURE_KEY);

export const getReward = createSelector(
  getStakeState,
  (state: PoolState) => formatEther(state.reward)
);

export const getBalance = createSelector(
  getStakeState,
  (state: PoolState) => state?.balance
);

export const isStakingStarted = createSelector(
  getStakeState,
  (state) => Date.now() - (state.startDate * 1000) > 0
)

export const isStakingEnded = createSelector(
  getStakeState,
  (state) => Date.now() - (state?.endDate * 1000) > 0
)

export const isStakeDisabled = createSelector(
  isStakingStarted,
  isStakingEnded,
  getStatus,
  (started, ended, status) => !started || ended || status !== RoleEnrolmentStatus.ENROLED_SYNCED
);

export const getAnnualReward = createSelector(
  getStakeState,
  (state: PoolState) => state.annualReward
);

export const getStake = createSelector(
  getStakeState,
  (state: PoolState) => state?.userStake
);

export const isWithdrawDisabled = createSelector(
  getStake,
  (state: Stake) => state?.status !== StakeStatus.STAKING
);

export const getStakeAmount = createSelector(
  getStake,
  (state: Stake) => state?.amount ? formatEther(state.amount) : '0'
);

export const getMaxPossibleAmountToStake = createSelector(
  getStake,
  getStakeState,
  (stake: Stake, state: PoolState) => {
    if (!state.contributorLimit) {
      return MAX_STAKE_AMOUNT;
    }
    const maxValue = +formatEther(state.contributorLimit);
    if (!stake?.amount) {
      return maxValue;
    }
    const puttedStake = +formatEther(stake.amount);
    return maxValue - puttedStake;
  }
);

export const amountBorderValues = createSelector(
  getMaxPossibleAmountToStake,
  getBalance,
  (maxPossibleAmount, balance) => ({maxPossibleAmount, balance: +balance})
)

export const isWithdrawingDelayFinished = createSelector(
  getStakeState,
  (state: PoolState) => state.withdrawing
);

export const getOrganizationLimit = createSelector(
  getStakeState,
  (state: PoolState) => {
    if (state.organizationLimit) {
      return formatEther(state.organizationLimit);
    }
    return state.organizationLimit;
  }
);

export const getContributorLimit = createSelector(
  getStakeState,
  (state: PoolState) => {
    if (state.contributorLimit) {
      return formatEther(state.contributorLimit);
    }
    return state.contributorLimit;
  }
);

export const allTokens = createSelector(
  getStakeState,
  (state: PoolState) => {
    return formatEther(state?.userStake?.amount?.add(state?.reward));
  }
);

export const expirationDate = createSelector(
  getStakeState,
  (state: PoolState) => {
    return new Date(state?.endDate * 1000);
  }
);

export const beginsDate = createSelector(
  getStakeState,
  (state: PoolState) => {
    return new Date(state?.startDate * 1000);
  }
);

export const stakingPoolBegin = createSelector(
  beginsDate,
  isStakingStarted,
  (beginDate, started) => {
    return {
      beginDate,
      started
    };
  }
);

export const stakingPoolEnds = createSelector(
  expirationDate,
  isStakingEnded,
  (expirationDate, ended) => {
    return {
      expirationDate,
      ended
    };
  }
);

export const ratio = createSelector(
  getStakeState,
  (state: PoolState) => {
    if (!state?.ratio) {
      return '';
    }
    return formatEther(state?.ratio);
  }
);

export const calculateStakedPercent = createSelector(
  getContributorLimit,
  getStakeAmount,
  (limit, amount) => {
    if (!amount) {
      return 0;
    }
    return Math.round(((+amount * 100) / (+limit) * 100)) / 100;
  }
);

export const getTotalStaked = createSelector(
  getStakeState,
  (state) => {
    if (state.totalStaked) {
      return formatEther(state.totalStaked);
    }
    return state.totalStaked;
  }
);

export const getTotalStakedPercent = createSelector(
  getOrganizationLimit,
  getTotalStaked,
  (limit, amount) => {
    if (!amount) {
      return 0;
    }
    return Math.round(((+amount * 100) / (+limit) * 100)) / 100;
  }
);
