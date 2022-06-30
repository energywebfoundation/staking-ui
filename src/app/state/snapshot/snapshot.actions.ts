import { createAction, props } from '@ngrx/store';
import { Claim } from 'iam-client-lib';

export const checkRevealedSnapshots = createAction(
  '[Snapshot] Check Revealed Snapshots'
);

export const updateRevealedSnapshots = createAction(
  '[Snapshot] Update Revealed Snapshots'
)

export const checkRevealedSnapshotsSuccess = createAction(
  '[Snapshot] Check Revealed Snapshots Success',
  props<{ snapshotRoles: Claim[] }>()
);

export const enrolToSnapshots = createAction(
  '[Snapshot] Enrol To Snapshots',
  props<{ claims: string[] }>()
);

export const checkSnapshots = createAction('[Snapshot] Check Snapshots');

export const enrolToSnapshotRole = createAction(
  '[Snapshot] Enrol To Snapshot Role',
  props<{ id: number }>()
);

export const syncSnapshotEnrolment = createAction(
  '[Snapshot] Sync Snapshot Role',
  props<{ id: number }>()
);
