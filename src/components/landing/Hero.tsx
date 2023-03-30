import { SUBPAGES } from '@/consts'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography, Link } from '@mui/material'
import Image from 'next/image'
import heroImage from 'public/images/hero.png'
import React from 'react'
import Button from '../Button'

type Props = {
  manifestRef: React.RefObject<HTMLElement>
}

const Hero = ({ manifestRef }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
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
          height: { mobile: '365px', tabletM: '730px' },
          position: 'relative',
        }}
      >
        <Image
          src={heroImage}
          alt="Hero image"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </Box>
    </Box>
  )
}

export default Hero
