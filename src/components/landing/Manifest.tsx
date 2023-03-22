import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography } from '@mui/material'

type Props = {
  manifestRef: React.RefObject<HTMLElement>
}

const Manifest = ({ manifestRef }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  return (
    <Box
      ref={manifestRef}
      sx={{ bgcolor: 'secondary.main', textAlign: 'center' }}
    >
      <Container>
        <Stack sx={{ gap: 4, my: { mobile: 10, desktopM: 20 } }}>
          <Typography
            variant="h3"
            color="neutral.main"
            sx={{ textAlign: 'center' }}
          >
            {translate('manifestTitle')}
          </Typography>
          <Box>
            <Typography
              sx={{ textAlign: 'center' }}
              color="neutral.main"
              display="inline"
            >
              {translate('manifestContent')}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
export default Manifest
