import { configureChains, createConfig, mainnet } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { publicProvider } from 'wagmi/providers/public'
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { rainbowMagicConnector } from '../connectors/rainbowMagicConnector'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, ...(process.env.NEXT_PUBLIC_TESTNET === 'true' ? [goerli] : [])],
  [publicProvider()]
)
const appName = 'Wolf-society'
const params = { appName, chains }
const connectors = connectorsForWallets([
  {
    groupName: 'Log in with Social Media',
    wallets: [rainbowMagicConnector(params)],
  },
  {
    groupName: 'Web3',
    wallets: [
      metaMaskWallet(params),
      rainbowWallet(params),
      walletConnectWallet({
        ...params,
        projectId: '711f14d39871ec176fc9f9303307994b',
      }),
      coinbaseWallet(params),
      injectedWallet(params),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains, wagmiConfig }
