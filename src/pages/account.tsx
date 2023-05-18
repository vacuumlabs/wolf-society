import ArtworksAndCollections from '@/components/account/ArtworksAndCollections'
import ContributionAndRewards from '@/components/account/ContributionAndRewards'
import {
  CollectionData,
  Content,
  ContentTypes,
  NFTData,
  getCollections,
  getNfts,
  getTranslations,
} from '@/utils/hooks/useContentful'
import { Stack } from '@mui/material'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'

type Props = {
  translations: Partial<Content>
  collectionsData: CollectionData[] | null
  nftData: NFTData[] | null
}

export const Account = ({ collectionsData, nftData }: Props) => {
  return (
    <Stack mt={10}>
      <ContributionAndRewards />
      <ArtworksAndCollections
        collectionsData={collectionsData}
        nftsData={nftData}
      />
    </Stack>
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
      },
      collectionsData: await getCollections(locale),
      nftData: await getNfts(locale),
      locale,
    },
    revalidate: 60, // In seconds
  }
}

export default Account
