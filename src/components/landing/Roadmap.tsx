import {
  ContentTypes,
  RoadmapData,
  useContentful,
} from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Theme, useMediaQuery } from '@mui/material'
import { HorizontalScrollText } from './HorizontalScrollText'
import RoadmapCard, { RoadmapCardProps } from './RoadmapCard'
import { RoadmapDsektop } from './RoadmapDesktop'

const MockedItem =
  'Launch of the second Wolf Society Collection NFTs lorem ipsum'

const MockedRoadmap: Omit<RoadmapCardProps, 'color'>[] = [
  {
    quarter: 'Q01',
    year: '2023',
    items: new Array(4).fill(MockedItem),
  },
  {
    quarter: 'Q02',
    year: '2023',
    items: new Array(4).fill(MockedItem),
  },
  {
    quarter: 'Q03',
    year: '2023',
    items: new Array(4).fill(MockedItem),
  },
  {
    quarter: 'Q04',
    year: '2023',
    items: new Array(4).fill(MockedItem),
  },
]

const COLOR_ORDER: string[] = [
  'secondary.main',
  'common.blue',
  'common.brown',
  'black.main',
]

type Props = {
  roadmapData: RoadmapData[] | null
}

const Roadmap = ({ roadmapData }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  if (!roadmapData) return null

  return (
    <Box sx={{ bgcolor: 'neutral.main', overflowX: 'hidden' }}>
      <Container>
        {isMobile ? (
          <Stack sx={{ alignItems: 'center', my: 10 }} spacing={5}>
            {roadmapData.map((roadmapItem, index) => (
              <RoadmapCard
                key={`${roadmapItem.quarter}-${roadmapItem.year}`}
                color={COLOR_ORDER[index % COLOR_ORDER.length]}
                quarter={roadmapItem.quarter}
                year={roadmapItem.year}
                items={roadmapItem.items.split('\n')}
              />
            ))}
          </Stack>
        ) : (
          <RoadmapDsektop
            roadmapData={roadmapData.map((data, idx) => ({
              color: COLOR_ORDER[idx % COLOR_ORDER.length],
              ...data,
            }))}
          />
        )}
      </Container>
    </Box>
  )
}
export default Roadmap
