import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-claim-nft',
  templateUrl: './claim-nft.component.html',
  styleUrls: ['./claim-nft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimNftComponent {
  @Input() imageUrl: string;
  @Input() hideClaimButton = false;
  @Input() disableButton = false;

  constructor(private store: Store) {}

  claimNFT(): void {
    // this.store.dispatch(claimReward());
  }
}
