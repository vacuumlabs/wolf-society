import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography } from '@mui/material'
import { HorizontalScrollText } from './HorizontalScrollText'

const MakeImpact = () => {
  const translate = useContentful(ContentTypes.landingPage)

  return (
    <Box
      sx={{ bgcolor: 'neutral.400', textAlign: 'center', overflow: 'hidden' }}
    >
      <HorizontalScrollText
        text={translate('makeImpact')}
        numberOfItems={10}
        offsetStep={10}
        color={'secondary.500'}
      />
      <Container>
        <Stack sx={{ gap: 4, my: { mobile: 10, desktopM: 20 } }}>
          <Typography variant="title" sx={{ textAlign: 'center' }}>
            {translate('makeImpact')}
          </Typography>
          <Box>
            <Typography sx={{ textAlign: 'center' }} display="inline">
              {translate('makeImpactText')}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
export default MakeImpact
