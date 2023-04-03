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
import circleImage from 'public/images/circle.png'
import factoryImage from 'public/images/factory.png'
import handsImage from 'public/images/hands.png'
import mountainImage from 'public/images/mountain.png'
import peopleImage from 'public/images/people.png'
import React from 'react'
import AppearingComponent from '../AppearingComponent'
import Button from '../Button'
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from 'react-parallax-mouse'

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
                    console.log('scrolling')
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
        <Box
          style={{
            height: '51vw',
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            bgcolor="secondary.main"
            height="27%"
            position="absolute"
            width="100%"
            bottom="0"
          />
          <MouseParallaxContainer
            globalFactorX={0.1}
            globalFactorY={0}
            resetOnLeave
            containerStyle={{
              position: 'static',
              width: '100%',
              height: '100%',
              overflowX: 'hidden',
            }}
          >
            <MouseParallaxChild
              factorX={0.2}
              style={{ position: 'absolute', zIndex: 91, top: 0, right: '-1%' }}
            >
              <Image
                src={mountainImage}
                alt="Mountain image"
                style={{
                  width: '34.5vw',
                  height: 'auto',
                }}
              />
            </MouseParallaxChild>
            <MouseParallaxChild
              factorX={0.1}
              style={{
                position: 'absolute',
                zIndex: 91,
                top: '6.5%',
                left: '-1%',
              }}
            >
              <Image
                src={factoryImage}
                alt="Factory image"
                style={{
                  width: '37.5vw',
                  height: 'auto',
                }}
              />
            </MouseParallaxChild>

            <MouseParallaxChild
              factorX={0.1}
              style={{
                position: 'absolute',
                zIndex: 90,
                top: '5%',
                left: '46.5%',
              }}
            >
              <Image
                src={handsImage}
                alt="Hands image"
                style={{
                  width: '47vw',
                  height: 'auto',
                }}
              />
            </MouseParallaxChild>
            <MouseParallaxChild
              factorX={0}
              style={{
                position: 'absolute',
                zIndex: 0,
                top: '19%',
                left: '28%',
              }}
            >
              <Image
                src={circleImage}
                alt="Circle image"
                style={{
                  width: '45vw',
                  height: 'auto',
                }}
              />
            </MouseParallaxChild>
            <MouseParallaxChild
              factorX={0.3}
              inverted
              style={{
                position: 'absolute',
                zIndex: 92,
                top: '26.5%',
                left: '16.5%',
              }}
            >
              <Image
                src={peopleImage}
                alt="People image"
                style={{
                  width: '59vw',
                  height: 'auto',
                }}
              />
            </MouseParallaxChild>
          </MouseParallaxContainer>
        </Box>
      </AppearingComponent>
    </Box>
  )
}

export default Hero
