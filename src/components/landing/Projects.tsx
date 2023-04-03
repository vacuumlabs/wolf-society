import {
  Box,
  BreakpointOverrides,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import ProjectCard from './ProjectCard'
import WSFSymbol from '../icons/WSFSymbol'
import {
  useContentful,
  ContentTypes,
  Project,
} from '@/utils/hooks/useContentful'
import Button from '../Button'
import { ParallaxProvider } from 'react-scroll-parallax'
import ScrollingCard from '../ScrollingCard'
import AppearingComponent from '../AppearingComponent'

type Props = {
  projects: Project[]
}

const Projects = ({ projects }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletS'
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        textAlign: 'center',
      }}
    >
      <AppearingComponent>
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
              {projects.map((project, index) => (
                <Stack width="100%" alignItems="center" key={project.name}>
                  <ScrollingCard index={index}>
                    <ProjectCard
                      name={project.name}
                      imageUrl={project.image.fields.file.url}
                    />
                  </ScrollingCard>
                </Stack>
              ))}
            </Stack>
          </ParallaxProvider>
        </Container>
      </AppearingComponent>
    </Box>
  )
}
export default Projects
