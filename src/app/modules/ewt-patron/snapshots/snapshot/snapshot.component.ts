import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss']
})
export class SnapshotComponent {
  @Input() number: number;
  @Input() type: 'past' | 'present' | 'future';
}
