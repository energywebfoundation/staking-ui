import { createAction, props } from '@ngrx/store';
import { RoleEnrolmentStatus } from './models/role-enrolment-status.enum';


export const detectActualStatus = createAction(
  '[ROLE ENROLMENT] Detect Role Enrolment Status'
);

export const setStatus = createAction(
  '[ROLE ENROLMENT] Set Status',
  props<{ status: RoleEnrolmentStatus }>()
);

export const enrolFor = createAction(
  '[ROLE ENROLMENT] Enrol For Patron Role',
  props<{ email: string }>()
);

export const enrolForFailure = createAction(
  '[ROLE ENROLMENT] Enrol For Patron Role Failure',
  props<{ error: string }>()
);

export const addRole = createAction(
  '[ROLE ENROLMENT] Add Role/Enrolment To Claim Manager',
);

export const addRoleFailure = createAction(
  '[ROLE ENROLMENT] Add Role/Enrolment To Claim Manager Failure',
  props<{ error: string }>()
);
