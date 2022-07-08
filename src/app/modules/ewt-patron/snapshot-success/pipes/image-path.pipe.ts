import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePath',
})
export class ImagePathPipe implements PipeTransform {
  private readonly path = '../../../../assets/img/staking/';
  transform(value: number[]): string {
    const selectedImage =
      value.length > 0 ? 'staking-success-image.png' : 'snapshot-failure.png';
    return this.path + selectedImage;
  }
}
