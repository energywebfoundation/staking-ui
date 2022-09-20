import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer, USER_FEATURE_KEY } from './snapshot.reducer';
import { SnapshotEffects } from './snapshot.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(USER_FEATURE_KEY, reducer),
    EffectsModule.forFeature([SnapshotEffects]),
  ],
})
export class SnapshotStoreSliceModule {}
