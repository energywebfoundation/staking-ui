import { TestBed } from '@angular/core/testing';

import { ReplaySubject } from 'rxjs';

import { RoleEnrolmentEffects } from './role-enrolment.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RoleEnrolmentState } from './role-enrolment.reducer';

describe('LayoutEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: RoleEnrolmentEffects;
  let store: MockStore<RoleEnrolmentState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoleEnrolmentEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
    store = TestBed.inject(MockStore);

    effects = TestBed.inject(RoleEnrolmentEffects);
  });
});
