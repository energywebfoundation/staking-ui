import { Component } from '@angular/core';

@Component({
  selector: 'app-approved-synced',
  templateUrl: './approved-synced.component.html',
  styleUrls: ['./approved-synced.component.scss'],
})
export class ApprovedSyncedComponent {
  imgUrl = getComputedStyle(document.documentElement)
    .getPropertyValue('--congratulations-url')
    .replace('"', '')
    .replace('"', '')
    .trim();
}
