import { TestBed, waitForAsync } from '@angular/core/testing';

import { from, of, ReplaySubject } from 'rxjs';

import { PoolEffects } from './pool.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { LoadingService } from '../../shared/services/loading.service';
import { IamService } from '../../shared/services/iam.service';
import { MatDialog } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ToastrService } from 'ngx-toastr';
import * as PoolActions from './pool.actions';
import { utils } from 'ethers';
import { StakingPoolServiceFacade } from '../../shared/services/staking/staking-pool-service-facade';
import { StakingPoolFacade } from '../../shared/services/pool/staking-pool-facade';
import { dialogSpy, iamServiceSpy, loadingServiceSpy, toastrSpy } from '@tests';
import { EnvService } from '../../shared/services/env/env.service';

const { parseEther } = utils;
describe('PoolEffects', () => {
  const stakingService = jasmine.createSpyObj('StakingPoolServiceFacade', [
    'init',
    'createPool',
    'putStake',
  ]);
  const stakingPoolFacadeSpy = jasmine.createSpyObj('StakingPoolFacade', [
    'putStake',
    'isPoolDefined',
  ]);
  let actions$: ReplaySubject<any>;
  let effects: PoolEffects;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PoolEffects,
        { provide: IamService, useValue: iamServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: StakingPoolServiceFacade, useValue: stakingService },
        { provide: StakingPoolFacade, useValue: stakingPoolFacadeSpy },
        { provide: EnvService, useValue: {} },
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
    store = TestBed.inject(MockStore);

    effects = TestBed.inject(PoolEffects);
  });

  describe('putStake$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
    });

    it('should put a stake and refresh data', () => {
      actions$.next(PoolActions.putStake({ amount: '5' }));

      stakingPoolFacadeSpy.putStake.and.returnValue(of());

      effects.putStake$.subscribe((resultAction) => {
        expect(dialogSpy.open).toHaveBeenCalled();
        expect(stakingPoolFacadeSpy.putStake).toHaveBeenCalledWith(
          parseEther('5')
        );
        expect(resultAction).toEqual(PoolActions.getStake());
      });
    });

    it('should not put a stake when staking is disabled', waitForAsync(() => {
      actions$.next(PoolActions.putStake({ amount: '5' }));

      stakingPoolFacadeSpy.putStake.and.returnValue(of());

      effects.putStake$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          null,
          'This subscribe should not return an action'
        );
      });

      expect(toastrSpy.error).toHaveBeenCalled();
    }));

    it('should return failure action when putStake throws an error', () => {
      actions$.next(PoolActions.putStake({ amount: '5' }));

      stakingPoolFacadeSpy.putStake.and.returnValue(
        from(Promise.reject({ message: 'message' }))
      );

      effects.putStake$.subscribe((resultAction) => {
        expect(toastrSpy.error).toHaveBeenCalledWith('message');
        expect(resultAction).toEqual(
          PoolActions.putStakeFailure({ err: 'message' })
        );
      });
    });
  });
});
