import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoleEnrolmentActions } from '@state';

@Component({
  selector: 'app-not-synced',
  templateUrl: './not-synced.component.html',
  styleUrls: ['./not-synced.component.scss'],
})
export class NotSyncedComponent {
  constructor(private store: Store) {}

  addRole() {
    this.store.dispatch(RoleEnrolmentActions.addRole());
  }
}
