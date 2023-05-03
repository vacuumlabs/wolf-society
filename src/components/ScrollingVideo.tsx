import { Box, Stack, Theme, useMediaQuery } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
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
  S: { w: 374, h: 812 },
  M: { w: 960, h: 600 },
  L: { w: 1440, h: 900 },
}

const VIDEO_DURATION_SECONDS = 5

const ScrollingVideo = ({
  id,
  textImage,
  textImageMobile,
  topColor,
  bottomColor,
}: Props) => {
  const [videosRequested, setVideosRequested] = useState<Sizes[]>([])
  const [canvasIsBlank, setCanvasIsBlank] = useState(false)
  const component = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLDivElement>(null)
  const isTabletSSR = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('tabletS')
  )
  const isTablet = useMediaQuery(
    (theme: Theme) => theme.breakpoints.up('tabletS'),
    {
      noSsr: true,
    }
  )
  const isDesktop = useMediaQuery(
    (theme: Theme) => theme.breakpoints.up('desktopS'),
    {
      noSsr: true,
    }
  )

  useEffect(() => {
    const canvas = document.getElementById(
      `${id}-canvas`
    ) as HTMLCanvasElement | null
    if (!canvas) throw 'Canvas not found!'

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('isBlank', isCanvasBlank(canvas))
        setCanvasIsBlank(isCanvasBlank(canvas))
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    )

    if (canvas != null) {
      observer.observe(canvas)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  function isCanvasBlank(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    return (
      !context ||
      !context
        .getImageData(0, 0, canvas.width, canvas.height)
        .data.some((channel) => channel !== 0)
    )
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      const video = document.getElementById(
        `${id}-video`
      ) as HTMLVideoElement | null
      const canvas = document.getElementById(
        `${id}-canvas`
      ) as HTMLCanvasElement | null
      if (!canvas) throw 'Canvas not found!'
      if (!video) throw 'Video not found!'
      const context = canvas.getContext('2d')
      if (!context) throw 'Context not found!'

      const size: Sizes = isDesktop ? Sizes.L : isTablet ? Sizes.M : Sizes.S

      canvas.width = MEDIA_DIMENSIONS[size].w
      canvas.height = MEDIA_DIMENSIONS[size].h

      const dimension = MEDIA_DIMENSIONS[size].w
      const url = `/animations/${id}${dimension}.mp4`

      const textPanel = gsap.utils.toArray('.textPanel')

      if (!videosRequested.includes(size)) {
        // Preload the video
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = function (oEvent) {
          var blob = new Blob([(oEvent.target as any).response], {
            type: 'video/mp4',
          })
          video.src = URL.createObjectURL(blob)
        }
        xhr.send()
        setVideosRequested(videosRequested.concat([size]))
      } else {
        video.src = url
        console.log('setting url')
      }
      context.drawImage(video, 0, 0)

      gsap
        .timeline({
          scrollTrigger: {
            trigger: slider.current,
            scrub: true,
            start: `top bottom`,
            end: () => `center center+=${40 + window.innerHeight * -0.5}px`,
            onUpdate: () => {
              video.pause()
              context.drawImage(video, 0, 0)
            },
          },
        })
        .to(video, {
          currentTime: VIDEO_DURATION_SECONDS,
          ease: 'none',
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
        .to(video, {})
        .to(
          textPanel,
          {
            y: -window.innerHeight * 0.5,
            yPercent: -50,
            ease: 'none',
          },
          '<'
        )
    }, component)

    return () => ctx.revert()
  }, [isTablet, isDesktop])

  return (
    <Box ref={component} position="relative" sx={{ overflowY: 'hidden' }}>
      <Box ref={slider} position="relative">
        <Box
          position="absolute"
          height="calc(100vh)"
          width="100%"
          bottom="50%"
          bgcolor={topColor}
          zIndex="-20"
        />
        <Box
          position="absolute"
          height="calc(100vh)"
          width="100%"
          top="50%"
          bgcolor={bottomColor}
          zIndex="-20"
        />
        <Box position="absolute" color={topColor} display="flex" width="100%">
          <ScrollingVideoFrameTop />
        </Box>
        <video
          id={`${id}-video`}
          className="video"
          src=""
          width="100%"
          height="auto"
          preload="auto"
          style={{
            display: canvasIsBlank ? 'inherit' : 'none',
            position: 'absolute',
            zIndex: '-10',
          }}
          autoPlay
          loop
          muted
          playsInline
        />
        <canvas
          id={`${id}-canvas`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          position="absolute"
          bottom={0}
          color={bottomColor}
          display="flex"
          width="100%"
        >
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
            src={isTabletSSR ? textImage : textImageMobile}
            alt={id}
            style={{ width: isTabletSSR ? '50%' : '100%', height: 'auto' }}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default ScrollingVideo
