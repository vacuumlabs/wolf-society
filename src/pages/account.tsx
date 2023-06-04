import ArtworksAndCollections from '@/components/account/ArtworksAndCollections'
import ContributionAndRewards from '@/components/account/ContributionAndRewards'
import { RefetchTokensContext } from '@/utils/context/refetchTokens'
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
} from '@/utils/hooks/useContentful'
import { Stack } from '@mui/material'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

type Props = {
  translations: Partial<Content>
  collectionsData: CollectionData[] | null
  nftData: NFTData[] | null
  tasksData: TaskData[] | null
}

export const Account = ({ collectionsData, nftData, tasksData }: Props) => {
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
