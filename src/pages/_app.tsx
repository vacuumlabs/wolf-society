import type { AppProps } from 'next/app'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import React from 'react'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig, chains } from '@/utils/configs/wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Navigation from '@/components/Navigation'
import { Content, ContentContext } from '@/utils/hooks/useContentful'

import Footer from '@/components/Footer'
import { LocaleContext } from '@/utils/hooks/useLocale'
import 'public/style.scss'
import { SnackbarProvider } from 'notistack'
import Snackbar from '@/components/Snackbar'
import theme, { rainbowKitTheme } from '@/utils/context/theme'

type CustomPageProps = {
  locale: string
  translations: Content
}

const App = ({ Component, pageProps }: AppProps<CustomPageProps>) => (
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains} theme={rainbowKitTheme}>
      <title>Wolf Society</title>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ContentContext.Provider value={pageProps.translations}>
          <LocaleContext.Provider value={pageProps.locale}>
            <SnackbarProvider
              Components={{
                success: Snackbar,
                error: Snackbar,
                default: Snackbar,
                warning: Snackbar,
                info: Snackbar,
              }}
              TransitionProps={{ direction: 'up' }}
              autoHideDuration={5000}
              classes={{
                containerRoot: 'snackbarContainerRoot',
              }}
            >
              <Navigation />
              <Component {...pageProps} />
              <Footer />
            </SnackbarProvider>
          </LocaleContext.Provider>
        </ContentContext.Provider>
      </ThemeProvider>
    </RainbowKitProvider>
  </WagmiConfig>
)

export default App
