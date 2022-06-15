import { createAction, props } from '@ngrx/store';

export const checkRevealedSnapshots = createAction(
  '[Snapshot] Check Revealed Snapshots'
);

export const checkRevealedSnapshotsSuccess = createAction(
  '[Snapshot] Check Revealed Snapshots Success',
  props<{snapshotRoles: string[]}>()
);
