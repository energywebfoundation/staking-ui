import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telegram-icon',
  templateUrl: './telegram-icon.component.html',
  styleUrls: ['./telegram-icon.component.scss']
})
export class TelegramIconComponent {
  strokeColor = getComputedStyle(document.documentElement).getPropertyValue(
    '--icon-stroke'
  );
}
