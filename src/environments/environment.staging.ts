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
  stakingPoolFactoryAddress: '0xf66Cd33d68b4fF3Ab00a122e59b8B6d50B9C97eC',
  checkStakingVerification: true,
  showAzureLoginOption: false,
  isWalletConnectEnabled: false,
  patronRole: 'email.roles.verification.apps.energyweb.auth.ewc',
  claimManagerAddress: '0x23b026631A6f265d17CFee8aa6ced1B244f3920C',

  networkName: 'EWC',
  currencyName: 'EWT',
  currencySymbol: 'EWT',
  blockExlorerUrl: 'https://explorer.energyweb.org',
  snapshotRoles: [
    'snapshot1.roles.consortiapool.apps.energyweb.auth.ewc',
    'snapshot2.roles.consortiapool.apps.energyweb.auth.ewc',
    'snapshot3.roles.consortiapool.apps.energyweb.auth.ewc',
    'snapshot4.roles.consortiapool.apps.energyweb.auth.ewc',
    'silverpool.roles.consortiapool.apps.energyweb.auth.ewc',
    'goldpool.roles.consortiapool.apps.energyweb.auth.ewc',
  ],
};

export const environment = { ...commonEnv, ...env };
