import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  production: true,
  environmentName: "production",
  featureVisible: true,
  application: true,
  theme: "default",
  rpcUrl: "https://rpc.energyweb.org/",
  chainId: 246,
  cacheServerUrl: "https://identitycache.energyweb.org/v1",
  natsServerUrl: "https://identityevents.energyweb.org/",
  kmsServerUrl: "https://kms.energyweb.org/connect/new",
  stakingPoolFactoryAddress: "0xAA6Ef952d21C83704Ead95649014F5945Eab4f34",
  checkStakingVerification: true,
  showAzureLoginOption: false,
  isWalletConnectEnabled: false,
  patronRole: "email.roles.verification.apps.energyweb.auth.ewc",
  claimManagerAddress: "0x23b026631A6f265d17CFee8aa6ced1B244f3920C",

  networkName: "EWC",
  currencyName: "EWT",
  currencySymbol: "EWT",
  blockExlorerUrl: "https://explorer.energyweb.org",
};

export const environment = { ...commonEnv, ...env };
