import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography } from '@mui/material'
import AppearingComponent from '../AppearingComponent'
import { HorizontalScrollText } from './HorizontalScrollText'
import TypographyWithTooltips from '../TypographyWithTooltips'
import ScrollingVideo from '../ScrollingVideo'
import PollutionText from 'public/images/Pollution-text-en-US.png'

const MakeImpact = () => {
  const translate = useContentful(ContentTypes.landingPage)

  return (
    <Box
      sx={{ bgcolor: 'neutral.400', textAlign: 'center', overflowX: 'hidden' }}
    >
      <Box>
        <ScrollingVideo
          textImage={PollutionText}
          id="Deforestation"
          topColor="secondary.main"
          bottomColor="neutral.400"
        />
      </Box>
      <AppearingComponent>
        <Container>
          <Stack
            sx={{ gap: 4, my: { mobile: 10, desktopM: 20 } }}
            position="relative"
            zIndex={10}
          >
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
