import { Component } from '@angular/core';

@Component({
  selector: 'app-discord-icon',
  templateUrl: './discord-icon.component.html',
  styleUrls: ['./discord-icon.component.scss'],
})
export class DiscordIconComponent {
  strokeColor = getComputedStyle(document.documentElement).getPropertyValue(
    '--icon-stroke'
  );
}
