import {
  SnapshotsRewarder,
  SnapshotsRewarder__factory,
} from '../../../typechain-types';
import { SignerService } from 'iam-client-lib';
import { environment } from '../../../../environments/environment';
import { BigNumberish, ContractTransaction } from 'ethers';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NftService {
  private snapshotRewarder: SnapshotsRewarder;
  private signerService: SignerService;
  init(signer: SignerService) {
    this.snapshotRewarder = new SnapshotsRewarder__factory(
      SnapshotsRewarder__factory.createInterface(),
      SnapshotsRewarder__factory.bytecode
    ).attach(environment.nftAddress);
    this.signerService = signer;
  }

  checkEligibility(): Observable<boolean> {
    return from(this.snapshotRewarder
      .connect(this.signerService.signer)
      .checkEligibility());
  }

  claimReward():  Observable<ContractTransaction> {
    return from(this.snapshotRewarder
      .connect(this.signerService.signer)
      .claimReward());
  }

  getTokenUri(id: BigNumberish) {
    // this.snapshotRewarder.connect(this.signerService.signer).
    return this.snapshotRewarder
      .connect(this.signerService.signer)
      .tokenURI(id);
  }
}
