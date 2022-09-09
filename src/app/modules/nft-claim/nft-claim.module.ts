import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftContainerComponent } from './components/nft-container/nft-container.component';
import { SharedModule } from '../../shared/shared.module';
import { ClaimNftComponent } from './components/claim-nft/claim-nft.component';

@NgModule({
  declarations: [NftContainerComponent, ClaimNftComponent],
  exports: [NftContainerComponent],
  imports: [CommonModule, SharedModule],
})
export class NftClaimModule {}
