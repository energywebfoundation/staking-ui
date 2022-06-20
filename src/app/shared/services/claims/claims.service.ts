import { Injectable } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { IamService } from '../iam.service';
import { filter, map } from 'rxjs/operators';
import { Claim } from 'iam-client-lib';

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  constructor(private iamService: IamService) {}

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
