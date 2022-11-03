import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getNFTUrl,
  isEligibleToClaimNFT,
  isNFTClaimed,
} from '../../../../state/snapshot/snapshot.selectors';

@Component({
  selector: 'app-nft-container',
  templateUrl: './nft-container.component.html',
  styleUrls: ['./nft-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NftContainerComponent {
  @HostBinding('class') hostClasses = 'col-12 mt-4 mt-xl-4';
  isEligibleToClaimNFT$ = this.store.select(isEligibleToClaimNFT);
  isNFTClaimed$ = this.store.select(isNFTClaimed);
  getNFTUrl$ = this.store.select(getNFTUrl);

  constructor(private store: Store) {}
}
