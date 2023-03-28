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
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/538f/89d8/4e5f5db6c2b8aaa5ab92994486180d74?Expires=1679875200&Signature=opMWv48D6XwLYk93-R6He8J2bD~W3P17PEJyGdSsGhLFeufKeKLjFEHH8EKlGx24gDbkd6AVb~4ooiAp24pfwpgaF6Ue-R5JQxrgCPfo~hHTB25252lV7UWs~vFMZxhynOgfcyq2ThUc9noOoUXI8sJooZC9BpPym9l5B-yOH~cjFzewVJzbZ7c14Dom2iofc7OeATVSL3CZi5Zxatw8p8pPKwdv3rXJqo1GbpqunHRAEWx2eiQHVK-Q8oCdZ2X6A-s1VRNBlA-vHbOiX4WnoVKLkWopWFmPnv7zSwGDN~bI~KJ9yMQpe5FL6QiWja6qF961bZ10qbRBo84ScqzN4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    name: 'HEALING IN THE PERUVIAN AMAZON',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/5cf6/a05d/d955938e3252e0fa6f73e9facbaa5e3d?Expires=1679875200&Signature=fSOj6eXnv0X6wUs2SdvS69cibuUhvVGfr-a1q9NLQsPu0x4QCHun1XQNbrjeLsnRV8YeHrJW2MS-o0wf-vQ4C81bEUiP~vFJOC4EG4c4Zcmz32OOEM4SNIqQS3F-5qkguDln~BUGBE1y8jI-sWcythFunKUak~WEWv9n5Wl9k0X3HB9qJpAQT1SZbGsMcWWORhKBZdumR7KLrJn5bCUXcHeB7ng3PXmyQXrzf6QQWoiyXiwBcQN9c69vhz9EQC3eVkeuFPAVNtH4U-7OF7f2nwL8T6TeEUM62trkofyOoLXkOsl4TWu2F1xC5jWokbHH1MSFuPBVDf8NbqgnHjZwoA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    name: 'UN Biodiversity campaign',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/d1c5/4cda/ddd7b489d95fb0e8cbbb8d6eac564437?Expires=1679875200&Signature=qZEH5u2EriIUqAPvI5t10CtX4NA6aBqxY3puy0njKqTtSouUne-BDk4NfHs95tSm1YA5A7QsH9UELgwF5hgtRX7emDZVuwU5QXyQqIa2bh4TOdLx4Sr4bHpycVYmFbrtK~~GA9oJqFfvSWoLQYAakDSAXZPdUT2dFmH1CWH-5PSGovGznPhNPurfNSlO-am40xvCAY0viRpnPg~igPgeH0DEhbkMd3ZXqeFDIo7Ly7M7RAAWPC0SqhwDADG~xAuvzqBpucPSSnN3fHJZeMW~X45f6BiWFX1Qxjwq-eS5FKc2uKTlMbIvMCsP80atQG-UCWDXEsPwSu3ouooDvMBzpg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    name: 'THE WORLD’S GLACIERS campaign 2024',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/538f/89d8/4e5f5db6c2b8aaa5ab92994486180d74?Expires=1679875200&Signature=opMWv48D6XwLYk93-R6He8J2bD~W3P17PEJyGdSsGhLFeufKeKLjFEHH8EKlGx24gDbkd6AVb~4ooiAp24pfwpgaF6Ue-R5JQxrgCPfo~hHTB25252lV7UWs~vFMZxhynOgfcyq2ThUc9noOoUXI8sJooZC9BpPym9l5B-yOH~cjFzewVJzbZ7c14Dom2iofc7OeATVSL3CZi5Zxatw8p8pPKwdv3rXJqo1GbpqunHRAEWx2eiQHVK-Q8oCdZ2X6A-s1VRNBlA-vHbOiX4WnoVKLkWopWFmPnv7zSwGDN~bI~KJ9yMQpe5FL6QiWja6qF961bZ10qbRBo84ScqzN4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    name: 'HEALING IN THE PERUVIAN AMAZONS',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/5cf6/a05d/d955938e3252e0fa6f73e9facbaa5e3d?Expires=1679875200&Signature=fSOj6eXnv0X6wUs2SdvS69cibuUhvVGfr-a1q9NLQsPu0x4QCHun1XQNbrjeLsnRV8YeHrJW2MS-o0wf-vQ4C81bEUiP~vFJOC4EG4c4Zcmz32OOEM4SNIqQS3F-5qkguDln~BUGBE1y8jI-sWcythFunKUak~WEWv9n5Wl9k0X3HB9qJpAQT1SZbGsMcWWORhKBZdumR7KLrJn5bCUXcHeB7ng3PXmyQXrzf6QQWoiyXiwBcQN9c69vhz9EQC3eVkeuFPAVNtH4U-7OF7f2nwL8T6TeEUM62trkofyOoLXkOsl4TWu2F1xC5jWokbHH1MSFuPBVDf8NbqgnHjZwoA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    name: 'UN Biodiversity campaigns',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/d1c5/4cda/ddd7b489d95fb0e8cbbb8d6eac564437?Expires=1679875200&Signature=qZEH5u2EriIUqAPvI5t10CtX4NA6aBqxY3puy0njKqTtSouUne-BDk4NfHs95tSm1YA5A7QsH9UELgwF5hgtRX7emDZVuwU5QXyQqIa2bh4TOdLx4Sr4bHpycVYmFbrtK~~GA9oJqFfvSWoLQYAakDSAXZPdUT2dFmH1CWH-5PSGovGznPhNPurfNSlO-am40xvCAY0viRpnPg~igPgeH0DEhbkMd3ZXqeFDIo7Ly7M7RAAWPC0SqhwDADG~xAuvzqBpucPSSnN3fHJZeMW~X45f6BiWFX1Qxjwq-eS5FKc2uKTlMbIvMCsP80atQG-UCWDXEsPwSu3ouooDvMBzpg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
      <Container sx={{ position: 'relative' }}>
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
          <Stack spacing={{ mobile: 5, [breakpoint]: -21 }} sx={{ mb: 10 }}>
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
