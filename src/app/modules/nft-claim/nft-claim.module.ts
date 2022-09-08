import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftContainerComponent } from './components/nft-container/nft-container.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [NftContainerComponent],
  exports: [NftContainerComponent],
  imports: [CommonModule, SharedModule],
})
export class NftClaimModule {}
