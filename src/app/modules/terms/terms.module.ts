import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  declarations: [TermsComponent],
  imports: [RouterModule.forChild([{ path: '', component: TermsComponent }])],
  bootstrap: [TermsComponent]
})
export class TermsModule {}
