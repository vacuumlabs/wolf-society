import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Button, Container, Stack, Typography } from '@mui/material'

const MakeImpact = () => {
  const translate = useContentful(ContentTypes.landingPage)
  return (
    <Box sx={{ bgcolor: 'neutral.400', textAlign: 'center' }}>
      <Container>
        <Stack sx={{ gap: 4, my: { mobile: 10, desktopM: 20 } }}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            {translate('makeImpact')}
          </Typography>
          <Box>
            <Typography sx={{ textAlign: 'center' }} display="inline">
              {translate('makeImpactText')}
            </Typography>
          </Box>
          <Stack sx={{ alignItems: 'center' }}>
            <Button color="black" variant="outlined">
              {translate('readMore')}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
export default MakeImpact
