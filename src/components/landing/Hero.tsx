import { SUBPAGES } from '@/consts'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  Box,
  Container,
  Stack,
  Typography,
  Link,
  BreakpointOverrides,
  useMediaQuery,
  Theme,
} from '@mui/material'
import Image from 'next/image'
import heroImage from 'public/images/hero.png'
import React from 'react'
import Button from '../Button'

type Props = {
  manifestRef: React.RefObject<HTMLElement>
}

const Hero = ({ manifestRef }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletS'
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(breakpoint)
  )
  return (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <Container>
        <Stack
          sx={{ gap: 4, mt: { mobile: 15, desktopM: 20 }, textAlign: 'center' }}
        >
          <Typography variant="display" sx={{ fontWeight: 600 }}>
            {translate('heroTitle')}
          </Typography>
          <Box>
            <Typography variant="body1" display="inline">
              {translate('heroSubtitle')}
            </Typography>
            <Typography variant="body1" display="inline" color="primary">
              <Link
                variant="inherit"
                underline="hover"
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  console.log('scrolling')
                  manifestRef?.current?.scrollIntoView()
                }}
              >
                {} {translate('youAreWolfSociety')}
              </Link>
            </Typography>
          </Box>
          <Stack sx={{ alignItems: 'center' }}>
            <Button href={SUBPAGES['collections']}>
              {translate('makeImpact')}
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Box
        sx={{
          height: 'auto',
          position: 'relative',
          maxHeight: '1000px',
        }}
      >
        <Image
          src={heroImage}
          alt="Hero image"
          priority
          style={{
            objectFit: isMobile ? 'cover' : 'contain',
            objectPosition: 'top',
            position: 'relative',
            height: isMobile ? '365px' : '100%',
            width: '100%',
            zIndex: 1,
            maxHeight: '1000px',
          }}
        />
        <Box
          bgcolor="secondary.main"
          height="27%"
          position="absolute"
          width="100%"
          bottom="0"
        />
      </Box>
    </Box>
  )
}

export default Hero
