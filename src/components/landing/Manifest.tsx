import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography } from '@mui/material'
import MuiMarkdown from 'mui-markdown'
import AppearingComponent from '../AppearingComponent'

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
      <AppearingComponent>
        <Container>
          <Stack sx={{ gap: 4, my: { mobile: 10, desktopM: 20 } }}>
            <Typography
              variant="caption"
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
                <MuiMarkdown>{translate('manifestContent')}</MuiMarkdown>
              </Typography>
            </Box>
          </Stack>
        </Container>
      </AppearingComponent>
    </Box>
  )
}
export default Manifest
