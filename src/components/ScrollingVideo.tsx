import { Box, Stack, Theme, useMediaQuery } from '@mui/material'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollingVideoFrameTop from './icons/ScrollingVideoFrameTop'
import ScrollingVideoFrameBottom from './icons/ScrollingVideoFrameBottom'
import { default as NextImage, StaticImageData } from 'next/image'

type Props = {
  textImage: StaticImageData
  textImageMobile: StaticImageData
  id: string
  topColor: string
  bottomColor: string
}

enum Sizes {
  S = 'S',
  M = 'M',
  L = 'L',
}

const MEDIA_DIMENSIONS: Record<Sizes, { w: number; h: number }> = {
  S: {
    w: 375,
    h: 812,
  },
  M: {
    w: 1440,
    h: 900,
  },
  L: {
    w: 2880,
    h: 1800,
  },
}
const FRAME_COUNT = 150
const LEFT_PADDING_TO = 5

const ScrollingVideo = ({
  id,
  textImage,
  textImageMobile,
  topColor,
  bottomColor,
}: Props) => {
  const component = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLDivElement>(null)
  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('tabletS')
  )
  const isDesktop = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('desktopS')
  )

  useEffect(() => {
    let ctx = gsap.context(() => {
      const canvas = document.getElementById(
        `${id}-canvas`
      ) as HTMLCanvasElement | null
      if (!canvas) return
      const context = canvas.getContext('2d')
      if (!context) return

      const size: Sizes = isDesktop ? Sizes.L : isTablet ? Sizes.M : Sizes.S

      canvas.width = MEDIA_DIMENSIONS[size].w
      canvas.height = MEDIA_DIMENSIONS[size].h
      canvas.style.width = '100%'
      canvas.style.height = '100%'

      const currentFrame = (index: number) =>
        `/animations/${id}/${size}/${id}_${index
          .toString()
          .padStart(LEFT_PADDING_TO, '0')}.jpg`

      const images: HTMLImageElement[] = []
      const canvasObject = {
        frame: 0,
      }
      const textPanel = gsap.utils.toArray('.textPanel')

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image()
        img.src = currentFrame(i)
        images.push(img)
      }

      function render() {
        if (!context || !canvas) return
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(images[canvasObject.frame], 0, 0)
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: slider.current,
            scrub: true,
            start: `top bottom`,
            end: () => `center center+=${40 + window.innerHeight * -0.5}px`,
          },
        })
        .to(canvasObject, {
          frame: FRAME_COUNT - 1,
          snap: 'frame',
          ease: 'none',
          onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
        })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: slider.current,
            scrub: true,
            start: `center center+=40px`,
            end: () => '+=' + window.innerHeight * 0.5,
            pin: true,
          },
        })
        .to(canvasObject, {})
        .to(
          textPanel,
          {
            y: -window.innerHeight * 0.5,
            yPercent: -50,
            ease: 'none',
          },
          '<'
        )

      images[0].onload = render
    }, component)

    return () => ctx.revert()
  })

  return (
    <Box ref={component} position="relative" sx={{ overflowY: 'hidden' }}>
      <Box ref={slider} position="relative">
        <Box
          position="absolute"
          height="calc(100vh)"
          width="100%"
          bottom="50%"
          bgcolor={topColor}
          zIndex="-1"
        />
        <Box
          position="absolute"
          height="calc(100vh)"
          width="100%"
          top="50%"
          bgcolor={bottomColor}
          zIndex="-1"
        />
        <Box position="absolute" color={topColor} display="flex">
          <ScrollingVideoFrameTop />
        </Box>
        <canvas id={`${id}-canvas`} width="100%" height="auto" />
        <Box position="absolute" bottom={0} color={bottomColor} display="flex">
          <ScrollingVideoFrameBottom />
        </Box>
        <Stack
          width="100%"
          top="calc(50% + 50vh)"
          position="absolute"
          className="textPanel"
          alignContent="center"
          flexWrap="wrap"
        >
          <NextImage
            src={isTablet ? textImage : textImageMobile}
            alt={id}
            style={{ width: isTablet ? '50%' : '100%', height: 'auto' }}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default ScrollingVideo
