import {
  ContentTypes,
  NFTData,
  useContentful,
} from '@/utils/hooks/useContentful'
import {
  Box,
  ButtonProps,
  BreakpointOverrides,
  Stack,
  Typography,
} from '@mui/material'
import { useAccount } from 'wagmi'
import Button from '../Button'
import {
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  PrepareWriteContractResult,
  prepareWriteContract,
  writeContract,
} from '@wagmi/core'
import {
  lazyPayableClaimContractAddress,
  manifoldTxFee,
  nftSmartContractAddress,
} from '@/consts'
import { LazyPayableClaimAbi } from '@/abi/LazyPayableClaim'
import { k } from 'abitype/dist/abi-78346466'
import { BigNumber } from 'alchemy-sdk'
import { useEffect, useState } from 'react'
import { parseEther } from 'ethers/lib/utils.js'

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
    {label}
  </Button>
)

const buyNft = async (
  config:
    | WriteContractUnpreparedArgs<k | readonly unknown[], string>
    | WriteContractPreparedArgs<k | readonly unknown[], string>
) => writeContract(config)

export interface NFTBuyProps {
  nft: NFTData
}

type NFTBuyComponentProps = NFTBuyProps & {
  buyInView: boolean
  className: string
}

export const NFTBuy = ({ nft, buyInView, className }: NFTBuyComponentProps) => {
  const translate = useContentful(ContentTypes.nftDetail)
  const { priceInEth, manifoldLink, instanceId } = nft
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const { address, connector } = useAccount()
  const isUserWalletMagic = connector != null && connector.id === 'magic'

  const [txError, setTxError] = useState<unknown | undefined>(undefined)
  const [mintConfig, setMintConfig] = useState<
    PrepareWriteContractResult<any, any, any> | undefined
  >(undefined)
  useEffect(() => {
    const prepareMintConfig = async () => {
      if (address == null) {
        setMintConfig(undefined)
        return
      }

      let config = undefined
      try {
        config = await prepareWriteContract({
          overrides: {
            value: BigNumber.from(manifoldTxFee).add(
              parseEther(priceInEth.toString())
            ),
          },
          address: lazyPayableClaimContractAddress,
          abi: LazyPayableClaimAbi,
          functionName: 'mint',
          args: [
            nftSmartContractAddress,
            BigNumber.from(instanceId),
            0,
            [],
            address,
          ],
        })
      } catch (error) {
        setTxError(error)
      }

      setMintConfig(config)
    }
    prepareMintConfig()
  }, [address, instanceId, mintConfig, priceInEth])

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
        justifyContent="space-between"
        gap={2}
        width="100%"
      >
        <CircleButton
          label={translate('buyWithCard')}
          disabled={!isUserWalletMagic}
          onClick={() =>
            mintConfig != null ? buyNft(mintConfig) : console.log(txError)
          }
        />
        <CircleButton
          label={translate('buyWithCrypto')}
          href={manifoldLink}
          disabled={isUserWalletMagic}
        />
      </Stack>
    </Stack>
  )
}
