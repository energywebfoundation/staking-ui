import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { IamService } from '../iam.service';
import { map } from 'rxjs/operators';
import { Claim, RegistrationTypes } from 'iam-client-lib';

const registrationTypes = [
  RegistrationTypes.OnChain,
  RegistrationTypes.OffChain,
];

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  constructor(private iamService: IamService) {}

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

  getClaims() {
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

  getNotRejectedClaims(): Observable<Claim[]> {
    return this.getClaims().pipe(
      map((roles) => roles.filter((role) => !role.isRejected))
    );
  }
}
