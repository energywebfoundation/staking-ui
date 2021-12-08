(function (window) {
    window.__env = window.__env || {};

    // Setting theme
    window.__env.theme = 'default';
    // Showing Application
    window.__env.application = true;
    // Show Staking
    window.__env.staking = true;

    window.__env.rpcUrl = 'https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/';
    window.__env.chainId = 73799;
    window.__env.cacheServerUrl = 'https://identitycache-dev.energyweb.org/v1';
    window.__env.natsServerUrl = 'https://identityevents-dev.energyweb.org/';
    window.__env.kmsServerUrl = undefined;
    window.__env.stakingPoolFactoryAddress = '0x66B1Db1E267c300fAE039597cE5463C345906a73';
    window.__env.showAzureLoginOption = true;

}(this));
