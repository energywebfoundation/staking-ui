import { TestBed } from '@angular/core/testing';

import { of, ReplaySubject, throwError } from 'rxjs';

import { UserEffects } from './user.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { LoadingService } from '../../shared/services/loading.service';
import { IamService } from '../../shared/services/iam.service';
import { MatDialog } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserClaimState } from './user.reducer';
import { ToastrService } from 'ngx-toastr';
import { dialogSpy, iamServiceSpy, loadingServiceSpy, toastrSpy } from '@tests';

describe('UserEffects', () => {

  let actions$: ReplaySubject<any>;
  let effects: UserEffects;
  let store: MockStore<UserClaimState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        {provide: IamService, useValue: iamServiceSpy},
        {provide: LoadingService, useValue: loadingServiceSpy},
        {provide: MatDialog, useValue: dialogSpy},
        {provide: ToastrService, useValue: toastrSpy},
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
    store = TestBed.inject(MockStore);

    effects = TestBed.inject(UserEffects);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  })

});
