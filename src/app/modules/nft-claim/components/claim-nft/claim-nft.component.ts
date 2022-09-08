import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output,
} from '@angular/core';

@Component({
  selector: 'app-claim-nft',
  templateUrl: './claim-nft.component.html',
  styleUrls: ['./claim-nft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimNftComponent {
  @Input() imageUrl: string;
  @Output() claim = new EventEmitter<void>();
  claimNFT() {
  }
}
