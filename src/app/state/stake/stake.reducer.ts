import { Action, createReducer } from '@ngrx/store';
import { Provider } from './models/provider.interface';

export const USER_FEATURE_KEY = 'stake';

export interface StakeState {
  providers: Provider[];
}

export const initialState: StakeState = {
  providers: [],
};

const stakeReducer = createReducer(initialState);

export function reducer(state: StakeState | undefined, action: Action) {
  return stakeReducer(state, action);
}
