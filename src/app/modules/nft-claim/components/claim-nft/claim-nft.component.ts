import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { claimReward } from '../../../../state/snapshot/snapshot.actions';

@Component({
  selector: 'app-claim-nft',
  templateUrl: './claim-nft.component.html',
  styleUrls: ['./claim-nft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimNftComponent {
  @Input() imageUrl: string;
  @Input() hideClaimButton = false;

  constructor(private store: Store) {}

  claimNFT(): void {
    this.store.dispatch(claimReward());
  }
}
