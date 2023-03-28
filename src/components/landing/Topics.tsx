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
import TopicCard, { TopicCardProps } from './TopicCard'
import ScrollingCard from '../ScrollingCard'

const MockedTopics: Omit<TopicCardProps, 'offsetLeft'>[] = [
  {
    title: 'THE WORLD’S GLACIERS campaign 2023',
    date: 'March 6, 2023',
    imageUrl: 'https://picsum.photos/id/235/400/300',
  },
  {
    title: 'HEALING IN THE PERUVIAN AMAZON',
    date: 'March 4, 2023',
    imageUrl: 'https://picsum.photos/id/232/400/300',
  },
  {
    title: 'UN Biodiversity campaign',
    date: 'February 27, 2023',
    imageUrl: 'https://picsum.photos/id/233/400/300',
  },
]

const Topics = () => {
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
          <Stack spacing={{ mobile: 5, [breakpoint]: -21 }} sx={{ mb: 10 }}>
            {MockedTopics.map((topic, index) => (
              <Stack width="100%" alignItems="center" key={topic.title}>
                <ScrollingCard index={index}>
                  <TopicCard {...topic} />
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
