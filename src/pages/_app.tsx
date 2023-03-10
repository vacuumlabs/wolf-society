import type { AppProps } from 'next/app'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import React from 'react'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from '@/utils/configs/wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Navigation from '@/components/Navigation'
import { TranslationsContext } from '@/utils/hooks/useTranslations'

const App = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <title>Wolf Society</title>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <TranslationsContext.Provider value={pageProps?.translations}>
          <Navigation />
          <Component {...pageProps} />
        </TranslationsContext.Provider>
      </ThemeProvider>
    </RainbowKitProvider>
  </WagmiConfig>
)

export default App
