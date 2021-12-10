import { Action, createReducer, on } from '@ngrx/store';
import { Profile } from 'iam-client-lib';
import * as userActions from './user.actions';

export const USER_FEATURE_KEY = 'user';

export interface UserClaimState {
  didDocument: any;
}

export const initialState: UserClaimState = {
  didDocument: null,
};

const userReducer = createReducer(
  initialState,
  on(userActions.setDidDocument, (state, {didDocument}) => ({...state, didDocument}))
);

export function reducer(state: UserClaimState | undefined, action: Action) {
  return userReducer(state, action);
}
