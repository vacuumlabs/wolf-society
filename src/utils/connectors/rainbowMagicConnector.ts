import { MagicConnectConnector } from '@everipedia/wagmi-magic-connector'
import { Connector, goerli, mainnet } from 'wagmi'

export const rainbowMagicConnector = ({ chains, appName }: any) => ({
  id: 'magic',
  name: 'Magic',
  iconUrl: 'https://svgshare.com/i/iJK.svg',
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
    }) as unknown as Connector<any, any, any>
    return {
      connector,
    }
  },
})
