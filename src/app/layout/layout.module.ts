import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoadingComponent } from './loading/loading.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    SharedModule,
    NgxSpinnerModule,
  ],
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent
  ]
})
export class LayoutModule {
}
