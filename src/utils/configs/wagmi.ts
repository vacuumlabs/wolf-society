import { configureChains, createClient, mainnet, goerli } from 'wagmi'
import { sepolia } from 'wagmi/chains'
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

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    ...(process.env.NODE_ENV === 'development' ? [goerli, sepolia] : []),
  ],
  [publicProvider()]
)
const appName = 'Wolf-society'
const params = { appName, chains }
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet(params),
      rainbowWallet(params),
      walletConnectWallet(params),
      coinbaseWallet(params),
      rainbowMagicConnector(params),
      injectedWallet(params),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export { chains, wagmiClient }
