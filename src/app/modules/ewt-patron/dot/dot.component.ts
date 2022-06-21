import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { RoleEnrolmentStatus } from '../../../state/role-enrolment/models/role-enrolment-status.enum';
import { snapshotInfo } from '../snapshots/models/snapshot-info';

@Component({
  selector: 'app-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotComponent {
  @HostBinding('class') enrolmentStatus: string;
  @Input() set status(value: RoleEnrolmentStatus) {
    this.enrolmentStatus = this.getEnrolmentStatus(value);
  }

  private getEnrolmentStatus(value: RoleEnrolmentStatus): string {
    return snapshotInfo.has(value) ? snapshotInfo.get(value).cssClass : '';
  }
}
