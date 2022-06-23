import { Action, createReducer, on } from '@ngrx/store';
import { checkRevealedSnapshotsSuccess } from './snapshot.actions';
import { Claim } from 'iam-client-lib';

export const USER_FEATURE_KEY = 'snapshot';

export interface SnapshotState {
  userSnapshotRoles: Claim[];
}

export const initialState: SnapshotState = {
  userSnapshotRoles: [],
};

const snapshotReducer = createReducer(
  initialState,
  on(checkRevealedSnapshotsSuccess, (state, { snapshotRoles }) => ({
    ...state,
    userSnapshotRoles: snapshotRoles,
  }))
);

export function reducer(state: SnapshotState | undefined, action: Action) {
  return snapshotReducer(state, action);
}
