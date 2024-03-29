import { Injectable } from '@angular/core';
import {
  CacheClient,
  ChainConfig,
  ClaimsService,
  DidRegistry,
  DomainsService,
  initWithGnosis,
  initWithMetamask,
  initWithWalletConnect,
  MessagingMethod,
  MessagingService,
  ProviderType,
  setCacheConfig,
  setChainConfig,
  setMessagingConfig,
  SignerService,
  StakingFactoryService,
} from 'iam-client-lib';
import { safeAppSdk } from './gnosis.safe.service';
import { from } from 'rxjs';
import { LoginOptions } from './login/login.service';
import { truthy } from '@operators';
import { EnvService } from './env/env.service';

export const PROVIDER_TYPE = 'ProviderType';

@Injectable({
  providedIn: 'root',
})
export class IamService {
  signerService: SignerService;
  didRegistry: DidRegistry;
  claimsService: ClaimsService;
  messagingService: MessagingService;
  domainsService: DomainsService;
  stakingService: StakingFactoryService;
  cacheClient: CacheClient;

  constructor(private envService: EnvService) {
    // Set Cache Server
    setCacheConfig(envService.chainId, {
      url: envService.cacheServerUrl,
    });

    // Set RPC
    setChainConfig(envService.chainId, this.getChainConfig());

    // Set Messaging Options
    setMessagingConfig(envService.chainId, {
      messagingMethod: MessagingMethod.Nats,
      natsServerUrl: envService.natsServerUrl,
    });
  }

  get providerType() {
    return this.signerService.providerType;
  }

  get isEthSigner() {
    return this.signerService.isEthSigner;
  }

  closeConnection() {
    return from(this.signerService.closeConnection()).pipe(truthy());
  }

  async initializeConnection({
    providerType,
    initCacheServer = true,
    createDocument = true,
  }: LoginOptions) {
    try {
      const { signerService, messagingService, connectToCacheServer } =
        await this.initSignerService(providerType);
      this.signerService = signerService;
      this.messagingService = messagingService;
      if (initCacheServer) {
        const {
          domainsService,
          stakingPoolService,
          connectToDidRegistry,
          cacheClient,
        } = await connectToCacheServer();
        this.domainsService = domainsService;
        this.stakingService = stakingPoolService;
        this.cacheClient = cacheClient;
        if (createDocument) {
          const { didRegistry, claimsService } = await connectToDidRegistry();
          this.didRegistry = didRegistry;
          this.claimsService = claimsService;
        }
      }
    } catch (e) {
      console.error(e);
      return {
        did: undefined,
        connected: false,
        userClosedModal: e.message === 'User closed modal',
        realtimeExchangeConnected: false,
        accountInfo: undefined,
      };
    }
    return {
      did: this.signerService.did,
      connected: true,
      userClosedModal: false,
      realtimeExchangeConnected: true,
      accountInfo: this.signerService.accountInfo,
    };
  }

  getDidDocument(data?: { did: string; includeClaims: boolean }) {
    return from(this.didRegistry.getDidDocument(data));
  }

  getPublicKey() {
    return this.signerService.publicKey();
  }

  async getBalance() {
    return await this.signerService.balance();
  }

  private getChainConfig(): Partial<ChainConfig> {
    const chainConfig: Partial<ChainConfig> = {
      rpcUrl: this.envService.rpcUrl,
    };

    if (this.envService.claimManagerAddress) {
      chainConfig.claimManagerAddress = this.envService.claimManagerAddress;
    }

    if (this.envService.stakingPoolFactoryAddress) {
      chainConfig.stakingPoolFactoryAddress =
        this.envService.stakingPoolFactoryAddress;
    }
    return chainConfig;
  }

  private async initSignerService(providerType: ProviderType) {
    switch (providerType) {
      case ProviderType.MetaMask:
        return initWithMetamask();
      case ProviderType.WalletConnect:
        return initWithWalletConnect();
      case ProviderType.Gnosis:
        return initWithGnosis(safeAppSdk);
    }
  }
}
