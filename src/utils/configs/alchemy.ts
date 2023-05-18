import { Alchemy, Network } from 'alchemy-sdk'

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network:
    process.env.NEXT_PUBLIC_TESTNET === 'true'
      ? Network.ETH_GOERLI
      : Network.ETH_MAINNET,
}

export const alchemy = new Alchemy(settings)
