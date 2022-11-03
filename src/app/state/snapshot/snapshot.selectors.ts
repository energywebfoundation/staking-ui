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

export const getSnapshotRoles = createSelector(
  getSnapshotState,
  (state) => state.snapshotRoles
);

export const getSnapshotStatusByNumber = (value: number) => {
  return createSelector(getUserSnapshotRoles, (userSnapshotRoles) => {
    return getSnapshotStatus(userSnapshotRoles, value);
  });
};

export const getUserAcceptedSnapshots = createSelector(
  getUserSnapshotRoles,
  getSnapshotRoles,
  (userSnapshotRoles, snapshotRoles) =>
    snapshotRoles
      .map((roleName, index) => {
        return {
          index,
          roleName,
          status:
            getSnapshotStatus(userSnapshotRoles, index) ===
            RoleEnrolmentStatus.ENROLED_SYNCED,
        };
      })
      .filter((snapshot) => snapshot.status)
);

export const getUserAcceptedSnapshotsIds = createSelector(
  getUserAcceptedSnapshots,
  (acceptedSnapshots) => acceptedSnapshots.map((snapshot) => snapshot.index)
);

export const isEligibleToClaimNFT = createSelector(
  getSnapshotState,
  (state) => state.isEligible
);

export const getNFTUrl = createSelector(
  getSnapshotState,
  (state) => state.nftUrl
);

export const isNFTClaimed = createSelector(getNFTUrl, (nftUrl) =>
  Boolean(nftUrl)
);

export const getSnapshotStatus = (snapshotRoles, id) => {
  const isSynced = (role): boolean => role.isSyncedOnChain;
  const isAccepted = (role: Claim): boolean => role.isAccepted;
  const isRejected = (role: Claim): boolean => role.isRejected;

  const snapshotsWithId = snapshotRoles?.filter(
    (role) => role.claimType === environment.snapshotRoles[id]
  );

  if (snapshotsWithId.length === 0 && !environment.snapshotRoles[id]) {
    return RoleEnrolmentStatus.SNAPSHOT_NOT_TAKEN;
  }

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
