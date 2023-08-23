import React from 'react'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import ArticleCard, { ArticleCardProps } from './ArticleCard'
import Button from '../Button'
import AppearingComponent from '../AppearingComponent'
import { MEDIUM_DOMAIN } from '@/consts'

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
              <Grid container>
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
                href={`${MEDIUM_DOMAIN}/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`}
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

export default Articles
