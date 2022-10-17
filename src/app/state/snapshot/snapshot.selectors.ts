import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SnapshotState, USER_FEATURE_KEY } from './snapshot.reducer';
import { environment } from '../../../environments/environment';
import { RoleEnrolmentStatus } from '../role-enrolment/models/role-enrolment-status.enum';
import { Claim } from 'iam-client-lib';
import { getRoleEnrolmentState } from '../role-enrolment/role-enrolment.selectors';

export const getSnapshotState =
  createFeatureSelector<SnapshotState>(USER_FEATURE_KEY);

export const getUserSnapshotRoles = createSelector(
  getSnapshotState,
  (state) => state.userSnapshotRoles
);

export const getSnapshotStatusByNumber = (value: number) => {
  return createSelector(getUserSnapshotRoles, (userSnapshotRoles) => {
    return getSnapshotStatus(userSnapshotRoles, value);
  });
};

export const getAcceptedSnapshots = createSelector(
  getUserSnapshotRoles,
  (userSnapshotRoles) => {
    return environment.snapshotRoles
      .map((roleName, index) => {
        return {
          index,
          status:
            getSnapshotStatus(userSnapshotRoles, index) ===
            RoleEnrolmentStatus.ENROLED_SYNCED,
        };
      })
      .filter((snapshot) => snapshot.status)
      .map((snapshot) => snapshot.index);
  }
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

export const canDisplayNFTSection = createSelector(
  getRoleEnrolmentState,
  getUserSnapshotRoles,
  (state, userSnapshotRoles) => {
    const requiredForNFT = environment.snapshotRoles.filter(
      (role) => !(role.includes('6'))
    );

    const approvedUserSnapshots = environment.snapshotRoles
      .map((roleName, index) => {
        return {
          roleName,
          status:
            getSnapshotStatus(userSnapshotRoles, index) ===
            RoleEnrolmentStatus.ENROLED_SYNCED,
        };
      })
      .filter((snapshot) => snapshot.status)
      .map((snapshot) => snapshot.roleName);

    return requiredForNFT.every((snapshot) =>
      approvedUserSnapshots.includes(snapshot)
    );
  }
);
