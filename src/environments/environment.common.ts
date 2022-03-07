export const commonEnv = {
  IDENTITY_CONTRACT_ADDRESS: "0x04eEe47DA1e717fb561263153946B0fDEf798351",
  trxRetry: 60, // 1 minute
  userIdle: 900, // 15 mins in seconds
  SENTRY_DNS: "",
  SENTRY_RELEASE: "",
  SENTRY_ENVIRONMENT: "",

  production: false,
  environmentName: "development",
  featureVisible: true,
  application: true,
  theme: 'default',
  rpcUrl: 'https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/',
  chainId: 73799,
  cacheServerUrl: 'https://identitycache-dev.energyweb.org/v1',
  natsServerUrl: 'https://identityevents-dev.energyweb.org/',
  kmsServerUrl: undefined,
  stakingPoolFactoryAddress: '0xA6dB2E313b74f947aA27F2145F8AF5d46992E0A3',
  checkStakingVerification: true,
  showAzureLoginOption: false,
  isWalletConnectEnabled: false,
  patronRole: 'email.roles.verification.apps.energyweb.iam.ewc',
  claimManagerAddress: "0x5339adE9332A604A1c957B9bC1C6eee0Bcf7a031",

  networkName: "EnergyWeb Volta Chain",
  currencyName: "Volta Token",
  currencySymbol: "VT",
  blockExlorerUrl: "https://volta-explorer.energyweb.org",
};
