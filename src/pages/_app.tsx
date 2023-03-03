import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Header } from '@/components/Header'
import React from 'react'

const App = ({ Component, pageProps }: AppProps) => {
  const { chains, provider } = configureChains([mainnet], [publicProvider()])

  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wolf-society',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    ],
    provider,
  })
  return (
    <WagmiConfig client={client}>
      <Header />
      <title>Wolf Society</title>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
