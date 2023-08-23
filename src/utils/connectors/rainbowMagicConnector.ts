import { UniversalWalletConnector } from '@magiclabs/wagmi-connector'
import { strict as assert } from 'assert'
import { Chain, goerli, mainnet } from 'wagmi/chains'
import MagicLogo from 'public/images/magiclogo.svg'

type RainbowMagicConnectorParams = {
  chains: Chain[]
  appName: string
}

export const rainbowMagicConnector = ({
  chains,
  appName,
}: RainbowMagicConnectorParams) => {
  const magicApiKey = process.env.NEXT_PUBLIC_MAGIC_CONNECT_API_KEY
  assert(magicApiKey, 'NEXT_PUBLIC_MAGIC_CONNECT_API_KEY is not set')

  const { src: iconUrl } = MagicLogo as { src: string }

  const createConnector = () => {
    const connector = new UniversalWalletConnector({
      chains: chains,
      options: {
        apiKey: magicApiKey,
        magicSdkConfiguration: {
          network: {
            chainId:
              process.env.NEXT_PUBLIC_TESTNET === 'true'
                ? goerli.id
                : mainnet.id,
            rpcUrl:
              process.env.NEXT_PUBLIC_TESTNET === 'true'
                ? goerli.rpcUrls.default.http[0]
                : mainnet.rpcUrls.default.http[0],
          },
        },
      },
    })

    return { connector }
  }

  return {
    id: 'magic',
    name: 'Magic',
    iconUrl,
    iconBackground: '#fff',
    appName,
    createConnector,
  }
}
