import { Action, createReducer } from '@ngrx/store';

export const USER_FEATURE_KEY = 'snapshot';

export interface SnapshotState {
}

export const initialState: SnapshotState = {
};

const snapshotReducer = createReducer(initialState);

export function reducer(state: SnapshotState | undefined, action: Action) {
  return snapshotReducer(state, action);
}
