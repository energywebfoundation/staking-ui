import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  theme = environment.theme;
  rpcUrl = environment.rpcUrl;
  chainId = environment.chainId;
  cacheServerUrl = environment.cacheServerUrl;
  natsServerUrl = environment.natsServerUrl;
  kmsServerUrl = environment.kmsServerUrl;
  stakingPoolFactoryAddress = environment.stakingPoolFactoryAddress;
  checkStakingVerification = environment.checkStakingVerification;
  showAzureLoginOption = environment.showAzureLoginOption;
  isWalletConnectEnabled = environment.isWalletConnectEnabled;
  patronRole = environment.patronRole;
  claimManagerAddress = environment.claimManagerAddress;
  networkName = environment.networkName;
  currencyName = environment.currencyName;
  currencySymbol = environment.currencySymbol;
  blockExlorerUrl = environment.blockExlorerUrl;
  snapshotRoles = environment.snapshotRoles;
}
