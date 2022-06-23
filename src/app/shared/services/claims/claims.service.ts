import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { IamService } from '../iam.service';
import { filter, map } from 'rxjs/operators';
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
      registrationTypes,
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

  getNotRejectedClaims(): Observable<Claim[]> {
    return this.getClaims().pipe(
      map((roles) => roles.filter((role) => !role.isRejected))
    );
  }

  getOnlySyncedOnChainRoles(claims: Claim[]): Observable<Claim[]> {
    return forkJoin(
      claims
        .filter((claim) => claim.isAccepted)
        .map((claim) =>
          from(
            this.iamService.claimsService.hasOnChainRole(
              this.iamService.signerService.did,
              claim.claimType,
              parseInt(claim.claimTypeVersion, 10)
            )
          ).pipe(
            map((v) => {
              return {
                isSyncedOnChain: v,
                ...claim,
              };
            }),
            filter((v) => v.isSyncedOnChain)
          )
        )
    );
  }
}
