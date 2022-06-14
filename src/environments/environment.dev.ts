import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  production: false,
  environmentName: 'development',
  featureVisible: true,
  application: true,
  theme: 'default',
  rpcUrl: 'https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/',
  chainId: 73799,
  cacheServerUrl: 'https://identitycache-dev.energyweb.org/v1',
  natsServerUrl: 'https://identityevents-dev.energyweb.org/',
  kmsServerUrl: undefined,
  stakingPoolFactoryAddress: '0xE4517Ee888361485031916eE478d19052e159038',
  checkStakingVerification: true,
  showAzureLoginOption: false,
  isWalletConnectEnabled: false,
  patronRole: 'email.roles.verification.apps.energyweb.iam.ewc',
  claimManagerAddress: '0x5339adE9332A604A1c957B9bC1C6eee0Bcf7a031',

  networkName: 'EnergyWeb Volta Chain',
  currencyName: 'Volta Token',
  currencySymbol: 'VT',
  blockExlorerUrl: 'https://volta-explorer.energyweb.org'
};

export const environment = { ...commonEnv, ...env };
