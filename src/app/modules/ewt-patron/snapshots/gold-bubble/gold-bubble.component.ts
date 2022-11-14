import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gold-bubble',
  templateUrl: './gold-bubble.component.html',
  styleUrls: ['./gold-bubble.component.scss'],
})
export class GoldBubbleComponent {
  @Input() number: number;
  @Input() status: string;
}
