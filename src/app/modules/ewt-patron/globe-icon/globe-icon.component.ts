import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globe-icon',
  templateUrl: './globe-icon.component.html',
  styleUrls: ['./globe-icon.component.scss']
})
export class GlobeIconComponent  {
  strokeColor = getComputedStyle(document.documentElement).getPropertyValue(
    '--icon-stroke'
  );

}
