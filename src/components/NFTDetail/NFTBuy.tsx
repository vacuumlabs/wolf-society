import {
  ContentTypes,
  NFTData,
  useContentful,
} from '@/utils/hooks/useContentful'
import {
  ButtonProps,
  BreakpointOverrides,
  Stack,
  Typography,
  Box,
} from '@mui/material'
import { useAccount, useWalletClient } from 'wagmi'
import Button from '../Button'
import {
  lazyPayableClaimContractAddress,
  manifoldTxFee,
  nftSmartContractAddress,
} from '@/consts'
import { LazyPayableClaimAbi } from '@/abi/LazyPayableClaim'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { encodeFunctionData, parseEther } from 'viem'

const CircleButton = ({
  label,
  onClick,
  ...props
}: { label: string } & ButtonProps) => (
  <Button
    sx={{
      width: '45%',
      height: 'auto !important',
      aspectRatio: '1/1',
      borderRadius: '50%',
      textAlign: 'center',
    }}
    target={'_blank'}
    onClick={onClick}
    {...props}
  >
    <Stack alignItems="center">
      {label.split('\\n').map((lab) => (
        <Box key={lab} width="max-content">
          {lab}
        </Box>
      ))}
    </Stack>
  </Button>
)

export type ButtonsMode = 'buy' | 'shareTwitter'
export interface NFTBuyProps {
  nft: NFTData
  buttonsMode: ButtonsMode
}

type NFTBuyComponentProps = NFTBuyProps & {
  buyInView: boolean
  className: string
}

export const NFTBuy = ({
  nft,
  buttonsMode,
  buyInView,
  className,
}: NFTBuyComponentProps) => {
  const translate = useContentful(ContentTypes.nftDetail)
  const { priceInEth, manifoldLink, instanceId } = nft
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const { openConnectModal } = useConnectModal()
  const { address, connector } = useAccount()
  const { data: walletClient, isLoading: isWalletClientLoading } =
    useWalletClient()
  const isUserWalletMagic = connector != null && connector.id === 'magic'

  const buyNft = async () => {
    if (!walletClient || !address) {
      if (openConnectModal != undefined) {
        openConnectModal()
      }
      return
    }
    const encodedData = encodeFunctionData({
      abi: LazyPayableClaimAbi,
      functionName: 'mint',
      args: [nftSmartContractAddress, BigInt(instanceId), 0, [], address],
    })

    const txResponse = await walletClient.sendTransaction({
      to: lazyPayableClaimContractAddress,
      data: encodedData,
      value: BigInt(manifoldTxFee) + parseEther(`${priceInEth}`),
    })
  }

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        height: { mobile: 'auto', [breakpoint]: '100vh' },
        width: { mobile: '100vw', [breakpoint]: 'max-content' },
        backgroundColor: 'neutral.400',
        paddingTop: { mobile: 5, [breakpoint]: 10 },
        paddingBottom: { mobile: 0, [breakpoint]: 10 },
        paddingX: { mobile: 2, [breakpoint]: 10 },
      }}
      gap={{ mobile: 5, [breakpoint]: '0' }}
      mb={{ mobile: buyInView ? 6 : 0 }}
      className={className}
    >
      <Stack alignItems="center" flexGrow={1} justifyContent="center">
        <Typography variant="display">{`${priceInEth} ETH`}</Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent={buttonsMode === 'buy' ? 'space-between' : 'center'}
        gap={2}
        width="100%"
      >
        {buttonsMode === 'buy' && (
          <>
            <CircleButton
              label={translate('buyWithCard')}
              disabled={!isUserWalletMagic && !isWalletClientLoading}
              onClick={() => buyNft()}
            />
            <CircleButton
              label={translate('buyWithCrypto')}
              href={manifoldLink}
              disabled={isUserWalletMagic}
            />
          </>
        )}
        {buttonsMode === 'shareTwitter' && (
          <CircleButton label={translate('shareOnTwitter')} />
        )}
      </Stack>
    </Stack>
  )
}
