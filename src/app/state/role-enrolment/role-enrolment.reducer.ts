import { Action, createReducer, on } from '@ngrx/store';
import { RoleEnrolmentStatus } from './models/role-enrolment-status.enum';
import * as RoleEnrolmentActions from './role-enrolment.actions';

export const USER_FEATURE_KEY = 'role-enrolment';

export interface RoleEnrolmentState {
  status: RoleEnrolmentStatus;
  element: any;
}

export const initialState: RoleEnrolmentState = {
  status: RoleEnrolmentStatus.NOT_ENROLED,
  element: null
};

const roleEnrolmentReducer = createReducer(
  initialState,
  on(RoleEnrolmentActions.setStatus, (state, {status}) => ({...state, status})),
);

export function reducer(state: RoleEnrolmentState | undefined, action: Action) {
  return roleEnrolmentReducer(state, action);
}
