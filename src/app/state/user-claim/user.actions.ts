import { createAction, props } from '@ngrx/store';

export const setUpUser = createAction('[User] Set Up User Data')

export const loadUserClaims = createAction('[User] Load User Claims');

export const setDidDocument = createAction(
  '[User] Set User Did Document',
  props<{ didDocument: any }>()
);
