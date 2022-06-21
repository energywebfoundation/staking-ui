import { createAction, props } from '@ngrx/store';
import { Claim } from 'iam-client-lib';

export const checkRevealedSnapshots = createAction(
  '[Snapshot] Check Revealed Snapshots'
);

export const checkRevealedSnapshotsSuccess = createAction(
  '[Snapshot] Check Revealed Snapshots Success',
  props<{snapshotRoles: Claim[]}>()
);

export const enrolToSnapshots = createAction(
  '[Snapshot] Enrol To Snapshots',
  props<{claims: string[]}>()
);

export const checkSnapshots = createAction(
  '[Snapshot] Check Snapshots'
)
