import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as OrganizationActions from './organization.actions';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SwitchboardToastrService } from '../../../shared/services/switchboard-toastr.service';
import { OrganizationService } from './services/organization.service';
import * as OrganizationSelectors from './organization.selectors';
import { OrganizationProvider } from './models/organization-provider.interface';

@Injectable()
export class OrganizationEffects {

  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.getList),
      switchMap(() => this.orgService.getOrganizationList()),
      map((list: OrganizationProvider[]) => OrganizationActions.getListSuccess({list})),
      catchError((err) => {
        console.error(err);
        this.toastr.error('Something went wrong while getting list of organizations', 'Organization');
        return of(OrganizationActions.getListFailure({error: err.message}));
      })
    )
  );

  updateSelectedOrganizationAfterEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.updateSelectedOrgAfterEdit),
      withLatestFrom(
        this.store.select(OrganizationSelectors.getLastHierarchyOrg)
      ),
      map(([, lastOrg]) => {
        if (lastOrg) {
          return OrganizationActions.setHistory({element: lastOrg});
        }
        return OrganizationActions.getList();
      })
    )
  );

  updateSelectedOrganizationAfterTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.updateSelectedOrgAfterTransfer, OrganizationActions.updateSelectedOrgAfterRemoval),
      withLatestFrom(
        this.store.select(OrganizationSelectors.getLastHierarchyOrg),
        this.store.select(OrganizationSelectors.getHierarchyLength)
      ),
      map(([, lastOrg, hierarchyLength]) => {
        if (hierarchyLength) {
          return OrganizationActions.setHistory({element: lastOrg});
        }
        return OrganizationActions.getList();
      })
    )
  );

  constructor(private actions$: Actions,
              private store: Store,
              private orgService: OrganizationService,
              private dialog: MatDialog,
              private toastr: SwitchboardToastrService
  ) {
  }

}
