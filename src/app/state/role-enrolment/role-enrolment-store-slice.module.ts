import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoleEnrolmentEffects } from './role-enrolment.effects';
import { reducer, USER_FEATURE_KEY } from './role-enrolment.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(USER_FEATURE_KEY, reducer),
    EffectsModule.forFeature([RoleEnrolmentEffects]),
  ],
})
export class RoleEnrolmentStoreSliceModule {}
