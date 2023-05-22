import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
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
  MAGIC_WALLET_USER_REJECTED_ACTION_MESSAGE,
  lazyPayableClaimContractAddress,
  manifoldTxFee,
  nftSmartContractAddress,
} from '@/consts'
import { LazyPayableClaimAbi } from '@/abi/LazyPayableClaim'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { encodeFunctionData, parseEther } from 'viem'
import { NFTParameters } from './NFTParameters'
import { useSnackbar } from 'notistack'
import { NFTDataExtended } from '@/utils/hooks/useGetNftDataExtended'

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

type NFTBuyComponentProps = {
  nftData: NFTDataExtended
  buyInView: boolean
  className: string
}

export const NFTBuy = ({
  nftData,
  buyInView,
  className,
}: NFTBuyComponentProps) => {
  const translate = useContentful(ContentTypes.nftDetail)
  const { priceInEth, manifoldLink, instanceId } = nftData
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const { openConnectModal } = useConnectModal()
  const { address, connector } = useAccount()
  const { data: walletClient, isLoading: isWalletClientLoading } =
    useWalletClient()
  const { enqueueSnackbar } = useSnackbar()
  const isUserWalletMagic = connector != null && connector.id === 'magic'

  const buyNft = async () => {
    if (!walletClient || !address || instanceId == null) {
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

    try {
      const txResponse = await walletClient.sendTransaction({
        to: lazyPayableClaimContractAddress,
        data: encodedData,
        value: BigInt(manifoldTxFee) + parseEther(`${priceInEth}`),
      })
    } catch (err: any) {
      if (
        err.cause?.cause?.rawMessage ===
        MAGIC_WALLET_USER_REJECTED_ACTION_MESSAGE
      ) {
        return
      } else {
        enqueueSnackbar(err.message, { variant: 'error' })
        console.error(err)
      }
    }
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
        overflowY: 'auto',
      }}
      gap={{ mobile: 5, [breakpoint]: '0' }}
      mb={{ mobile: buyInView ? 6 : 0 }}
      className={className}
    >
      <Stack
        alignItems="center"
        flexGrow={1}
        gap={{ mobile: 5, [breakpoint]: 10 }}
        pb={{ mobile: 0, [breakpoint]: 5 }}
      >
        <NFTParameters nftData={nftData} alignCenter />
        <Typography variant="display">{`${priceInEth} ETH`}</Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent={!nftData.owned ? 'space-between' : 'center'}
        gap={2}
        width="100%"
      >
        {!nftData.owned ? (
          <>
            <CircleButton
              label={translate('buyWithCard')}
              disabled={
                !isUserWalletMagic ||
                isWalletClientLoading ||
                instanceId == null
              }
              onClick={() => buyNft()}
            />
            <CircleButton
              label={translate('buyWithCrypto')}
              href={manifoldLink}
              disabled={manifoldLink == null || isUserWalletMagic}
            />
          </>
        ) : (
          <CircleButton label={translate('shareOnTwitter')} />
        )}
      </Stack>
    </Stack>
  )
}
