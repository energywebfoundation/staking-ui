import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
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
    this.snapshotStatus = value;
  }
  @Output() bubbleClick = new EventEmitter<void>();
  snapshotStatus: RoleEnrolmentStatus;
  header: string;
  description: string;

  @HostBinding('class') enrolmentStatus: string;

  get isSilver(): boolean {
    return this.snapshotStatus === RoleEnrolmentStatus.ENROLED_SYNCED && this.number === 4;
  }

  get isGolden(): boolean {
    return this.snapshotStatus === RoleEnrolmentStatus.ENROLED_SYNCED && this.number === 5;
  }

  private getEnrolmentStatus(value: RoleEnrolmentStatus): string {
    return snapshotInfo.has(value) ? snapshotInfo.get(value).cssClass : '';
  }
}
