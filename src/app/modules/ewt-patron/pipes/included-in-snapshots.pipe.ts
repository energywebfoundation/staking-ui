import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includedInSnapshots',
})
export class IncludedInSnapshotsPipe implements PipeTransform {
  readonly successBefore = "You're included in snapshot ";
  readonly noSnapshots = "You're not included in any snapshot";

  transform(value: number[]): string {
    if (value.length === 0) {
      return this.noSnapshots;
    }

    const snapshotsNumbers = value
      .map((v) => v + 1)
      .map((val, index) => {
        const isOnlyOneElement = value.length === 1;
        const isBeforeLast = value.length - 2 === index;

        if (isOnlyOneElement || isBeforeLast) {
          return `${val} `;
        }

        const isLastElement = value.length === index + 1;
        if (isLastElement) {
          return `and ${val}`;
        }

        return `${val}, `;
      });

    return this.successBefore + snapshotsNumbers.join('').trim();
  }
}
