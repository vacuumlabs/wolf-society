import { Stack, Container, Box } from '@mui/material'
import RewardCard from './RewardCard'
import { alchemy } from '@/utils/configs/alchemy'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { AssetTransfersCategory, BigNumber } from 'alchemy-sdk'
import { ethers } from 'ethers'
import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  lazyPayableClaimContractAddress,
  manifoldTxFee,
  nullAddress,
} from '@/consts'
import AppearingComponent from '../AppearingComponent'

type ContributionAndRewardsProps = {
  gameTokens: number | undefined
}

export const ContributionAndRewards = ({
  gameTokens,
}: ContributionAndRewardsProps) => {
  const translate = useContentful(ContentTypes.accountPage)
  const { address } = useAccount()
  const [userContribution, setUserContribution] = useState<string | null>(null)
  useEffect(() => {
    const getUserContribution = async () => {
      const allPaymentTransactionsToMintingContract = (
        await alchemy.core.getAssetTransfers({
          fromAddress: address,
          toAddress: lazyPayableClaimContractAddress,
          category: [AssetTransfersCategory.EXTERNAL],
        })
      ).transfers

      const mintingTransactionsToUser = (
        await alchemy.core.getAssetTransfers({
          fromAddress: nullAddress,
          toAddress: address,
          category: [AssetTransfersCategory.ERC721],
        })
      ).transfers

      const successfulPaymentTransactionsToMintingContract =
        allPaymentTransactionsToMintingContract.filter((tx) =>
          mintingTransactionsToUser.some((tx2) => tx.hash === tx2.hash)
        )

      const valueBN = successfulPaymentTransactionsToMintingContract.reduce(
        (prev, curr) =>
          prev.add(
            curr.value !== null
              ? ethers.utils
                  .parseEther(curr.value.toString())
                  .sub(manifoldTxFee)
              : BigNumber.from(0)
          ),
        BigNumber.from(0)
      )

      // Format the BN value into string with up to 5 decimal places, stripping unnecessary zeroes from the end
      const valueFormatted = parseFloat(
        Number(ethers.utils.formatEther(valueBN)).toFixed(5)
      ).toString()

      setUserContribution(valueFormatted)
    }
    if (address) {
      getUserContribution()
    }
  }, [address])

  const mockCardData = [
    {
      title: translate('yourContribution'),
      amount: userContribution,
      isEthAmount: true,
      buttonText: translate('distribute'),
      buttonAction: () => null,
      isDisabled: true,
    },
    {
      title: translate('yourRewards'),
      amount: '0',
      isEthAmount: true,
      buttonText: translate('claimRewards'),
      buttonAction: () => null,
      isDisabled: false,
    },
    {
      title: translate('gameTokens'),
      amount: `${gameTokens ?? '...'}`,
      isEthAmount: false,
      buttonText: translate('playGame'),
      buttonAction: () => null,
      isDisabled: true,
    },
  ]

  const cardStack = (
    <Stack
      direction={'row'}
      width={'100%'}
      sx={{
        background: 'inherit',
      }}
    >
      {mockCardData.map((cardData, idx) => {
        return <RewardCard key={`reward-card-${idx}`} {...cardData} />
      })}
    </Stack>
  )
  return (
    <Box
      sx={{
        backgroundColor: 'neutral.400',
      }}
    >
      <AppearingComponent>
        <Stack
          pt={5}
          sx={{
            alignItems: { mobile: 'inherit', desktopS: 'center' },
          }}
        >
          <Container sx={{ display: { mobile: 'none', desktopS: 'inherit' } }}>
            {cardStack}
          </Container>
          <Stack
            sx={{
              display: { mobile: 'inherit', desktopS: 'none' },
              overflowX: 'auto',
            }}
          >
            {cardStack}
          </Stack>
        </Stack>
      </AppearingComponent>
    </Box>
  )
}

export default ContributionAndRewards
