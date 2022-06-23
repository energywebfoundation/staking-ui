import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSnapshotStatusByNumber } from '../../../state/snapshot/snapshot.selectors';
import { RoleEnrolmentStatus } from '../../../state/role-enrolment/models/role-enrolment-status.enum';
import { snapshotInfo } from './models/snapshot-info';

@Component({
  selector: 'app-snapshots',
  templateUrl: './snapshots.component.html',
  styleUrls: ['./snapshots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnapshotsComponent {
  constructor(private store: Store) {}

  snapshotStatus$(value: number): any{
    return this.store.select(getSnapshotStatusByNumber(value));
  }

  dotClickHandler(index: number, snapshotStatus: RoleEnrolmentStatus) {
    if (snapshotInfo.get(snapshotStatus).action) {
      this.store.dispatch(snapshotInfo.get(snapshotStatus).action(index));
    }
  }
}
