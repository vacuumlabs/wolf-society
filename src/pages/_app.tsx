import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from '../wagmiConfig'
import '@rainbow-me/rainbowkit/styles.css'

const App = ({ Component, pageProps }: AppProps) => {
  console.log(process.env.NEXT_PUBLIC_ENABLE_TESTNETS)

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton />
        <title>Wolf Society</title>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
