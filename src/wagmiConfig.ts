import { configureChains, createClient, mainnet, goerli } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [goerli, sepolia]
      : []),
  ],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Wolf-society',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export { chains, wagmiClient }
