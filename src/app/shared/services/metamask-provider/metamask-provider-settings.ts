export interface MetamasSettings {
    networkName: string;
    rpcUrl: string;
    currencyName: string;
    currencySymbol: string;
    blockExlorerUrl: string;
}

export const VoltaProviderSettings: MetamasSettings  = {
  networkName: "EnergyWeb Volta Chain",
  rpcUrl: "https://volta-rpc.energyweb.org",
  currencyName: "Volta Token",
  currencySymbol: "VT",
  blockExlorerUrl: "https://volta-explorer.energyweb.org",
};

export const EnergyWebChainProviderSettings: MetamasSettings = {
  networkName: "EWC",
  rpcUrl: "https://rpc.energyweb.org",
  currencyName: "EWT",
  currencySymbol: "EWT",
  blockExlorerUrl: "http://explorer.energyweb.org",
};
