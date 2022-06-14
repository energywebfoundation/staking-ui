import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {
  AuthActions,
  PoolActions,
  PoolSelectors,
  RoleEnrolmentSelectors
} from '@state';
import { LoginService } from 'src/app/shared/services/login/login.service';
import * as poolSelectors from '../../../state/pool/pool.selectors';
import { EnvService } from '../../../shared/services/env/env.service';

@Component({
  selector: 'app-ewt-patron',
  templateUrl: './ewt-patron.component.html',
  styleUrls: ['./ewt-patron.component.scss']
})
export class EwtPatronComponent implements OnInit, OnDestroy {
  hardCap$ = this.store.select(PoolSelectors.getOrganizationLimit);
  getTotalStakedPercent$ = this.store.select(
    PoolSelectors.getTotalStakedPercent
  );
  getTotalStaked$ = this.store.select(PoolSelectors.getTotalStaked);
  ratio$ = this.store.select(poolSelectors.ratio);
  isStakingVerificationEnabled = this.envService.checkStakingVerification;
  isPatronSynced = this.store.select(RoleEnrolmentSelectors.isSynced);
  destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private envService: EnvService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async ngOnInit() {
    this.setOrganization();
    this.login();
  }

  private login() {
    if (this.loginService.isSessionActive()) {
      this.store.dispatch(AuthActions.reinitializeAuthForPatron());
    } else {
      this.store.dispatch(AuthActions.openLoginDialog());
    }
  }

  private setOrganization(): void {
    this.store.dispatch(PoolActions.setOrganization());
  }
}
