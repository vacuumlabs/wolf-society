import { SUBPAGES } from '@/consts'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography, Link } from '@mui/material'
import React, { useState } from 'react'
import AppearingComponent from '../AppearingComponent'
import Button from '../Button'
import HeroParallax from '../HeroParallax'

type Props = {
  manifestRef: React.RefObject<HTMLElement>
}

const Hero = ({ manifestRef }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  const [isOpenId, setIsOpenId] = useState<number | null>(0)
  return (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <AppearingComponent>
        <Container>
          <Stack
            sx={{
              gap: 4,
              mt: { mobile: 15, desktopM: 20 },
              textAlign: 'center',
            }}
          >
            <Typography variant="display" sx={{ fontWeight: 600 }}>
              {translate('heroTitle')}
            </Typography>
            <Stack direction="column">
              <Typography variant="body1" display="inline">
                {translate('heroSubtitle')}
              </Typography>
              <Typography variant="body1" display="inline" color="primary">
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
            <Stack sx={{ alignItems: 'center' }}>
              <Button href={SUBPAGES['collections']}>
                {translate('makeImpact')}
              </Button>
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
