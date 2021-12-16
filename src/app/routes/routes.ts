import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule } from '@angular/router';
import {TermsModule} from "../modules/terms/terms.module";

export const routes = [
  {
    path: '',
    loadChildren: () => import('../modules/ewt-patron/ewt-patron.module').then(m => m.EwtPatronModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('../modules/terms/terms.module').then(m => m.TermsModule)
  },
  // Not found
  {path: '**', redirectTo: '/'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
      useHash: false,
      preloadingStrategy: NoPreloading
    }),
  ],
  exports: [RouterModule]
})
export class RoutingModule {
}
