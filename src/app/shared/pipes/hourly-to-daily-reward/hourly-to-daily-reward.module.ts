import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyToDailyRewardPipe } from './hourly-to-daily-reward.pipe';

@NgModule({
  declarations: [HourlyToDailyRewardPipe],
  imports: [CommonModule],
  exports: [HourlyToDailyRewardPipe]
})
export class HourlyToDailyRewardModule {}
