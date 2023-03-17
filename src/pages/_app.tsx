import type { AppProps } from 'next/app'
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import React from 'react'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from '@/utils/configs/wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Navigation from '@/components/Navigation'
import { TranslationsContext } from '@/utils/hooks/useTranslations'
import localFont from 'next/font/local'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false // removes default breakpoints
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true // adds our breakpoints
    tablet: true
    desktopS: true
    desktopM: true
    desktopL: true
  }
  interface Palette {
    dkGreen: Palette['primary']
  }
  interface PaletteOptions {
    dkGreen: PaletteOptions['primary']
  }
  interface CommonColors {
    dkGreen: string
  }
}

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/TestFoundersGrotesk-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TestFoundersGrotesk-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TestFoundersGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TestFoundersGrotesk-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TestFoundersGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TestFoundersGrotesk-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TestFoundersGrotesk-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TestFoundersGrotesk-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TestFoundersGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TestFoundersGrotesk-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
})

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      desktopS: 1280,
      desktopM: 1440,
      desktopL: 1920,
    },
  },
  typography: {
    fontFamily: myFont.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#DB372D',
    },
    secondary: {
      main: '#B0B2A3',
      light: '#F2F2E7',
    },
    dkGreen: {
      main: '#2B4B2A',
    },
    text: {
      primary: '#1E1E1E',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          paddingTop: 16,
          paddingBottom: 16,
          paddingRight: 32,
          paddingLeft: 32,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'desktopL',
      },
    },
  },
})

// Display
theme.typography.h1 = {
  ...theme.typography.h1,
  fontWeight: 600,
  fontSize: '70px',
  lineHeight: '64px',
  textTransform: 'uppercase',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '100px',
    lineHeight: '96px',
  },
  [theme.breakpoints.up('desktopL')]: {
    fontSize: '141px',
    lineHeight: '128px',
  },
}
// Headline
theme.typography.h2 = {
  ...theme.typography.h2,
  fontWeight: 600,
  fontSize: '25px',
  lineHeight: '24px',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '35px',
    lineHeight: '32px',
  },
  [theme.breakpoints.up('desktopL')]: {
    fontSize: '50px',
    lineHeight: '48px',
  },
}
// Title
theme.typography.h3 = {
  ...theme.typography.h3,
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '16px',
}
// Label
theme.typography.subtitle1 = {
  ...theme.typography.subtitle1,
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '32px',
}

// Body
theme.typography.body1 = {
  ...theme.typography.body1,
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '32px',
  [theme.breakpoints.up('desktopM')]: {
    // fontSize: '25px',
    // lineHeight: '40px',
    fontSize: '50px',
    lineHeight: '64px',
  },
  [theme.breakpoints.up('desktopL')]: {
    fontSize: '50px',
    lineHeight: '64px',
  },
}
// Button
theme.typography.button = {
  ...theme.typography.button,
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '24px',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '20px',
  },
}

const rainbowKitTheme = lightTheme({
  borderRadius: 'none',
  accentColor: theme.palette.primary.main,
})

const App = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} theme={rainbowKitTheme}>
      <title>Wolf Society</title>
      <ThemeProvider theme={theme}>
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
