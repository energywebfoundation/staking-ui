import { createAction, props } from '@ngrx/store';
import { Claim } from 'iam-client-lib';
import { RoleEnrolmentStatus } from '../role-enrolment/models/role-enrolment-status.enum';

export const checkRevealedSnapshots = createAction(
  '[Snapshot] Check Revealed Snapshots'
);

export const updateRevealedSnapshots = createAction(
  '[Snapshot] Update Revealed Snapshots'
);

export const checkRevealedSnapshotsSuccess = createAction(
  '[Snapshot] Check Revealed Snapshots Success',
  props<{ snapshotRoles: Claim[] }>()
);

export const enrolToSnapshotRole = createAction(
  '[Snapshot] Enrol To Snapshot Role',
  props<{ id: number }>()
);

export const enrolToSnapshotRoleSuccess = createAction(
  '[Snapshot] Enrol To Snapshot Role Success',
  props<{ status: RoleEnrolmentStatus }>()
);

export const syncSnapshotEnrolment = createAction(
  '[Snapshot] Sync Snapshot Role',
  props<{ id: number }>()
);

export const syncSnapshotEnrolmentSuccess = createAction(
  '[Snapshot] Sync Snapshot Role Success',
  props<{ status: RoleEnrolmentStatus }>()
);
//
// export const checkIfUserHaveNFT = createAction('[Snapshot] Check NFT');
//
// export const checkEligibility = createAction(
//   '[Snapshot] Is User Eligible',
//   props<{ eligible: boolean }>()
// );
//
// export const userNFTUrl = createAction(
//   '[Snapshot] Get User NFT Url',
//   props<{ nftUrl: string }>()
// );
//
// export const claimReward = createAction('[Snapshot] Claim Reward');
