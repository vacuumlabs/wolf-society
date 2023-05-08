import ArtworksAndCollections from '@/components/account/ArtworksAndCollections'
import ContributionAndRewards from '@/components/account/ContributionAndRewards'
import { ContentTypes, getTranslations } from '@/utils/hooks/useContentful'
import { Container, Stack } from '@mui/material'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'

export const Account = () => {
  return (
    <Stack mt={10}>
      <ContributionAndRewards />
      <ArtworksAndCollections />
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<{}> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    // Will be passed to the page component as props
    props: {
      translations: await getTranslations(ContentTypes.landingPage, locale),
      locale,
    },
    revalidate: 60, // In seconds
  }
}

export default Account
