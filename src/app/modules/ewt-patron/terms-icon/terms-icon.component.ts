import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-icon',
  templateUrl: './terms-icon.component.html',
  styleUrls: ['./terms-icon.component.scss']
})
export class TermsIconComponent implements OnInit {
  stopColor1: string;
  stopColor2: string;
  constructor() { }

  ngOnInit(): void {
    this.stopColor1 = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--terms-color-1');
    this.stopColor2 = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--terms-color-2');
  }

}
