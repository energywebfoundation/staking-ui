import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoleEnrolmentSelectors } from '@state';
import { RoleEnrolmentStatus } from '../../../../state/role-enrolment/models/role-enrolment-status.enum';

@Component({
  selector: 'app-enrolment-status-check',
  templateUrl: './enrolment-status-check.component.html',
  styleUrls: ['./enrolment-status-check.component.scss']
})
export class EnrolmentStatusCheckComponent {
  getStatus$ = this.store.select(RoleEnrolmentSelectors.getStatus);
  roleEnrolmentStatus = RoleEnrolmentStatus;
  constructor(private store: Store) { }


}
