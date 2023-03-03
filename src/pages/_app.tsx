import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <title>Wolf Society</title>
    <Component {...pageProps} />
  </>
)

export default appWithTranslation(App)
