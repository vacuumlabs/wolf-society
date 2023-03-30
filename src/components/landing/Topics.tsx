import { SUBPAGES } from '@/consts'
import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import Button from '../Button'
import { ParallaxProvider } from 'react-scroll-parallax'
import WSFSymbol from '../icons/WSFSymbol'
import ScrollingCard from '../ScrollingCard'
import ArticleCard from '../blog/ArticleCard'
import { BlogData } from '@/utils/blog'

type Props = {
  posts: ArticleProps[]
}

const Topics = ({ posts }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletS'
  return (
    <Box sx={{ bgcolor: 'neutral.400', textAlign: 'center' }}>
      <Container>
        <ParallaxProvider>
          <Stack
            sx={{
              gap: 4,
              pt: { mobile: 15, desktopM: 20 },
              mb: 5,
              position: { mobile: 'static', desktopM: 'sticky' },
              top: 0,
              left: 0,
            }}
            alignItems="center"
          >
            <WSFSymbol color="black" />
            <Typography variant="display" sx={{ textAlign: 'center' }}>
              {translate('articles')}
            </Typography>
            <Stack sx={{ alignItems: 'center' }}>
              <Button variant="outlined" href={SUBPAGES['blog']}>
                {translate('allArticles')}
              </Button>
            </Stack>
          </Stack>
          <Stack spacing={{ mobile: 5, [breakpoint]: 0 }} sx={{ mb: 10 }}>
            {posts.map((post, index) => (
              <Stack width="100%" alignItems="center" key={post.title}>
                <ScrollingCard index={index}>
                  <ArticleCard {...post} />
                </ScrollingCard>
              </Stack>
            ))}
          </Stack>
        </ParallaxProvider>
      </Container>
    </Box>
  )
}
export default Topics
