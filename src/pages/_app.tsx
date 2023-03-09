import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import React from 'react'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from '@/utils/configs/wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Navigation from '@/components/Navigation'

const App = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <title>Wolf Society</title>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <Navigation />
        <Component {...pageProps} />
      </ThemeProvider>
    </RainbowKitProvider>
  </WagmiConfig>
)

export default appWithTranslation(App, nextI18NextConfig)
