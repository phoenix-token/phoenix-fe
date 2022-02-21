const CONTRACT_NAME = process.env.CONTRACT_NAME || 'token.testnet'; /* TODO: change this to your account */

export default function getConfig (env?: string) {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        DEMO_CONTRACT_ID: 'token.testnet',
        BONDING_CONTRACT_ID: 'token.testnet',
        STAKING_CONTRACT_ID: 'token.testnet'
      }
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        DEMO_CONTRACT_ID: 'token.testnet',
        BONDING_CONTRACT_ID: 'bond.zus.testnet',
        STAKING_CONTRACT_ID: 'xpnx.testnet',
        PNX_TOKEN_ID: 'pnx.zus.testnet',
        X_PNX_TOKEN_ID: 'xpnx.testnet',
        USDT_TOKEN_ID: 'usdt_test.zus.testnet'
      }
    case 'betanet':
      return {
        networkId: 'betanet',
        nodeUrl: 'https://rpc.betanet.near.org',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.betanet.near.org',
        helperUrl: 'https://helper.betanet.near.org',
        DEMO_CONTRACT_ID: 'token.testnet',
        BONDING_CONTRACT_ID: 'token.testnet',
        STAKING_CONTRACT_ID: 'token.testnet'
      }
    case 'local':
      return {
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: 'http://localhost:4000/wallet',
        contractName: CONTRACT_NAME,
        DEMO_CONTRACT_ID: 'token.testnet',
        BONDING_CONTRACT_ID: 'token.testnet',
        STAKING_CONTRACT_ID: 'token.testnet'
      }
    case 'test':
    case 'ci':
      return {
        networkId: 'shared-test',
        nodeUrl: 'https://rpc.ci-testnet.near.org',
        contractName: CONTRACT_NAME,
        masterAccount: 'test.near',
        DEMO_CONTRACT_ID: 'token.testnet',
        BONDING_CONTRACT_ID: 'token.testnet',
        STAKING_CONTRACT_ID: 'token.testnet'
      }
    case 'ci-betanet':
      return {
        networkId: 'shared-test-staging',
        nodeUrl: 'https://rpc.ci-betanet.near.org',
        contractName: CONTRACT_NAME,
        masterAccount: 'test.near',
        DEMO_CONTRACT_ID: 'token.testnet',
        BONDING_CONTRACT_ID: 'token.testnet',
        STAKING_CONTRACT_ID: 'token.testnet'
      }
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`)
  }
}
