import { Action, createReducer } from '@ngrx/store';
import { RoleEnrolmentStatus } from './models/role-enrolment-status.enum';

export const USER_FEATURE_KEY = 'role-enrolment';

export interface RoleEnrolmentState {
  status: RoleEnrolmentStatus
}

export const initialState: RoleEnrolmentState = {
  status: RoleEnrolmentStatus.NOT_ENROLED
};

const roleEnrolmentReducer = createReducer(
  initialState,
);

export function reducer(state: RoleEnrolmentState | undefined, action: Action) {
  return roleEnrolmentReducer(state, action);
}
