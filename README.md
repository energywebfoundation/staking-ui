# Staking Pool UI
[![Build Status](https://travis-ci.com/energywebfoundation/switchboard-dapp.svg?token=vNERWfuroqqJygVa7Km9&branch=develop)](https://travis-ci.com/energywebfoundation/switchboard-dapp)


##


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
npm version 6+
nodejs version 10+
```

### Installing

A step by step series of examples that tell you how to get a development env running

Install dependencies:
```
npm install
```

Run the project locally:
```
npm run start
```

Build the project for production:
```
npm run build
```

## Building
To build this project for production you need to run 
```angular2html
npm run build-prod
```
When project is builded then in `dist` folder you have file `env.js` which is configuration file.
In this file you can specify endpoints, custom configurations like theme etc.
`stakingPoolFactoryAddress` - is for handling staking pool address contract.

`showAzureLoginOption` - when true enables possibility to log in with Azure.

`rpcUrl` - rpc url that should connect to.

`chainId` - chain id that is used to connect to the blockchain

`cacheServerUrl` - cache server url

`natsServerUrl` - nats server url

`kmsServerUrl` - kms server url.

`checkStakingVerification` - when true enables staking pool role verification, if user contains role described in contract or not.
If not then it will display a popup with information what is next.

## Active Maintainers
- Dawid Gil (@dawidgil)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the GNU General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details

## FAQ

Frequently asked questions and their answers will be collected here.
