import { TestBed, waitForAsync } from '@angular/core/testing';

import { of, ReplaySubject, throwError } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { OrganizationEffects } from './organization.effects';
import { OrganizationService } from './services/organization.service';
import { SwitchboardToastrService } from '../../../shared/services/switchboard-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import * as OrganizationActions from './organization.actions';
import * as OrganizationSelectors from './organization.selectors';

describe('OrganizationEffects', () => {

  const organizationServiceSpy = jasmine.createSpyObj('OrganizationService', ['getOrganizationList', 'getHistory']);
  const toastrSpy = jasmine.createSpyObj('SwitchboardToastrService', ['success', 'error']);
  const dialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll', 'open']);
  let actions$: ReplaySubject<any>;
  let effects: OrganizationEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganizationEffects,
        {provide: OrganizationService, useValue: organizationServiceSpy},
        {provide: SwitchboardToastrService, useValue: toastrSpy},
        {provide: MatDialog, useValue: dialogSpy},
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
    store = TestBed.inject(MockStore);

    effects = TestBed.inject(OrganizationEffects);
  });

  describe('getList$', () => {

    beforeEach(() => {
      actions$ = new ReplaySubject(1);
    });

    it('should dispatch success action', waitForAsync(() => {
      actions$.next(OrganizationActions.getList());
      organizationServiceSpy.getOrganizationList.and.returnValue(of([]));

      effects.getList$.subscribe(resultAction => {
        expect(resultAction).toEqual(OrganizationActions.getListSuccess({list: []}));
      });

    }));

    it('should dispatch failure action', waitForAsync(() => {
      actions$.next(OrganizationActions.getList());
      organizationServiceSpy.getOrganizationList.and.returnValue(throwError({message: 'error'}));

      effects.getList$.subscribe(resultAction => {
        expect(toastrSpy.error).toHaveBeenCalled();
        expect(resultAction).toEqual(OrganizationActions.getListFailure({error: 'error'}));
      });

    }));
  });

  describe('updateSelectedOrganizationAfterEdit$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
    });

    it('should get organization list when updating main organizations', waitForAsync(() => {
      actions$.next(OrganizationActions.updateSelectedOrgAfterEdit());
      store.overrideSelector(OrganizationSelectors.getLastHierarchyOrg, undefined);
      effects.updateSelectedOrganizationAfterEdit$.subscribe(resultAction => {
        expect(resultAction).toEqual(OrganizationActions.getList());
      });
    }));

    it('should get history of organization when updating sub organization', waitForAsync(() => {
      actions$.next(OrganizationActions.updateSelectedOrgAfterEdit());
      store.overrideSelector(OrganizationSelectors.getLastHierarchyOrg, {namespace: 'test'} as any);
      effects.updateSelectedOrganizationAfterEdit$.subscribe(resultAction => {
        expect(resultAction).toEqual(OrganizationActions.setHistory({element: {namespace: 'test'} as any}));
      });
    }));

  });

  describe('updateSelectedOrganizationAfterTransfer$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
    });

    it('should get organization list when transferring main organizations', waitForAsync(() => {
      actions$.next(OrganizationActions.updateSelectedOrgAfterEdit());
      store.overrideSelector(OrganizationSelectors.getLastHierarchyOrg, undefined);
      store.overrideSelector(OrganizationSelectors.getHierarchyLength, 0);
      effects.updateSelectedOrganizationAfterEdit$.subscribe(resultAction => {
        expect(resultAction).toEqual(OrganizationActions.getList());
      });
    }));

    it('should get history of organization when transferring sub organization', waitForAsync(() => {
      actions$.next(OrganizationActions.updateSelectedOrgAfterEdit());
      store.overrideSelector(OrganizationSelectors.getLastHierarchyOrg, {namespace: 'test'} as any);
      store.overrideSelector(OrganizationSelectors.getHierarchyLength, 1);
      effects.updateSelectedOrganizationAfterEdit$.subscribe(resultAction => {
        expect(resultAction).toEqual(OrganizationActions.setHistory({element: {namespace: 'test'} as any}));
      });
    }));

  });
});
