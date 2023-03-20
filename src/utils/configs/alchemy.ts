import { Alchemy, Network } from 'alchemy-sdk'

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network:
    process.env.NODE_ENV === 'development'
      ? Network.ETH_GOERLI
      : Network.ETH_MAINNET,
}

export const alchemy = new Alchemy(settings)
