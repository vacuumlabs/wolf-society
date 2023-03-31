import {
  Box,
  BreakpointOverrides,
  Container,
  Grid,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import ProjectCard, { ProjectCardProps } from './ProjectCard'
import WSFSymbol from '../icons/WSFSymbol'
import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import Button from '../Button'
import { ParallaxProvider } from 'react-scroll-parallax'
import ScrollingCard from '../ScrollingCard'

const MockedProjects: Omit<ProjectCardProps, 'offsetLeft'>[] = [
  {
    name: 'THE WORLD’S GLACIERS campaign 2023',
    imageUrl: 'https://picsum.photos/id/11/400/300',
  },
  {
    name: 'HEALING IN THE PERUVIAN AMAZON',
    imageUrl: 'https://picsum.photos/id/12/400/300',
  },
  {
    name: 'UN Biodiversity campaign',
    imageUrl: 'https://picsum.photos/id/13/400/300',
  },
  {
    name: 'THE WORLD’S GLACIERS campaign 2024',
    imageUrl: 'https://picsum.photos/id/14/400/300',
  },
  {
    name: 'HEALING IN THE PERUVIAN AMAZONS',
    imageUrl: 'https://picsum.photos/id/15/400/300',
  },
  {
    name: 'UN Biodiversity campaigns',
    imageUrl: 'https://picsum.photos/id/16/400/300',
  },
]

const Projects = () => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletS'
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        textAlign: 'center',
      }}
    >
      <Container
        sx={{ position: 'relative', mb: { mobile: 10, [breakpoint]: 20 } }}
      >
        <ParallaxProvider>
          <Stack
            sx={{
              gap: 4,
              pt: { mobile: 15, desktopM: 20 },
              position: { mobile: 'static', desktopM: 'sticky' },
              top: 0,
              left: 0,
            }}
            alignItems="center"
          >
            <WSFSymbol color="neutral" />
            <Typography
              variant="display"
              color="neutral.main"
              sx={{ textAlign: 'center' }}
            >
              {translate('supportedProjects')}
            </Typography>
            <Stack sx={{ alignItems: 'center', display: 'none' }}>
              <Button color="neutral" variant="outlined">
                {translate('allProjects')}
              </Button>
            </Stack>
          </Stack>
          <Stack spacing={{ mobile: 5, [breakpoint]: 0 }}>
            {MockedProjects.map((project, index) => (
              <Stack width="100%" alignItems="center" key={project.name}>
                <ScrollingCard index={index}>
                  <ProjectCard {...project} />
                </ScrollingCard>
              </Stack>
            ))}
          </Stack>
        </ParallaxProvider>
      </Container>
    </Box>
  )
}
export default Projects
