import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnapshotSuccessComponent } from '../snapshot-success/snapshot-success.component';
import { Store } from '@ngrx/store';
import { checkSnapshots } from '../../../state/snapshot/snapshot.actions';

@Component({
  selector: 'app-check-snapshot',
  templateUrl: './check-snapshot.component.html',
  styleUrls: ['./check-snapshot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckSnapshotComponent {
  constructor(private dialog: MatDialog,
              private store: Store) {}

  checkSnapshots() {
    this.store.dispatch(checkSnapshots());
    // this.dialog.open(SnapshotSuccessComponent, {
    //   width: '400px',
    //   maxWidth: '100%'
    // });
  }
}
