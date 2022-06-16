import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './root.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PoolEffects } from './pool/pool.effects';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user-claim/user.effects';
import { AuthEffects } from './auth/auth.effects';
import { StakeEffects } from './stake/stake.effects';
import { environment } from 'src/environments/environment';
import { RoleEnrolmentStoreSliceModule } from './role-enrolment/role-enrolment-store-slice.module';
import { SnapshotStoreSliceModule } from './snapshot/snapshot-store-slice.module';

@NgModule({
  imports: [
    StoreModule.forRoot(rootReducer, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      UserEffects,
      StakeEffects,
      AuthEffects,
      PoolEffects
    ]),
    RoleEnrolmentStoreSliceModule,
    SnapshotStoreSliceModule
  ]
})
export class StoreRootModule {}
