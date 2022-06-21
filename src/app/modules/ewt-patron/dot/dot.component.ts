import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { RoleEnrolmentStatus } from '../../../state/role-enrolment/models/role-enrolment-status.enum';

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
    switch (value) {
      case RoleEnrolmentStatus.ENROLED_APPROVED:
        return 'approved';
      case RoleEnrolmentStatus.REJECTED:
        return 'rejected';
      case RoleEnrolmentStatus.ENROLED_SYNCED:
        return 'synced';
        case RoleEnrolmentStatus.ENROLED_NOT_APPROVED:
        return 'waiting';
      default:
        return '';
    }
  }
}
