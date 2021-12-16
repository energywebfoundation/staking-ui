import { Injectable } from "@angular/core";
import { EnvService } from "../env/env.service";
import detectMetamask from "@metamask/detect-provider";
import {
  VoltaProviderSettings,
  EnergyWebChainProviderSettings,
  MetamasSettings,
} from "./metamask-provider-settings";

@Injectable({
  providedIn: "root",
})
export class MetamaskProviderService {

  constructor(private envService: EnvService) {}

  private getMetamaskConfiguration(): MetamasSettings {
    if (this.envService.chainId === 73799) {
      return EnergyWebChainProviderSettings;
    }
    return VoltaProviderSettings;
  }

  public async importMetamaskConf() {
    const metamaskSettings = this.getMetamaskConfiguration();
    try {
      const metamaskProvider: any = await detectMetamask({
        mustBeMetaMask: true,
      });

      if (!metamaskProvider) {
        throw new Error("MetaMask not detected");
      }

      await metamaskProvider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${this.envService.chainId.toString(16)}`, // Hexadecimal version of chain ID
            chainName: metamaskSettings.networkName,
            nativeCurrency: {
              name: metamaskSettings.currencyName,
              symbol: metamaskSettings.currencySymbol,
              decimals: 18,
            },
            rpcUrls: [metamaskSettings.rpcUrl],
            blockExplorerUrls: [metamaskSettings.blockExlorerUrl],
            iconUrls: [""],
          },
        ],
      });
      window.location.reload();
    } catch (addError) {
      console.log("Did not add network");
    }
  }
}
