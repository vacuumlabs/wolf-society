import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import AppearingComponent from '../AppearingComponent'
import Button from '../Button'
import ArrowTurnTopIcon from '../icons/ArrowTurnTopIcon'
import { ArticleCardProps } from './ArticleCard'

type Props = {
  post?: ArticleCardProps
  image: string
}

const MAX_CATEGORIES = 2

const HeaderArticle = ({ post, image }: Props) => {
  const translate = useContentful(ContentTypes.articlesPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const lastName = post?.author.substring(post.author.lastIndexOf(' '))
  const firstName = post?.author.substring(0, post.author.lastIndexOf(' '))
  return !post ? (
    <></>
  ) : (
    <Stack>
      <Box sx={{ bgcolor: 'secondary.main' }}>
        <AppearingComponent>
          <Container>
            <Grid container>
              <Grid
                item
                mobile={12}
                display={{ mobile: 'block', [breakpoint]: 'none' }}
                pt={2}
              >
                <img
                  src={post.thumbnail}
                  alt="Header article image"
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover' }}
                />
              </Grid>
              <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
                <Stack
                  sx={{ gap: 5, pt: { mobile: 2, [breakpoint]: 10 } }}
                  height="100%"
                  justifyContent="space-between"
                >
                  <Typography variant="title" color="neutral.main">
                    {post.title}
                  </Typography>
                  <Stack gap={5}>
                    <Stack direction="row" justifyContent="space-between">
                      <Stack width="50%">
                        <Typography
                          variant="body2S"
                          color="neutral.main"
                          sx={{ fontSize: '20px', lineHeight: '32px' }}
                        >
                          {post.pubDate}
                        </Typography>
                        <Typography variant="body2S" color="neutral.main">
                          {post.categories.slice(0, MAX_CATEGORIES).join(', ')}
                        </Typography>
                      </Stack>
                      <Stack direction="row" gap={2} width="50%">
                        {image !== '' && (
                          <img
                            src={image}
                            width={56}
                            height={56}
                            alt="Author image"
                            style={{
                              borderRadius: '100px',
                              alignSelf: 'center',
                            }}
                          />
                        )}
                        <Stack justifyContent="center">
                          <Typography variant="body2S" color="neutral.main">
                            {firstName}
                          </Typography>
                          <Typography variant="body2S" color="neutral.main">
                            {lastName}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack alignItems="start">
                      <Button
                        href={post.link}
                        target="_blank"
                        endIcon={<ArrowTurnTopIcon />}
                      >
                        {translate('readMore')}
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                item
                mobile={12}
                {...{ [breakpoint]: 6 }}
                display={{ mobile: 'none', [breakpoint]: 'block' }}
              >
                <img
                  src={post.thumbnail}
                  alt="Header article image"
                  width="100%"
                  height="100%"
                  style={{
                    position: 'relative',
                    top: '80px',
                    objectFit: 'cover',
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </AppearingComponent>
      </Box>
      <Box sx={{ bgcolor: 'neutral.400' }}>
        <AppearingComponent>
          <Container>
            <Grid
              container
              pt={{ mobile: 2, [breakpoint]: 5 }}
              sx={{ rotate: '-0.52deg' }}
            >
              <Grid
                item
                mobile={6}
                display={{ mobile: 'none', [breakpoint]: 'block' }}
              >
                <Typography textAlign="end" variant="handwriting">
                  {translate('gratefulPart1')}
                </Typography>
              </Grid>
              <Grid
                item
                mobile={6}
                display={{ mobile: 'none', [breakpoint]: 'block' }}
              ></Grid>
              <Grid
                item
                mobile={5}
                display={{ mobile: 'none', [breakpoint]: 'block' }}
              ></Grid>
              <Grid
                item
                mobile={7}
                pt={1}
                display={{ mobile: 'none', [breakpoint]: 'block' }}
              >
                <Typography variant="handwriting">
                  {translate('gratefulPart2')}
                </Typography>
              </Grid>
              <Grid
                item
                mobile={12}
                display={{ mobile: 'block', [breakpoint]: 'none' }}
              >
                <Typography variant="handwriting">
                  {translate('gratefulPart1')} {translate('gratefulPart2')}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </AppearingComponent>
      </Box>
    </Stack>
  )
}

export default HeaderArticle
