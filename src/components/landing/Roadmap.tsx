import {
  ContentTypes,
  RoadmapData,
  useContentful,
} from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Container,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import RoadmapCard from './RoadmapCard'
import { RoadmapDesktop } from './RoadmapDesktop'
import { SECTIONS } from '@/consts'

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
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(breakpoint)
  )
  if (!roadmapData) return null

  return (
    <Box
      sx={{ bgcolor: 'neutral.main', overflowX: 'hidden' }}
      id={SECTIONS.about.roadmap.id}
      zIndex={10}
    >
      <Container>
        <Stack textAlign="center" my={{ mobile: 10, [breakpoint]: 20 }} gap={5}>
          <Typography variant="display" sx={{ fontWeight: 600 }}>
            {translate('roadmap')}
          </Typography>
          {isMobile ? (
            <Stack sx={{ alignItems: 'center' }} spacing={5}>
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
            <RoadmapDesktop
              roadmapData={roadmapData.map((data, idx) => ({
                color: COLOR_ORDER[idx % COLOR_ORDER.length],
                ...data,
              }))}
            />
          )}
        </Stack>
      </Container>
    </Box>
  )
}
export default Roadmap
