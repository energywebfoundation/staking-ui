import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoleEnrolmentState, USER_FEATURE_KEY } from './role-enrolment.reducer';
import { RoleEnrolmentStatus } from './models/role-enrolment-status.enum';

export const getRoleEnrolmentState = createFeatureSelector<RoleEnrolmentState>(USER_FEATURE_KEY);

export const getStatus = createSelector(
  getRoleEnrolmentState,
  (state) => state?.status
);

export const isSynced = createSelector(
  getRoleEnrolmentState,
  (state) => state?.status === RoleEnrolmentStatus.ENROLED_SYNCED
);

export const notContainingPatronRole = createSelector(
  getRoleEnrolmentState,
  (state) => state?.status !== RoleEnrolmentStatus.ENROLED_SYNCED
);

export const getEnrolment = createSelector(
  getRoleEnrolmentState,
  (state) => state?.enrolment
);

export const changeFromEnroledNotApprovedStatus = createSelector(
  getRoleEnrolmentState,
  (state) => state?.status === RoleEnrolmentStatus.ENROLED_NOT_APPROVED
);

export const emailNotApproved = createSelector(
  getRoleEnrolmentState,
  (state) => state?.status === RoleEnrolmentStatus.ENROLED_NOT_APPROVED || state?.status === RoleEnrolmentStatus.NOT_ENROLED
);
