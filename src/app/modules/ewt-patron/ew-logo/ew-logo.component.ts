import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ew-logo',
  templateUrl: './ew-logo.component.html',
  styleUrls: ['./ew-logo.component.scss'],
})
export class EwLogoComponent implements OnInit {
  logoRadialColor1;
  logoRadialColor2;
  logoRadialColor3;
  logoRadialColor4;
  logoLinearColor1;
  logoLinearColor2;

  ngOnInit(): void {
    this.logoRadialColor1 = this.getColor('--logo-radial-color-1');
    this.logoRadialColor2 = this.getColor('--logo-radial-color-2');
    this.logoRadialColor3 = this.getColor('--logo-radial-color-3');
    this.logoRadialColor4 = this.getColor('--logo-radial-color-4');

    this.logoLinearColor1 = this.getColor('--logo-linear-color-1');
    this.logoLinearColor2 = this.getColor('--logo-linear-color-2');
  }

  getColor(property: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(
      property
    );
  }
}
