import React from 'react'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { Content, useContentful } from '@/utils/hooks/useContentful'
import NextLink from 'next/link'
import { Box, Stack, Typography } from '@mui/material'
import { ContentTypes, getTranslations } from '@/utils/hooks/useContentful'
import PresaleGrid from '../components/presale/PresaleGrid'
import Button from '../components/Button'

type Props = {
  locale: string | undefined
  translations: Partial<Content>
}

const Presale = ({}: Props) => {
  const translate = useContentful(ContentTypes.presalePage)

  return (
    <Stack mt={10}>
      <Box sx={{ bgcolor: 'neutral.400' }}>
        <Typography variant="display" sx={{ textAlign: 'center', mt: 10 }}>
          {translate('title')}
        </Typography>
        <Stack sx={{ mt: 10, alignItems: 'center' }}>
          <NextLink href={'/presale'} passHref style={{ lineHeight: 0 }}>
            <Button>{'Buy NFT'}</Button>
          </NextLink>
        </Stack>
      </Box>
      <PresaleGrid />
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    // Will be passed to the page component as props
    props: {
      translations: await getTranslations(ContentTypes.presalePage, locale),
      locale,
    },
    revalidate: 60, // In seconds
  }
}

export default Presale
