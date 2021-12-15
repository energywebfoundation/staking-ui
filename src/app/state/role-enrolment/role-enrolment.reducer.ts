import { Action, createReducer, on } from '@ngrx/store';
import { RoleEnrolmentStatus } from './models/role-enrolment-status.enum';
import * as RoleEnrolmentActions from './role-enrolment.actions';

export const USER_FEATURE_KEY = 'role-enrolment';

export interface RoleEnrolmentState {
  status: RoleEnrolmentStatus;
  enrolment: any;
}

export const initialState: RoleEnrolmentState = {
  status: RoleEnrolmentStatus.ENROLED_SYNCED,
  enrolment: null
};

const roleEnrolmentReducer = createReducer(
  initialState,
  on(RoleEnrolmentActions.setStatus, (state, {status}) => ({...state, status})),
  on(RoleEnrolmentActions.setEnrolment, (state, {enrolment}) => ({...state, enrolment})),
  on(RoleEnrolmentActions.enrolmentRejected, RoleEnrolmentActions.claimDoNotExist, (state) => ({...state, status: RoleEnrolmentStatus.NOT_ENROLED})),
  on(RoleEnrolmentActions.enrolmentApproved, (state) => ({...state, status: RoleEnrolmentStatus.ENROLED_APPROVED}))
);

export function reducer(state: RoleEnrolmentState | undefined, action: Action) {
  return roleEnrolmentReducer(state, action);
}
