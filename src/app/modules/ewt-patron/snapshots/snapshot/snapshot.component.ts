import { Component, HostBinding, Input } from '@angular/core';
import { RoleEnrolmentStatus } from '../../../../state/role-enrolment/models/role-enrolment-status.enum';
import { snapshotInfo } from '../models/snapshot-info';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss'],
})
export class SnapshotComponent {
  @Input() number: number;
  @Input() set status(value: RoleEnrolmentStatus) {
    this.enrolmentStatus = this.getEnrolmentStatus(value);
  }
  @Input() type: 'past' | 'present' | 'future';

  @HostBinding('class') enrolmentStatus: string;

  private getEnrolmentStatus(value: RoleEnrolmentStatus): string {
    return snapshotInfo.has(value) ? snapshotInfo.get(value).cssClass : '';
  }

}
