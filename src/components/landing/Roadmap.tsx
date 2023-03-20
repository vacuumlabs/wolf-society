import { Box, Container, Stack } from '@mui/material'
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

const Roadmap = () => {
  return (
    <Box sx={{ bgcolor: 'neutral.main' }}>
      <Container>
        <Stack
          sx={{ alignItems: 'center', my: { mobile: 10, desktopM: 20 } }}
          spacing={{ mobile: 5, desktopM: 10 }}
        >
          {MockedRoadmap.map((roadmapItem, index) => (
            <RoadmapCard
              {...roadmapItem}
              key={`${roadmapItem.quarter}-${roadmapItem.year}`}
              color={COLOR_ORDER[index % COLOR_ORDER.length]}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
export default Roadmap
