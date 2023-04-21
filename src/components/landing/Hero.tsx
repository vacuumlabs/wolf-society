import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  Box,
  Container,
  Stack,
  Typography,
  Link,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import AppearingComponent from '../AppearingComponent'
import HeroParallax from '../HeroParallax'

type Props = {
  manifestRef: React.RefObject<HTMLElement>
}

const Hero = ({ manifestRef }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  const theme = useTheme()
  const displayLineBreak = useMediaQuery(theme.breakpoints.up(528))

  return (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <AppearingComponent>
        <Container>
          <Stack
            sx={{
              gap: 4,
              mt: 5,
              textAlign: 'center',
            }}
          >
            <Typography variant="display" sx={{ fontWeight: 600 }}>
              {translate('heroTitle')}
            </Typography>
            <Typography variant="body2" display="inline">
              {translate('heroSubtitle').concat(' ')}
              <br style={{ display: displayLineBreak ? 'inherit' : 'none' }} />
              <Link
                variant="inherit"
                underline="hover"
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  manifestRef?.current?.scrollIntoView()
                }}
              >
                {} {translate('youAreWolfSociety')}
              </Link>
            </Typography>
          </Stack>
        </Container>
      </AppearingComponent>
      <AppearingComponent>
        <HeroParallax />
      </AppearingComponent>
    </Box>
  )
}

export default Hero
