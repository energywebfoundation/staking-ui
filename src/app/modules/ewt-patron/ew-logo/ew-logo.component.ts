import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ew-logo',
  templateUrl: './ew-logo.component.html',
  styleUrls: ['./ew-logo.component.scss'],
})
export class EwLogoComponent {
  @Input() size: 'large' | 'small' = 'large'
  logoRadialColor1 = this.getColor('--logo-radial-color-1');
  logoRadialColor2 = this.getColor('--logo-radial-color-2');
  logoRadialColor3 = this.getColor('--logo-radial-color-3');
  logoRadialColor4 = this.getColor('--logo-radial-color-4');

  logoLinearColor1 = this.getColor('--logo-linear-color-1');
  logoLinearColor2 = this.getColor('--logo-linear-color-2');

  get isBig() {
    return this.size === 'large';
  }

  getColor(property: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(
      property
    );
  }
}
