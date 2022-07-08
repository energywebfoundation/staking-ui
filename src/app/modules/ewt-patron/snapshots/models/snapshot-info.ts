import { RoleEnrolmentStatus } from '../../../../state/role-enrolment/models/role-enrolment-status.enum';
import {
  enrolToSnapshotRole,
  syncSnapshotEnrolment,
} from '../../../../state/snapshot/snapshot.actions';
import { Action } from '@ngrx/store';

export interface SnapshotInfo {
  message: string;
  header: string;
  cssClass: string;
  link?: string;
  action?: (id: number) => Action;
}

export const snapshotInfo = new Map<RoleEnrolmentStatus, SnapshotInfo>()
  .set(RoleEnrolmentStatus.NOT_ENROLED, {
    header: 'A Snapshot has been taken, check it now!',
    message: 'Check if you are included in the snapshot by clicking on the grey circle above!',
    cssClass: 'not-enrolled',
    action: (id) => enrolToSnapshotRole({ id }),
  })
  .set(RoleEnrolmentStatus.ENROLED_SYNCED, {
    header: 'Congratulations, you are included in this snapshot!',
    message: 'Make sure you keep your Energy Web Tokens staked to be eligible for future snapshots, more information about the snapshots',
    link: 'https://medium.com/energy-web-insights/energy-web-community-staking-pool-snapshots-explained-3a9c3eebf28b',
    cssClass: 'synced',
  })
  .set(RoleEnrolmentStatus.REJECTED, {
    header: 'Oops... you are not included in this Snapshot!',
    message: "Make sure you don't miss out on the following snapshots, you need to stake your Energy Web Tokens to be eligible for the snapshots, more information about the snapshots",
    link: 'https://medium.com/energy-web-insights/energy-web-community-staking-pool-snapshots-explained-3a9c3eebf28b',
    cssClass: 'rejected',
  })
  .set(RoleEnrolmentStatus.ENROLED_APPROVED, {
    header: 'You are included in a snapshot, claim your role now!',
    message:
      'Congratulations you are included in one of the Snapshots, make sure you claim the role by clicking on the yellow circle above!',
    cssClass: 'approved',
    action: (id) => syncSnapshotEnrolment({ id }),
  })
  .set(RoleEnrolmentStatus.SNAPSHOT_NOT_TAKEN, {
    header: 'Snapshot HAS not been taken yet...',
    message: 'Stake your Energy Web Tokens to be eligible for snapshots, more information about the snapshots',
    link: 'https://medium.com/energy-web-insights/energy-web-community-staking-pool-snapshots-explained-3a9c3eebf28b',
    cssClass: 'not-taken',
  })
  .set(RoleEnrolmentStatus.ENROLED_NOT_APPROVED, {
    header: "Checking if you're included...",
    message: 'Please wait a moment or refresh the page.',
    cssClass: ''
  });
