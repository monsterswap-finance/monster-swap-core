const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()

const BSC_SCANAPI_KEY = process.env.BSCSCAN_API_KEY
const BSC_DEPLOYER_KEY = process.env.BSC_DEPLOYER_KEY
const BSC_TESTNET_DEPLOYER_KEY = process.env.BSC_TESTNET_DEPLOYER_KEY
const BSC_TESTNET_DEPLOYER_ACC = process.env.BSC_TESTNET_DEPLOYER_ACCOUNT
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 8545, // Standard BSC port (default: none)
      network_id: '*' // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider(BSC_TESTNET_DEPLOYER_KEY, `https://data-seed-prebsc-1-s2.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: BSC_TESTNET_DEPLOYER_ACC
    },
    bsc: {
      provider: () => {
        return new HDWalletProvider(BSC_DEPLOYER_KEY, `https://bsc-dataseed1.binance.org`)
      },
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    // Add BSCSCAN_API_KEY in .env file to verify contracts deployed through truffle
    bscscan: BSC_SCANAPI_KEY
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      //https://forum.openzeppelin.com/t/how-to-deploy-uniswapv2-on-ganache/3885
      version: '0.5.16', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 999999
        },
        evmVersion: 'istanbul',
        outputSelection: {
          '*': {
            '': ['ast'],
            '*': [
              'evm.bytecode.object',
              'evm.deployedBytecode.object',
              'abi',
              'evm.bytecode.sourceMap',
              'evm.deployedBytecode.sourceMap',
              'metadata'
            ]
          }
        }
      }
    }
  }
}
