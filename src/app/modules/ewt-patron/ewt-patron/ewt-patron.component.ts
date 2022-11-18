import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {
  AuthActions,
  PoolActions,
  PoolSelectors,
  RoleEnrolmentSelectors,
} from '@state';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { EnvService } from '../../../shared/services/env/env.service';
import { StakeSuccessComponent } from '../stake-success/stake-success.component';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawComponent } from '../withdraw/withdraw.component';

@Component({
  selector: 'app-ewt-patron',
  templateUrl: './ewt-patron.component.html',
  styleUrls: ['./ewt-patron.component.scss'],
})
export class EwtPatronComponent implements OnInit, OnDestroy {
  getTotalStakedPercent$ = this.store.select(
    PoolSelectors.getTotalStakedPercent
  );
  isStakingVerificationEnabled = this.envService.checkStakingVerification;
  isPatronSynced = this.store.select(RoleEnrolmentSelectors.isSynced);
  destroy$ = new Subject<void>();
  numberOfSnapshots: number = this.envService.snapshotRoles.length;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private envService: EnvService,
    private dialog: MatDialog,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async ngOnInit() {
    this.setOrganization();
    this.login();
    this.dialog.open(WithdrawComponent, {
      width: '400px',
      maxWidth: '100%',
      disableClose: true,
      backdropClass: 'backdrop-shadow',
    });
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
