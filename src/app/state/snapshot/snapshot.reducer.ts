import { Action, createReducer, on } from '@ngrx/store';
import {
  checkRevealedSnapshotsSuccess,
} from './snapshot.actions';
import { Claim } from 'iam-client-lib';
import { environment } from '../../../environments/environment';

export const USER_FEATURE_KEY = 'snapshot';

export interface SnapshotState {
  userSnapshotRoles: Claim[];
  snapshotRoles: string[];
  isEligible: boolean;
  nftUrl: string;
}

export const initialState: SnapshotState = {
  userSnapshotRoles: [],
  snapshotRoles: environment.snapshotRoles,
  isEligible: false,
  nftUrl: null,
};

const snapshotReducer = createReducer(
  initialState,
  on(checkRevealedSnapshotsSuccess, (state, { snapshotRoles }) => ({
    ...state,
    userSnapshotRoles: snapshotRoles,
  })),
  // on(checkEligibility, (state, { eligible }) => ({
  //   ...state,
  //   isEligible: eligible,
  // })),
  // on(userNFTUrl, (state, { nftUrl }) => ({ ...state, nftUrl: nftUrl }))
);

export function reducer(state: SnapshotState | undefined, action: Action) {
  return snapshotReducer(state, action);
}
