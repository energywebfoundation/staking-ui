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
    message: 'A Snapshot is taken, check it now!',
    header: 'Check if you are included in the snapshot by clicking on the grey circle above!',
    link: '#',
    cssClass: '',
    action: (id) => enrolToSnapshotRole({ id }),
  })
  .set(RoleEnrolmentStatus.ENROLED_SYNCED, {
    header: 'Congratulations, you are included in this snapshot!',
    message: 'Make sure you keep your Energy Web Tokens staked to be elible for future snapshots, more information about the snapshots',
    link: '#',
    cssClass: 'synced',
  })
  .set(RoleEnrolmentStatus.REJECTED, {
    header: 'Oops... you are not included in this Snapshot!',
    message: "Make sure you don't miss out on the following snapshots, you need to stake your Energy Web Tokens to be eligible for the snapshots, more information about the snapshots",
    link: '#',
    cssClass: 'rejected',
    action: (id) => enrolToSnapshotRole({ id }),
  })
  .set(RoleEnrolmentStatus.ENROLED_APPROVED, {
    header: 'You are included in a snapshot, claim your role now!',
    message:
      'Congratulations you are included in one of the Snapshots, make sure you claim the role by clicking on the yellow circle above!',
    cssClass: 'approved',
    action: (id) => syncSnapshotEnrolment({ id }),
  })
  .set(RoleEnrolmentStatus.ENROLED_NOT_APPROVED, {
    header: 'Snapshot HAS not been taken yet...',
    message: 'Stake your Energy Web Tokens to be eligible for snapshots, more information about the snapshots',
    link: '#',
    cssClass: 'waiting',
  });
