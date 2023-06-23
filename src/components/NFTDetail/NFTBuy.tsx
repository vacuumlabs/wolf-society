import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  ButtonProps,
  BreakpointOverrides,
  Stack,
  Typography,
  Box,
  IconButton,
} from '@mui/material'
import { useAccount, useWalletClient } from 'wagmi'
import Button from '../Button'
import {
  MAGIC_WALLET_USER_REJECTED_ACTION_MESSAGE,
  lazyPayableClaimContractAddress,
  manifoldTxFee,
} from '@/consts'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { encodeFunctionData, parseEther } from 'viem'
import { NFTParameters } from './NFTParameters'
import { useSnackbar } from 'notistack'
import { NFTDataWithOwnership } from '@/utils/hooks/useGetNftDataWithOwnership'
import {
  SocialMedia,
  getNftShareableContent,
  socialMediaListData,
  shareContentOnSocialMedia,
} from '@/utils/sharing'
import { useGetEthPrice } from '@/utils/hooks/useGetEthPrice'
import { ERC721LazyPayableClaimAbi } from '@/abi/ERC721LazyPayableClaim'

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
        <Box key={lab}>{lab}</Box>
      ))}
    </Stack>
  </Button>
)

type NFTBuyComponentProps = {
  nftData: NFTDataWithOwnership
  buyInView: boolean
  className: string
}

export const NFTBuy = ({
  nftData,
  buyInView,
  className,
}: NFTBuyComponentProps) => {
  const translate = useContentful(ContentTypes.nftDetail)
  const translateCommon = useContentful(ContentTypes.common)
  const { priceInEth, manifoldLink, instanceId, tokenAddress } = nftData
  const ethToUsd = useGetEthPrice()
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const { openConnectModal } = useConnectModal()
  const { address, connector } = useAccount()
  const { data: walletClient, isLoading: isWalletClientLoading } =
    useWalletClient()
  const { enqueueSnackbar } = useSnackbar()
  const isUserWalletMagic = connector != null && connector.id === 'magic'

  const buyNft = async () => {
    if (
      !walletClient ||
      !address ||
      instanceId == null ||
      tokenAddress == null
    ) {
      if (openConnectModal != undefined) {
        openConnectModal()
      }
      return
    }
    const encodedData = encodeFunctionData({
      abi: ERC721LazyPayableClaimAbi,
      functionName: 'mint',
      args: [tokenAddress, BigInt(instanceId), 0, [], address],
    })

    try {
      await walletClient.sendTransaction({
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
      <NFTParameters nftData={nftData} alignCenter />
      <Stack
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        gap={{ mobile: 5, [breakpoint]: 10 }}
      >
        <Stack alignItems="center" justifyContent="center" gap={3}>
          <Typography variant="display">{`${priceInEth} ETH`}</Typography>
          <Typography variant="caption" color="neutral.700">{`${(
            priceInEth * ethToUsd
          ).toLocaleString('en-US', {
            maximumFractionDigits: 2,
          })} USD`}</Typography>
        </Stack>
        {nftData.owned && (
          <Stack gap={3} alignItems="center">
            <Typography variant="caption" color="neutral.700">
              {translate('shareYourImpact')}
            </Typography>
            <Stack direction="row">
              {Object.keys(socialMediaListData).map((key, index) => {
                return (
                  <IconButton
                    key={`social-media-${index}`}
                    onClick={() =>
                      shareContentOnSocialMedia(
                        getNftShareableContent(
                          translateCommon('nftShareText'),
                          nftData
                        ),
                        key as SocialMedia
                      )
                    }
                    sx={{
                      marginLeft: index > 0 ? '-1px' : 0,
                      marginRight:
                        index < Object.keys(socialMediaListData).length - 1
                          ? '-1px'
                          : 0,
                    }}
                  >
                    {socialMediaListData[key as SocialMedia]?.icon}
                  </IconButton>
                )
              })}
            </Stack>
          </Stack>
        )}
      </Stack>
      {!nftData.owned && !isUserWalletMagic && (
        <Stack
          direction="row"
          justifyContent="center"
          gap={2}
          width="100%"
          pt={{ mobile: 0, [breakpoint]: 5 }}
        >
          <>
            <CircleButton
              label={translate('buyWithCrypto')}
              href={manifoldLink}
              disabled={manifoldLink == null || isUserWalletMagic}
            />
          </>
        </Stack>
      )}
      {!nftData.owned && isUserWalletMagic && (
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={2}
          width="100%"
          pt={{ mobile: 0, [breakpoint]: 5 }}
        >
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
              disabled={manifoldLink == null}
            />
          </>
        </Stack>
      )}
    </Stack>
  )
}
