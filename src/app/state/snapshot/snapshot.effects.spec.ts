import { TestBed } from '@angular/core/testing';

import { of, ReplaySubject } from 'rxjs';

import { SnapshotEffects } from './snapshot.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SnapshotState } from './snapshot.reducer';
import { ClaimsService } from '../../shared/services/claims/claims.service';
import { EnvService } from '../../shared/services/env/env.service';
import {
  checkRevealedSnapshots,
  checkRevealedSnapshotsSuccess,
} from './snapshot.actions';

describe('SnapshotEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: SnapshotEffects;
  let store: MockStore<SnapshotState>;
  let claimsServiceSpy;
  let envService;

  beforeEach(() => {
    claimsServiceSpy = jasmine.createSpyObj('ClaimsService', ['getClaims']);

    TestBed.configureTestingModule({
      providers: [
        SnapshotEffects,
        { provide: ClaimsService, useValue: claimsServiceSpy },
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
    store = TestBed.inject(MockStore);

    effects = TestBed.inject(SnapshotEffects);
    envService = TestBed.inject(EnvService);
  });

  describe('checkEnrolments$', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject(1);
    });

    it('should return claims with snapshot rolename', (done) => {
      const snapshotRoles: any[] = [
        {
          claimType: 'snapshot1.roles.consortiapool.apps.energyweb.iam.ewc',
          isRejected: false,
          isAccepted: true,
        },
      ];
      claimsServiceSpy.getClaims.and.returnValue(
        of([...snapshotRoles, { claimType: 'test.roles.energyweb.iam.ewc' }])
      );
      actions$.next(checkRevealedSnapshots());
      spyOnProperty(envService, 'snapshotRoles').and.returnValue([
        'snapshot1.roles.consortiapool.apps.energyweb.iam.ewc',
      ]);
      effects.checkEnrolments$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          checkRevealedSnapshotsSuccess({ snapshotRoles: snapshotRoles })
        );
        done();
      });
    });

    it('should return only claim with snapshot 2 ', (done) => {
      const snapshotRoles: any[] = [
        {
          claimType: 'snapshot2.roles.consortiapool.apps.energyweb.iam.ewc',
          isRejected: false,
          isAccepted: true,
        },
      ];
      claimsServiceSpy.getClaims.and.returnValue(
        of([...snapshotRoles, { claimType: 'test.roles.energyweb.iam.ewc' }])
      );
      actions$.next(checkRevealedSnapshots());
      spyOnProperty(envService, 'snapshotRoles').and.returnValue([
        'snapshot1.roles.consortiapool.apps.energyweb.iam.ewc',
        'snapshot2.roles.consortiapool.apps.energyweb.iam.ewc',
        'snapshot3.roles.consortiapool.apps.energyweb.iam.ewc',
      ]);
      effects.checkEnrolments$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          checkRevealedSnapshotsSuccess({ snapshotRoles: snapshotRoles })
        );
        done();
      });
    });

    it('should return first three snapshots', (done) => {
      const snapshotRoles: any[] = [
        {
          claimType: 'snapshot2.roles.consortiapool.apps.energyweb.iam.ewc',
          isRejected: false,
          isAccepted: true,
        },
        {
          claimType: 'snapshot1.roles.consortiapool.apps.energyweb.iam.ewc',
          isRejected: false,
          isAccepted: true,
        },
        {
          claimType: 'snapshot3.roles.consortiapool.apps.energyweb.iam.ewc',
          isRejected: false,
          isAccepted: true,
        },
      ];
      claimsServiceSpy.getClaims.and.returnValue(
        of([
          ...snapshotRoles,
          {
            claimType: 'test.roles.energyweb.iam.ewc',
            isRejected: false,
            isAccepted: true,
          },
        ])
      );
      actions$.next(checkRevealedSnapshots());
      spyOnProperty(envService, 'snapshotRoles').and.returnValue([
        'snapshot1.roles.consortiapool.apps.energyweb.iam.ewc',
        'snapshot2.roles.consortiapool.apps.energyweb.iam.ewc',
        'snapshot3.roles.consortiapool.apps.energyweb.iam.ewc',
      ]);
      effects.checkEnrolments$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          checkRevealedSnapshotsSuccess({ snapshotRoles: snapshotRoles })
        );
        done();
      });
    });
  });
});
