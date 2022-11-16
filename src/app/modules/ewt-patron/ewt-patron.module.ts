import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EwtPatronComponent } from './ewt-patron/ewt-patron.component';
import { RouterModule } from '@angular/router';
import { StakeComponent } from './stake/stake.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PercentButtonsComponent } from './percent-buttons/percent-buttons.component';
import { DividerComponent } from './divider/divider.component';
import { StakeSuccessComponent } from './stake-success/stake-success.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { LastDigitsPipe } from './pipes/last-digits.pipe';
import { ConnectToWalletModule } from '../connect-to-wallet/connect-to-wallet.module';
import { StakingHeaderComponent } from './staking-header/staking-header.component';
import { StakingFooterComponent } from './staking-footer/staking-footer.component';
import { UserMenuModule } from '../../layout/components/user-menu/user-menu.module';
import { EnrolmentStatusCheckComponent } from './enrolment/enrolment-status-check/enrolment-status-check.component';
import { NotEnroledComponent } from './enrolment/not-enroled/not-enroled.component';
import { NotApprovedComponent } from './enrolment/not-approved/not-approved.component';
import { NotSyncedComponent } from './enrolment/not-synced/not-synced.component';
import { ApprovedSyncedComponent } from './enrolment/approved-synced/approved-synced.component';
import { ConfirmationDialogComponent } from './enrolment/confirmation-dialog/confirmation-dialog.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { HourlyToDailyRewardModule } from '../../shared/pipes/hourly-to-daily-reward/hourly-to-daily-reward.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CircleProgressModule } from '../circle-progress/circle-progress.module';
import { NotVerifiedInfoComponent } from './enrolment/not-verified-info/not-verified-info.component';
import { LabelComponent } from './label/label.component';
import { H4Component } from './h4/h4.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  declarations: [
    EwtPatronComponent,
    StakeComponent,
    PercentButtonsComponent,
    DividerComponent,
    StakeSuccessComponent,
    WithdrawComponent,
    LastDigitsPipe,
    StakingHeaderComponent,
    StakingFooterComponent,
    EnrolmentStatusCheckComponent,
    NotEnroledComponent,
    NotApprovedComponent,
    NotSyncedComponent,
    ApprovedSyncedComponent,
    ConfirmationDialogComponent,
    ProgressBarComponent,
    NotVerifiedInfoComponent,
    LabelComponent,
    H4Component,
    TermsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EwtPatronComponent }]),
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatProgressBarModule,
    SharedModule,
    LayoutModule,
    ConnectToWalletModule,
    UserMenuModule,
    HourlyToDailyRewardModule,
    MatProgressSpinnerModule,
    CircleProgressModule.forRoot(),
  ],
})
export class EwtPatronModule {}
