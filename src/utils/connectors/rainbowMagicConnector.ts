import { MagicConnectConnector } from '@everipedia/wagmi-magic-connector'
import { goerli, mainnet } from 'wagmi/chains'
import MagicLogo from 'public/images/magiclogo.svg'

export const rainbowMagicConnector = ({ chains, appName }: any) => ({
  id: 'magic',
  name: 'Magic',
  iconUrl: MagicLogo.src,
  iconBackground: '#fff',
  appName: appName,
  createConnector: () => {
    const connector = new MagicConnectConnector({
      chains: chains,
      options: {
        apiKey: process.env.NEXT_PUBLIC_MAGIC_CONNECT_API_KEY as string,
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
    return {
      connector,
    }
  },
})
