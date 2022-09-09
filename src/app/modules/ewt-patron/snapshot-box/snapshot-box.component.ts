import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-snapshot-box',
  templateUrl: './snapshot-box.component.html',
  styleUrls: ['./snapshot-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnapshotBoxComponent {}
