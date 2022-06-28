import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnrolmentStatus } from '../../../state/role-enrolment/models/role-enrolment-status.enum';
import { snapshotInfo } from '../snapshots/models/snapshot-info';

@Pipe({
  name: 'enrolmentStatusHeaderDescription'
})
export class EnrolmentStatusHeaderDescriptionPipe implements PipeTransform {

  transform(value: RoleEnrolmentStatus): string {
    return snapshotInfo.has(value)
      ? snapshotInfo.get(value).header
      : 'Not supported status!';
  }

}
