import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RoleEnrolmentActions from '../../../../state/role-enrolment/role-enrolment.actions';
import { MatDialog } from '@angular/material/dialog';
import { truthy } from '@operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-not-approved',
  templateUrl: './not-approved.component.html',
  styleUrls: ['./not-approved.component.scss']
})
export class NotApprovedComponent {

  constructor(private store: Store,
              private dialog: MatDialog) {
  }

  cancelRequest() {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      maxWidth: '100%',
      disableClose: true
    }).afterClosed().pipe(truthy()).subscribe(() => this.store.dispatch(RoleEnrolmentActions.cancelEnrolmentRequest()));

  }

}
