import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  production: true,
  environmentName: 'production',
  featureVisible: true,
  application: true,
  theme: 'default',
  rpcUrl: 'https://consortia-rpc.energyweb.org/',
  chainId: 246,
  cacheServerUrl: 'https://identitycache.energyweb.org/v1',
  natsServerUrl: 'https://identityevents.energyweb.org/',
  kmsServerUrl: 'https://kms.energyweb.org/connect/new',
  stakingPoolFactoryAddress: '0xc11aa8A6Ca3de02c7eB106Fb8e85cee051c7B2Fe',
  checkStakingVerification: true,
  showAzureLoginOption: false,
  isWalletConnectEnabled: false,
  patronRole: 'email.roles.verification.apps.energyweb.auth.ewc',
  claimManagerAddress: '0x23b026631A6f265d17CFee8aa6ced1B244f3920C',

  networkName: 'EWC Consortia RPC',
  currencyName: 'EWT',
  currencySymbol: 'EWT',
  blockExlorerUrl: 'https://explorer.energyweb.org',
  snapshotRoles: ['testsnapshot1test.roles.snapshottest.apps.energyweb.auth.ewc']
};

export const environment = { ...commonEnv, ...env };
