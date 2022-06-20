import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SnapshotState, USER_FEATURE_KEY } from './snapshot.reducer';
import { environment } from '../../../environments/environment';
import { RoleEnrolmentStatus } from '../role-enrolment/models/role-enrolment-status.enum';
import { Claim } from 'iam-client-lib';

export const getSnapshotState =
  createFeatureSelector<SnapshotState>(USER_FEATURE_KEY);

export const getUserSnapshotRoles = createSelector(
  getSnapshotState,
  (state) => state.userSnapshotRoles
);

export const getSnapshotStatusByNumber = (value: number) => {
  return createSelector(getUserSnapshotRoles, (revealedSnapshots) => {
    return getSnapshotStatus(revealedSnapshots, value);
  });
};

export const getSnapshotStatus = (revealedSnapshots, id) => {
  const isSynced = (role): boolean =>
    role.issuedToken && role.onChainProof && role.vp;
  const isAccepted = (role: Claim): boolean => role.isAccepted;
  const isRejected = (role: Claim): boolean => role.isRejected;

  const snapshotsWithId = revealedSnapshots?.filter(
    (role) => role.claimType === environment.snapshotRoles[id - 1]
  );

  if (snapshotsWithId?.filter(isSynced).length > 0) {
    return RoleEnrolmentStatus.ENROLED_SYNCED;
  }

  if (snapshotsWithId?.filter(isAccepted).length > 0) {
    return RoleEnrolmentStatus.ENROLED_APPROVED;
  }

  if (snapshotsWithId?.filter((role) => !isRejected(role)).length > 0) {
    return RoleEnrolmentStatus.ENROLED_NOT_APPROVED;
  }

  if (snapshotsWithId?.filter((role) => isRejected(role)).length > 0) {
    return RoleEnrolmentStatus.REJECTED;
  }

  return RoleEnrolmentStatus.NOT_ENROLED;
};
