import React from 'react'
import { GetStaticPropsContext } from 'next'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import {
  ContentTypes,
  injectCMSContent,
  useContentful,
} from '@/utils/hooks/useContentful'
import ArticleCard, { ArticleCardProps } from './ArticleCard'
import Button from '../Button'
import AppearingComponent from '../AppearingComponent'

type TBlog = {
  posts: ArticleCardProps[]
}

const Articles = ({ posts }: TBlog) => {
  const translate = useContentful(ContentTypes.articlesPage)
  return (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <AppearingComponent>
        <Container
          sx={{
            mt: { mobile: 5, desktopS: 10 },
            mb: { mobile: 10, desktopS: 20 },
          }}
        >
          <Stack spacing={5}>
            <Typography variant="title">{translate('articles')}</Typography>
            <Box>
              <Grid container rowGap={3}>
                {posts.map((post) => (
                  <Grid
                    item
                    key={post.title}
                    mobile={12}
                    tabletS={6}
                    desktopS={4}
                  >
                    <ArticleCard {...post} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Stack sx={{ alignItems: 'center' }}>
              <Button
                variant="outlined"
                href={`https://medium.com/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`}
                target="_blank"
              >
                {translate('exploreMore')}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </AppearingComponent>
    </Box>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`
  )

  const data = await response.json()

  return {
    props: {
      // Will be passed to the page component as props
      translations: await injectCMSContent(ContentTypes.landingPage, locale),
      posts: data.items ?? [],
      errorMessage: data.message ?? '',
    },
    revalidate: 60, // In seconds
  }
}

export default Articles
