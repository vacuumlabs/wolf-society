import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import Button from './Button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { SUBPAGES } from '@/consts'
import { useRouter } from 'next/router'
import { formatAddress } from '@/utils/helpers'

export const LaunchAppButton = () => {
  const router = useRouter()
  const translateNavbar = useContentful(ContentTypes.common)
  useAccount({
    onConnect({ isReconnected }) {
      if (SUBPAGES.account && !isReconnected) {
        router.push(SUBPAGES.account)
      }
    },
  })

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <Button
            variant="outlined"
            style={{ height: '48px', padding: '12px 24px' }}
            sx={(theme) => ({
              // Button S for M breakpoint
              [theme.breakpoints.down('desktopL')]: {
                fontSize: '16px',
                lineHeight: '24px',
              },
              // Button M for L breakpoint
              [theme.breakpoints.up('desktopL')]: {
                fontSize: '20px',
                lineHeight: '24px',
              },
            })}
            onClick={connected ? openAccountModal : openConnectModal}
          >
            {connected
              ? formatAddress(account.address)
              : translateNavbar('connectWallet')}
          </Button>
        )
      }}
    </ConnectButton.Custom>
  )
}
