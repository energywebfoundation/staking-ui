import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserClaimState } from './user.reducer';
import { Profile } from 'iam-client-lib';

export const getUserState = createFeatureSelector<UserClaimState>(USER_FEATURE_KEY);

export const getDid = createSelector(
  getUserState,
  (state: UserClaimState) => state?.didDocument?.id
);

export const getAddress = createSelector(
  getDid,
  (did) => did?.split(':')?.pop()
);
