import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAcceptedSnapshots } from '../../../state/snapshot/snapshot.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-snapshot-success',
  templateUrl: './snapshot-success.component.html',
  styleUrls: ['./snapshot-success.component.scss'],
})
export class SnapshotSuccessComponent {
  acceptedSnapshots$: Observable<number[]> =
    this.store.select(getAcceptedSnapshots);
  constructor(private store: Store) {}
}
