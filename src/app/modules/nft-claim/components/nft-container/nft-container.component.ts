import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-nft-container',
  templateUrl: './nft-container.component.html',
  styleUrls: ['./nft-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NftContainerComponent {
  @HostBinding('class') hostClasses = 'col-12 mt-4 mt-xl-4';
}
