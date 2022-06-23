import { RoleEnrolmentStatus } from '../../../../state/role-enrolment/models/role-enrolment-status.enum';
import {
  enrolToSnapshotRole,
  syncSnapshotEnrolment,
} from '../../../../state/snapshot/snapshot.actions';
import { Action } from '@ngrx/store';

export interface SnapshotInfo {
  message: string;
  cssClass: string;
  action?: (id: number) => Action;
}

export const snapshotInfo = new Map<RoleEnrolmentStatus, SnapshotInfo>()
  .set(RoleEnrolmentStatus.NOT_ENROLED, {
    message: 'Not enroled status, needs description for it',
    cssClass: '',
    action: (id) => enrolToSnapshotRole({ id }),
  })
  .set(RoleEnrolmentStatus.ENROLED_SYNCED, {
    message: 'Enrolment approved and synced status, needs description for it',
    cssClass: 'synced',
  })
  .set(RoleEnrolmentStatus.REJECTED, {
    message: 'Rejected status, needs description for it',
    cssClass: 'rejected',
  })
  .set(RoleEnrolmentStatus.ENROLED_APPROVED, {
    message:
      'Enrolment approved but not synced status, needs description for it',
    cssClass: 'approved',
    action: (id) => syncSnapshotEnrolment({ id }),
  })
  .set(RoleEnrolmentStatus.ENROLED_NOT_APPROVED, {
    message: 'enroled but not approved status, needs description for it',
    cssClass: 'waiting',
  });
