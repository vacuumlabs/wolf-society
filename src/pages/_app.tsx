import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'
import { ConnectWalletButton } from '@/components/wallet/ConnectWalletButton'
import React from 'react'
import { WagmiConfig } from 'wagmi'
import { client } from '../wagmiConfig'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={client}>
      <ConnectWalletButton />
      <title>Wolf Society</title>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
