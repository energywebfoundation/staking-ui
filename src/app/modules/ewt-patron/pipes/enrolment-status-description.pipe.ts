import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnrolmentStatus } from '../../../state/role-enrolment/models/role-enrolment-status.enum';

const statusDescription = new Map()
  .set(
    RoleEnrolmentStatus.NOT_ENROLED,
    'Not enroled status, needs description for it'
  )
  .set(
    RoleEnrolmentStatus.ENROLED_SYNCED,
    'Enrolment approved and synced status, needs description for it'
  )
  .set(
    RoleEnrolmentStatus.REJECTED,
    'Rejected status, needs description for it'
  )
  .set(
    RoleEnrolmentStatus.ENROLED_APPROVED,
    'Enrolment approved but not synced status, needs description for it'
  )
  .set(
    RoleEnrolmentStatus.ENROLED_NOT_APPROVED,
    'enroled but not approved status, needs description for it'
  );

@Pipe({
  name: 'enrolmentStatusDescription',
})
export class EnrolmentStatusDescriptionPipe implements PipeTransform {
  transform(value: RoleEnrolmentStatus, ...args: unknown[]): unknown {
    return statusDescription.has(value)
      ? statusDescription.get(value)
      : 'Not supported status!';
  }
}
