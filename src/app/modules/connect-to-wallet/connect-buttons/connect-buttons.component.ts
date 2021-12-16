import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProviderType } from 'iam-client-lib';
import detectMetamask from "@metamask/detect-provider";
import { EnvService } from '../../../shared/services/env/env.service';

@Component({
  selector: 'app-connect-buttons',
  templateUrl: './connect-buttons.component.html',
  styleUrls: ['./connect-buttons.component.scss']
})
export class ConnectButtonsComponent {
  @Input() metamaskPresent: boolean;
  @Input() metamaskDisabled: boolean;
  @Input() showEkcOption: boolean;
  @Input() isWalletConnectEnabled: boolean;

  @Output() connectTo = new EventEmitter<ProviderType>();

  constructor(
    private envService: EnvService) {
  }

  connectToWalletConnect() {
    this.connectTo.emit(ProviderType.WalletConnect);
  }

  connectToMetamask() {
    this.connectTo.emit(ProviderType.MetaMask);
  }

  connectToEKC() {
    this.connectTo.emit(ProviderType.EKC);
  }

  async importMetamaskConf() {
    try {
      const metamaskProvider: any = await detectMetamask({
        mustBeMetaMask: true,
      });

      if (!metamaskProvider) {
          throw new Error("MetaMask not detected");
      }

      await metamaskProvider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${this.envService.chainId.toString(16)}`, // Hexadecimal version of chain ID
          chainName: "EnergyWeb Volta Chain",
          nativeCurrency: {
            name: "Volta Token",
            symbol: "VT",
            decimals: 18,
          },
          rpcUrls: ["https://volta-rpc.energyweb.org"],
          blockExplorerUrls: ["https://volta-explorer.energyweb.org"],
          iconUrls: [""],
        }],
      });
      window.location.reload();
    } catch (addError) {
      console.log('Did not add network');
    }
  }

}
