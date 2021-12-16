export interface MetamaskSettings {
    networkName: string;
    rpcUrl: string;
    currencyName: string;
    currencySymbol: string;
    blockExlorerUrl: string;
}

export const VoltaProviderSettings: MetamaskSettings  = {
  networkName: "EnergyWeb Volta Chain",
  rpcUrl: "https://volta-rpc.energyweb.org",
  currencyName: "Volta Token",
  currencySymbol: "VT",
  blockExlorerUrl: "https://volta-explorer.energyweb.org",
};

export const EnergyWebChainProviderSettings: MetamaskSettings = {
  networkName: "EWC",
  rpcUrl: "https://rpc.energyweb.org",
  currencyName: "EWT",
  currencySymbol: "EWT",
  blockExlorerUrl: "https://explorer.energyweb.org",
};
