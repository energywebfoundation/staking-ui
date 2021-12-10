const fs = require('fs');
const envConfig = 'dist/env.js';

fs.readFile(envConfig, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    const result = data
        .replace('cacheServerUrl = \'https://identitycache.energyweb.org/v1\'', 'cacheServerUrl = \'https://identitycache.energyweb.org/v1\'')
        .replace('natsServerUrl = \'https://identityevents.energyweb.org/\'', 'natsServerUrl = \'https://identityevents.energyweb.org/\'')
        .replace('kmsServerUrl = undefined', 'kmsServerUrl = \'https://kms.energyweb.org/connect/new\'')
        .replace('window.__env.claimManagerAddress = \'undefined\'', 'window.__env.claimManagerAddress = \'undefined\'');

    fs.writeFile(envConfig, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});
