import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CircleProgressComponent,
  CircleProgressOptions,
  CircleProgressOptionsInterface,
} from './circle-progress.component';

@NgModule({
  declarations: [CircleProgressComponent],
  imports: [CommonModule],
  exports: [CircleProgressComponent],
})
export class CircleProgressModule {
  static forRoot(
    options: CircleProgressOptionsInterface = {}
  ): ModuleWithProviders<CircleProgressModule> {
    return {
      ngModule: CircleProgressModule,
      providers: [{ provide: CircleProgressOptions, useValue: options }],
    };
  }
}
