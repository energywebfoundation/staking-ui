import { Component } from '@angular/core';
import { RoleEnrolmentSelectors, UserClaimSelectors } from '@state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-not-verified-info',
  templateUrl: './not-verified-info.component.html',
  styleUrls: ['./not-verified-info.component.scss'],
})
export class NotVerifiedInfoComponent {
  emailNotApproved$ = this.store.select(
    RoleEnrolmentSelectors.emailNotApproved
  );
  getAddress$ = this.store.select(UserClaimSelectors.getAddress);

  constructor(private store: Store) {}
}
