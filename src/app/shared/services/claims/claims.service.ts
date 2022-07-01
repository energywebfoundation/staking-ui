import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { IamService } from '../iam.service';
import { Claim, RegistrationTypes } from 'iam-client-lib';
import { LoadingService } from '../loading.service';

const registrationTypes = [
  RegistrationTypes.OnChain,
  RegistrationTypes.OffChain,
];

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  constructor(private iamService: IamService,
              private loadingService: LoadingService) {}

  createClaim(claimType: string) {
    return from(
      this.iamService.claimsService.createClaimRequest({
        registrationTypes,
        claim: {
          requestorFields: [],
          claimType,
          claimTypeVersion: 1,
        },
      })
    );
  }

  publishApprovedClaim(claim: Claim) {
    return from(this.iamService.claimsService.publishPublicClaim({
      registrationTypes: [RegistrationTypes.OnChain],
      claim: {
        claimType: claim.claimType,
        token: claim.issuedToken
      }
    }));
  }

  getClaims(showLoader: boolean) {
    if (showLoader) {
      this.loadingService.show();
    }
    return from(
      this.iamService.claimsService.getClaimsByRequester({
        did: this.iamService.signerService.did,
      })
    );
  }

  async hasOnChainRole(claim: Claim) {
    const hasOnChainRole = await this.iamService.claimsService.hasOnChainRole(this.iamService.signerService.did, claim.claimType, +claim.claimTypeVersion);
    return {
      ...claim,
      isSyncedOnChain: hasOnChainRole
    }
  }
}
