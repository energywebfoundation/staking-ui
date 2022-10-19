import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  production: true,
  environmentName: 'staging',
  featureVisible: true,
  application: true,
  theme: 'default',
  rpcUrl: 'https://rpc.energyweb.org/',
  chainId: 246,
  cacheServerUrl: 'https://identitycache.energyweb.org/v1',
  natsServerUrl: 'https://identityevents.energyweb.org/',
  kmsServerUrl: 'https://kms.energyweb.org/connect/new',
  stakingPoolFactoryAddress: '0x630FA5B60cF5A85321cC9E8cc1e6A32f4dF73e8e',
  checkStakingVerification: true,
  showAzureLoginOption: false,
  isWalletConnectEnabled: false,
  patronRole: 'email.roles.verification.apps.energyweb.iam.ewc',
  claimManagerAddress: undefined,

  networkName: 'EWC',
  currencyName: 'EWT',
  currencySymbol: 'EWT',
  blockExlorerUrl: 'https://explorer.energyweb.org',
};

export const environment = { ...commonEnv, ...env };
