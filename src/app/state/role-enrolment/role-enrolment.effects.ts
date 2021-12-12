import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class RoleEnrolmentEffects {


  constructor(private actions$: Actions,
              private store: Store) {
  }
}
