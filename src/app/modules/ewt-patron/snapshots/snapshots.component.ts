import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserSnapshotRoles, getSnapshotStatusByNumber } from '../../../state/snapshot/snapshot.selectors';

@Component({
  selector: 'app-snapshots',
  templateUrl: './snapshots.component.html',
  styleUrls: ['./snapshots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnapshotsComponent {
  revealedSnapshotNumbers$ = this.store.select(getUserSnapshotRoles);

  constructor(private store: Store) {}

  snapshotStatus$(value: number): any{
    return this.store.select(getSnapshotStatusByNumber(value));
  }
}
