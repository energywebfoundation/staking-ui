import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthActions, PoolActions, PoolSelectors } from '@state';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-ewt-patron',
  templateUrl: './ewt-patron.component.html',
  styleUrls: ['./ewt-patron.component.scss']
})
export class EwtPatronComponent implements OnInit, OnDestroy {
  balance$ = this.store.select(PoolSelectors.getBalance);
  performance$ = this.store.select(PoolSelectors.getPerformance);
  annualReward$ = this.store.select(PoolSelectors.getAnnualReward);
  details$ = this.store.select(PoolSelectors.getOrganizationDetails);
  hardCap$ = this.store.select(PoolSelectors.getOrganizationLimit);
  getTotalStakedPercent$ = this.store.select(PoolSelectors.getTotalStakedPercent);
  getTotalStaked$ = this.store.select(PoolSelectors.getTotalStaked);

  destroy$ = new Subject<void>();

  constructor(private store: Store,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService) {
  }

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
