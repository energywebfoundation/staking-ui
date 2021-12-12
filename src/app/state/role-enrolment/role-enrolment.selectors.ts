import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoleEnrolmentState, USER_FEATURE_KEY } from './role-enrolment.reducer';

export const getRoleEnrolmentState = createFeatureSelector<RoleEnrolmentState>(USER_FEATURE_KEY);

export const getStatus = createSelector(
  getRoleEnrolmentState,
  (state) => state.status
);
