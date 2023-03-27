import type { AppProps } from 'next/app'
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import React from 'react'
import { WagmiConfig } from 'wagmi'
import { wagmiClient, chains } from '@/utils/configs/wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Navigation from '@/components/Navigation'
import { ContentContext } from '@/utils/hooks/useContentful'
import localFont from 'next/font/local'
import Footer from '@/components/Footer'
import '../../public/style.css'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false // removes default breakpoints
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true // adds our breakpoints
    tabletS: true
    tabletM: true
    desktopS: true
    desktopM: true
    desktopL: true
  }
  interface Palette {
    neutral: Palette['primary']
    black: Palette['primary']
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary']
    black: PaletteOptions['primary']
  }
  interface CommonColors {
    blue: string
    brown: string
  }

  interface TypographyVariants {
    display: React.CSSProperties
    headline: React.CSSProperties
    title: React.CSSProperties
    caption: React.CSSProperties
    label: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    display?: React.CSSProperties
    headline?: React.CSSProperties
    title?: React.CSSProperties
    caption?: React.CSSProperties
    label?: React.CSSProperties
  }
}

// Update the AppBar's color prop options
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    neutral: true
    black: true
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true
    black: true
  }
}

// Update the SvgIcon's color prop options
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    neutral: true
    black: true
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true
    headline: true
    title: true
    caption: true
    label: true
    h1: false
    h2: false
    h3: false
    subtitle1: false
    subtitle2: false
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
      tabletS: 600,
      tabletM: 900,
      desktopS: 1240,
      desktopM: 1440,
      desktopL: 1920,
    },
  },
  typography: {
    h1: undefined,
    h2: undefined,
    h3: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
    fontFamily: myFont.style.fontFamily,
  },
  palette: {
    primary: {
      '50': '#FBEBEA',
      '100': '#F4C1BE',
      '200': '#EEA39E',
      '300': '#E77972',
      '400': '#E25F57',
      main: '#DB372D',
      '500': '#DB372D',
      '600': '#C73229',
      '700': '#9B2720',
      '800': '#781E19',
      '900': '#5C1713',
      contrastText: '#F2F2E7',
    },
    secondary: {
      '50': '#EAEDEA',
      '100': '#BDC7BD',
      '200': '#9DAC9D',
      '300': '#718670',
      '400': '#556F55',
      main: '#2B4B2A',
      '500': '#2B4B2A',
      '600': '#274426',
      '700': '#1F351E',
      '800': '#182917',
      '900': '#122012',
    },
    neutral: {
      '50': '#FBFBF8',
      '100': '#F9F9F4',
      '200': '#F6F6EF',
      '300': '#F5F5EC',
      '400': '#F2F2E7',
      '500': '#DCDCD2',
      main: '#B0B2A3',
      '600': '#B0B2A3',
      '700': '#666661',
      '800': '#4F4F4A',
      '900': '#353531',
    },
    success: {
      '50': '#E9FCEE',
      '100': '#D3F8DC',
      '200': '#A7F1B9',
      '300': '#7BEA96',
      '400': '#4FE373',
      main: '#23DC50',
      '500': '#23DC50',
      '600': '#1CB040',
      '700': '#158430',
      '800': '#0E5820',
      '900': '#072C10',
    },
    warning: {
      '50': '#FFFBE5',
      '100': '#FFF7CC',
      '200': '#FFEE99',
      '300': '#FFE666',
      '400': '#FFDD33',
      main: '#FFD500',
      '500': '#FFD500',
      '600': '#CCAA00',
      '700': '#998000',
      '800': '#665500',
      '900': '#332B00',
    },
    error: {
      '50': '#FFE5EA',
      '100': '#FFCCD5',
      '200': '#FF99AA',
      '300': '#FF6680',
      '400': '#FF3355',
      main: '#FF002B',
      '500': '#FF002B',
      '600': '#CC0022',
      '700': '#99001A',
      '800': '#660011',
      '900': '#330009',
    },
    black: {
      main: '#1E1E1E',
    },
    common: {
      blue: '#25506D',
      brown: '#553B32',
    },
    text: {
      primary: '#1E1E1E',
    },
  },
})

theme.components = {
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
        borderRadius: 0,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        padding: 0,
        [theme.breakpoints.only('mobile')]: {
          padding: '0 16px',
        },
        [theme.breakpoints.only('tabletS')]: {
          padding: '0 24px',
        },
        [theme.breakpoints.only('tabletM')]: {
          maxWidth: '840px',
        },
        [theme.breakpoints.only('desktopS')]: {
          maxWidth: '1024px',
        },
        [theme.breakpoints.only('desktopM')]: {
          maxWidth: '1280px',
        },
        [theme.breakpoints.only('desktopL')]: {
          maxWidth: '1680px',
        },
      },
    },
  },
  MuiGrid: {
    defaultProps: {
      columnSpacing: { mobile: 2, desktopS: 3, desktopM: 4, desktopL: 5 },
    },
  },
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        // Map the new variant to render a <h1> by default
        display: 'h1',
        headline: 'h2',
        title: 'h3',
        caption: 'h4',
        label: 'h5',
      },
    },
  },
}

theme.typography.display = {
  ...theme.typography.display,
  fontWeight: 600,
  fontSize: '50px',
  lineHeight: '48px',
  textTransform: 'uppercase',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '141px',
    lineHeight: '128px',
  },
  [theme.breakpoints.up('desktopL')]: {
    fontSize: '199px',
    lineHeight: '176px',
  },
}

theme.typography.headline = {
  ...theme.typography.headline,
  fontWeight: 600,
  fontSize: '35px',
  lineHeight: '32px',
  textTransform: 'uppercase',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '70px',
    lineHeight: '64px',
  },
  [theme.breakpoints.up('desktopL')]: {
    fontSize: '100px',
    lineHeight: '96px',
  },
}

theme.typography.title = {
  ...theme.typography.title,
  fontWeight: 600,
  fontSize: '25px',
  lineHeight: '24px',
  textTransform: 'uppercase',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '50px',
    lineHeight: '48px',
  },
  [theme.breakpoints.up('desktopL')]: {
    fontSize: '70px',
    lineHeight: '64px',
  },
}

theme.typography.caption = {
  ...theme.typography.caption,
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '20px',
  textTransform: 'uppercase',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '25px',
    lineHeight: '24px',
  },
  [theme.breakpoints.up('desktopL')]: {
    fontSize: '35px',
    lineHeight: '32px',
  },
}

theme.typography.label = {
  ...theme.typography.label,
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '32px',
}

theme.typography.body1 = {
  ...theme.typography.body1,
  fontWeight: 400,
  fontSize: '35px',
  lineHeight: '48px',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '50px',
    lineHeight: '64px',
  },
  [theme.breakpoints.up('desktopL')]: {
    fontSize: '70px',
    lineHeight: '88px',
  },
}

// Body2
theme.typography.body2 = {
  ...theme.typography.body2,
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '32px',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '25px',
    lineHeight: '32px',
  },
}
theme.typography.overline = {
  ...theme.typography.overline,
  fontWeight: 600,
  fontSize: '128px',
  lineHeight: '60px',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '380px',
    lineHeight: '196px',
  },
}

// Button
theme.typography.button = {
  ...theme.typography.button,
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '24px',
  textTransform: 'uppercase',
  [theme.breakpoints.up('desktopM')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
  [theme.breakpoints.up('desktopL')]: {
    fontSize: '25px',
    lineHeight: '32px',
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
        <ContentContext.Provider value={pageProps?.translations}>
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </ContentContext.Provider>
      </ThemeProvider>
    </RainbowKitProvider>
  </WagmiConfig>
)

export default App
