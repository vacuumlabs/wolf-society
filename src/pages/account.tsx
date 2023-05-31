import { getAccount, getWalletClient } from '@wagmi/core'
import ArtworksAndCollections from '@/components/account/ArtworksAndCollections'
import ContributionAndRewards from '@/components/account/ContributionAndRewards'
import { RefetchTokensContext } from '@/utils/context/refetchTokens'
import { NftPurchasedDialog } from '@/components/account/NftPurchasedDialog'
import {
  CollectionData,
  Content,
  ContentTypes,
  NFTData,
  TaskData,
  getCollections,
  getNfts,
  getTasks,
  getTranslations,
  useContentful,
} from '@/utils/hooks/useContentful'
import {
  StoredNftData,
  useGetStoredPurchasedNfts,
} from '@/utils/hooks/useGetStoredPurchasedNfts'
import { Stack } from '@mui/material'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { enqueueSnackbar } from 'notistack'

type Props = {
  translations: Partial<Content>
  collectionsData: CollectionData[] | null
  nftData: NFTData[] | null
  tasksData: TaskData[] | null
}

export const Account = ({ collectionsData, nftData, tasksData }: Props) => {
  const translate = useContentful(ContentTypes.accountPage)
  const translateCommon = useContentful(ContentTypes.common)
  const [dialogOpen, setDialogOpen] = useState(false)
  const storedNfts = useGetStoredPurchasedNfts(nftData)

  const postToApi = async ({ tokenAddress, tokenId }: StoredNftData) => {
    const { address } = getAccount()
    const data = {
      eth_address: address,
      token_address: tokenAddress,
      token_id: tokenId,
    }

    const walletClient = await getWalletClient()
    let signature: `0x${string}` | undefined
    try {
      signature = await walletClient?.signMessage({
        message: JSON.stringify(data),
      })
    } catch (err) {
      console.error(err)
    }
    if (!signature) return { message: translate('messageNotSignedError') }
    return fetch(`/api/user/nft-purchased`, {
      method: 'POST',
      body: JSON.stringify({
        data,
        signature,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const claimNftReward = async (stopSign: boolean) => {
    if (stopSign) {
      setDialogOpen(false)
      return
    }

    // Should never happen
    if (storedNfts == null || storedNfts.length < 0) {
      setDialogOpen(false)
      return
    }

    const response = await postToApi(storedNfts[0])
    const responseSuccess =
      response != null && 'status' in response && response.status === 200

    if (!responseSuccess) {
      const errorMessage =
        'message' in response
          ? (response.message as string)
          : translateCommon('genericErrorMessage')
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      })
      return
    }

    const successMessage = 'Extra reward claimed! 🚀'
    enqueueSnackbar(successMessage, {
      variant: 'success',
    })
    setDialogOpen(false)
  }

  useEffect(() => {
    setDialogOpen((storedNfts || []).some((it) => !it.stored))
  }, [storedNfts])

  const [gameTokens, setGameTokens] = useState<number | undefined>(undefined)
  const [refetch, setRefetch] = useState(0)
  const { address } = useAccount()

  useEffect(() => {
    const fetchBalance = async (address: string) => {
      const res = await fetch(`/api/user/${address}`)
      const { points } = await res.json()

      setGameTokens(points)
    }

    if (address == null) {
      return undefined
    }

    fetchBalance(address)
  }, [address, refetch])

  const refetchGameTokens = () => setRefetch(refetch + 1)

  return (
    <RefetchTokensContext.Provider value={refetchGameTokens}>
      <Stack mt={10}>
        <ContributionAndRewards {...{ gameTokens }} />
        <ArtworksAndCollections
          collectionsData={collectionsData}
          nftsData={nftData}
          tasksData={tasksData}
        />
      </Stack>
      <NftPurchasedDialog isOpen={dialogOpen} onClose={claimNftReward} />
    </RefetchTokensContext.Provider>
  )
}

export const getStaticProps: GetStaticProps<{}> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    // Will be passed to the page component as props
    props: {
      translations: {
        ...(await getTranslations(ContentTypes.collectionsPage, locale)),
        ...(await getTranslations(ContentTypes.nftDetail, locale)),
        ...(await getTranslations(ContentTypes.accountPage, locale)),
        ...(await getTranslations(ContentTypes.taskTexts, locale)),
      },
      collectionsData: await getCollections(locale),
      nftData: await getNfts(locale),
      tasksData: await getTasks(locale),
      locale,
    },
    revalidate: 60, // In seconds
  }
}

export default Account
