import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss']
})
export class SnapshotComponent {
  @Input() title: string = 'Lorem Ipsum';
  @Input() description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  @Input() number: number;
  @Input() type: 'past' | 'present' | 'future';
}
