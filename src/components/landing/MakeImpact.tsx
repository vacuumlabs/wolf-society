import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography } from '@mui/material'
import AppearingComponent from '../AppearingComponent'
import { HorizontalScrollText } from './HorizontalScrollText'
import TypographyWithTooltips from '../TypographyWithTooltips'

const MakeImpact = () => {
  const translate = useContentful(ContentTypes.landingPage)

  return (
    <Box
      sx={{ bgcolor: 'neutral.400', textAlign: 'center', overflowX: 'hidden' }}
    >
      <HorizontalScrollText
        text={translate('makeImpact')}
        numberOfItems={10}
        offsetStep={10}
        color={'secondary.500'}
      />
      <AppearingComponent>
        <Container>
          <Stack sx={{ gap: 4, my: { mobile: 10, desktopM: 20 } }}>
            <Typography variant="caption" sx={{ textAlign: 'center' }}>
              {translate('makeImpact')}
            </Typography>
            <Box>
              <TypographyWithTooltips
                sx={{ textAlign: 'center' }}
                display="inline"
                key={'makeImpactText'}
                text={translate('makeImpactText')}
              />
            </Box>
          </Stack>
        </Container>
      </AppearingComponent>
    </Box>
  )
}
export default MakeImpact
