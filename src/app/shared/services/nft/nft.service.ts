import {
  SnapshotsRewarder,
  SnapshotsRewarder__factory,
} from '../../../typechain-types';
import { SignerService } from 'iam-client-lib';
import { environment } from '../../../../environments/environment';
import { ContractTransaction } from 'ethers';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NftService {
  private snapshotRewarder: SnapshotsRewarder;
  private signerService: SignerService;
  constructor(private http: HttpClient) {}

  init(signer: SignerService) {
    this.snapshotRewarder = new SnapshotsRewarder__factory(
      SnapshotsRewarder__factory.createInterface(),
      SnapshotsRewarder__factory.bytecode
    ).attach(environment.nftAddress);
    this.signerService = signer;
  }

  checkEligibility(): Observable<boolean> {
    return from(
      this.snapshotRewarder
        .connect(this.signerService.signer)
        .checkEligibility()
    );
  }

  async claimReward(): Promise<ContractTransaction> {
    const contract = await this.snapshotRewarder
      .connect(this.signerService.signer)
      .claimReward();
    await contract.wait();

    return contract;
  }

  getRewardedNFT(): Observable<string> {
    let hasError = false;
    return from(
      this.snapshotRewarder
        .connect(this.signerService.signer)
        .getRewardedNFT(this.signerService.address)
    ).pipe(
      catchError((_) => {
        hasError = true;
        return of();
      }),
      filter(() => !hasError),
      switchMap((link: string) =>
        this.http.get(link, { responseType: 'text' }).pipe(
          map((data: string) => {
            console.log(data);
            console.log();
            return JSON.parse(data.split('}')[0] + '}')?.image;
          })
        )
      )
    );
  }
}
