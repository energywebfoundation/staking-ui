const fs = require('fs');
const envConfig = 'dist/env.js';

fs.readFile(envConfig, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    const result = data
        .replace('rpcUrl = \'https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/\'', 'rpcUrl = \'https://rpc.energyweb.org/\'')
        .replace('chainId = 73799', 'chainId = 246')
        .replace('cacheServerUrl = \'https://identitycache-dev.energyweb.org/v1\'', 'cacheServerUrl = \'https://identitycache.energyweb.org/v1\'')
        .replace('natsServerUrl = \'https://identityevents-dev.energyweb.org/\'', 'natsServerUrl = \'https://identityevents.energyweb.org/\'')
        .replace('kmsServerUrl = undefined', 'kmsServerUrl = \'https://kms.energyweb.org/connect/new\'')
        .replace('stakingPoolFactoryAddress = \'0xE0489B6128954C92b1d878596Df97D5b2acA378D\'', 'stakingPoolFactoryAddress = \'0xD8DD92999572D1Dd3F3E215d3768430ce557F260\'')
        .replace('patronRole = \'email.roles.verification.apps.energyweb.iam.ewc\'', 'patronRole = \'email.roles.verification.apps.energyweb.auth.ewc\'')
        .replace('window.__env.claimManagerAddress = \'0xC3dD7ED75779b33F5Cfb709E0aB02b71fbFA3210\'', 'window.__env.claimManagerAddress = \'0x23b026631A6f265d17CFee8aa6ced1B244f3920C\'');

    fs.writeFile(envConfig, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});
