import { Component } from '@angular/core';
import {
  getSnapshotStatusByNumber,
  getUserSnapshotRoles,
} from '../../../state/snapshot/snapshot.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoleEnrolmentStatus } from '../../../state/role-enrolment/models/role-enrolment-status.enum';

@Component({
  selector: 'app-user-snapshots',
  templateUrl: './user-snapshots.component.html',
  styleUrls: ['./user-snapshots.component.scss'],
})
export class UserSnapshotsComponent {
  revealedSnapshotNumbers$ = this.store.select(getUserSnapshotRoles);
  constructor(private store: Store) {}

  snapshotStatus$(value: number): Observable<RoleEnrolmentStatus> {
    return this.store.select(getSnapshotStatusByNumber(value));
  }
}
