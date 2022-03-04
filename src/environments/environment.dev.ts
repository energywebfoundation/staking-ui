import { commonEnv } from "./environment.common";

const env: Partial<typeof commonEnv> = {
  production: false,
  environmentName: "development",
  featureVisible: true,
  application: true,
  theme: "default",
  rpcUrl: "https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/",
  chainId: 73799,
  cacheServerUrl: "https://identitycache-dev.energyweb.org/v1",
  natsServerUrl: "https://identityevents-dev.energyweb.org/",
  kmsServerUrl: undefined,
  stakingPoolFactoryAddress: "0xA6dB2E313b74f947aA27F2145F8AF5d46992E0A3",
  checkStakingVerification: true,
  showAzureLoginOption: false,
  isWalletConnectEnabled: false,
  patronRole: "email.roles.verification.apps.energyweb.iam.ewc",
  claimManagerAddress: "0xC3dD7ED75779b33F5Cfb709E0aB02b71fbFA3210",

  networkName: "EnergyWeb Volta Chain",
  currencyName: "Volta Token",
  currencySymbol: "VT",
  blockExlorerUrl: "https://volta-explorer.energyweb.org",
};

export const environment = {...commonEnv, ...env};

