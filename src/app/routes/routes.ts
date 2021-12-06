import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule } from '@angular/router';

export const routes = [
  {
    path: '',
    loadChildren: () => import('./ewt-patron/ewt-patron.module').then(m => m.EwtPatronModule)
  },
  // Not found
  {path: '**', redirectTo: ''}

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
