import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourToDailyReward'
})
export class HourlyToDailyRewardPipe implements PipeTransform {
  transform(hourlyRewards: string): number {
    if (!hourlyRewards) {
      return 0;
    }
    return (1 + Number(hourlyRewards)) ^ (12 - 1);
  }
}
