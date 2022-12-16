import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-silver-bubble',
  templateUrl: './silver-bubble.component.html',
  styleUrls: ['./silver-bubble.component.scss'],
})
export class SilverBubbleComponent {
  @Input() number: number;
  @Input() status: string;
}
