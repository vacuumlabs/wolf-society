import {
  ContentTypes,
  RoadmapData,
  useContentful,
} from '@/utils/hooks/useContentful'
import { Box, Container, Stack } from '@mui/material'
import { HorizontalScrollText } from './HorizontalScrollText'
import RoadmapCard, { RoadmapCardProps } from './RoadmapCard'

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
  return !roadmapData ? (
    <></>
  ) : (
    <Box sx={{ bgcolor: 'neutral.main', overflowX: 'hidden' }}>
      <HorizontalScrollText
        text={translate('roadmap')}
        numberOfItems={10}
        offsetStep={10}
        color="neutral.400"
      />
      <Container>
        <Stack
          sx={{ alignItems: 'center', my: { mobile: 10, desktopM: 20 } }}
          spacing={{ mobile: 5, desktopM: 10 }}
        >
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
      </Container>
    </Box>
  )
}
export default Roadmap
