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
import Image from 'next/image'
import heroTitle from 'public/images/heroTitle.png'

type Props = {
  manifestoRef: React.RefObject<HTMLElement>
}

const Hero = ({ manifestoRef }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  const theme = useTheme()
  const displayLineBreak = useMediaQuery(theme.breakpoints.up(528))
  const isMobile = useMediaQuery(theme.breakpoints.down('tabletM'))

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
            <Box
              sx={{
                alignItems: 'center',
              }}
            >
              <Image
                src={heroTitle}
                alt={'The Earth Is What We All Have in Common'}
                style={{
                  alignItems: 'center',
                  width: isMobile ? '100vw' : '80vw',
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
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
