const CONTRACT_NAME = process.env.CONTRACT_NAME || 'baunvb.testnet'; /* TODO: change this to your account */

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
        DEMO_CONTRACT_ID: 'baunvb.testnet',
        BONDING_CONTRACT_ID: 'baunvb.testnet',
        STAKING_CONTRACT_ID: 'baunvb.testnet'
      }
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        DEMO_CONTRACT_ID: 'baunvb.testnet',
        BONDING_CONTRACT_ID: 'baunvb.testnet',
        STAKING_CONTRACT_ID: 'xinca.testnet',
        PNX_TOKEN_ID: 'inca.inti01.testnet',
        X_PNX_TOKEN_ID: 'xinca.testnet'
      }
    case 'betanet':
      return {
        networkId: 'betanet',
        nodeUrl: 'https://rpc.betanet.near.org',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.betanet.near.org',
        helperUrl: 'https://helper.betanet.near.org',
        DEMO_CONTRACT_ID: 'baunvb.testnet',
        BONDING_CONTRACT_ID: 'baunvb.testnet',
        STAKING_CONTRACT_ID: 'baunvb.testnet'
      }
    case 'local':
      return {
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: 'http://localhost:4000/wallet',
        contractName: CONTRACT_NAME,
        DEMO_CONTRACT_ID: 'baunvb.testnet',
        BONDING_CONTRACT_ID: 'baunvb.testnet',
        STAKING_CONTRACT_ID: 'baunvb.testnet'
      }
    case 'test':
    case 'ci':
      return {
        networkId: 'shared-test',
        nodeUrl: 'https://rpc.ci-testnet.near.org',
        contractName: CONTRACT_NAME,
        masterAccount: 'test.near',
        DEMO_CONTRACT_ID: 'baunvb.testnet',
        BONDING_CONTRACT_ID: 'baunvb.testnet',
        STAKING_CONTRACT_ID: 'baunvb.testnet'
      }
    case 'ci-betanet':
      return {
        networkId: 'shared-test-staging',
        nodeUrl: 'https://rpc.ci-betanet.near.org',
        contractName: CONTRACT_NAME,
        masterAccount: 'test.near',
        DEMO_CONTRACT_ID: 'baunvb.testnet',
        BONDING_CONTRACT_ID: 'baunvb.testnet',
        STAKING_CONTRACT_ID: 'baunvb.testnet'
      }
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`)
  }
}
