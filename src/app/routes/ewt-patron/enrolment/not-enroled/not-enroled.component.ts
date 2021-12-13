import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RoleEnrolmentActions } from '@state';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { truthy } from '@operators';

const emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])';

@Component({
  selector: 'app-not-enroled',
  templateUrl: './not-enroled.component.html',
  styleUrls: ['./not-enroled.component.scss']
})
export class NotEnroledComponent {
  // TODO: validate against the same email domain blacklist used on backend against disposable emails
  email = new FormControl('', [Validators.pattern(emailPattern), Validators.required]);

  constructor(private store: Store) {
  }

  enrol() {
    if (this.email.invalid) {
      return;
    }

    this.store.dispatch(RoleEnrolmentActions.enrolFor({email: this.email.value}));
  }

}
