import { createAction, props } from '@ngrx/store';
import { RoleEnrolmentStatus } from './models/role-enrolment-status.enum';


export const detectActualStatus = createAction(
  '[ROLE ENROLMENT] Detect Role Enrolment Status'
);

export const setStatus = createAction(
  '[ROLE ENROLMENT] Set Status',
  props<{ status: RoleEnrolmentStatus }>()
);
