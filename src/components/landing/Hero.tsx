import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
} from '@mui/material'
import NextLink from 'next/link'
import React from 'react'
import AppearingComponent from '../AppearingComponent'
import HeroParallax from '../HeroParallax'
import { SUBPAGES } from '@/consts'
import Button from '../Button'

type Props = {
  manifestoRef: React.RefObject<HTMLElement>
}

const Hero = ({ manifestoRef }: Props) => {
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
                  manifestoRef?.current?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {} {translate('youAreWolfSociety')}
              </Link>
            </Typography>
            <Stack sx={{ alignItems: 'center' }}>
              <NextLink
                href={SUBPAGES['collections']}
                passHref
                style={{ lineHeight: 0 }}
              >
                <Button>{translate('makeImpact')}</Button>
              </NextLink>
            </Stack>
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
