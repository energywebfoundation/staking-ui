import { Action, createReducer, on } from '@ngrx/store';
import { checkRevealedSnapshotsSuccess } from './snapshot.actions';
import { Claim } from 'iam-client-lib';

export const USER_FEATURE_KEY = 'snapshot';

export interface SnapshotState {
  revealedSnapshots: Claim[];
}

export const initialState: SnapshotState = {
  revealedSnapshots: [],
};

const snapshotReducer = createReducer(
  initialState,
  on(checkRevealedSnapshotsSuccess, (state, { snapshotRoles }) => ({
    ...state,
    revealedSnapshots: snapshotRoles,
  }))
);

export function reducer(state: SnapshotState | undefined, action: Action) {
  return snapshotReducer(state, action);
}
