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

const preloadVideo = (url: string, onLoad: (src: string) => void) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'arraybuffer'

  xhr.onload = () => {
    if (xhr.response instanceof ArrayBuffer) {
      const blob = new Blob([xhr.response], {
        type: 'video/mp4',
      })
      onLoad(URL.createObjectURL(blob))
    } else {
      console.error('Response is not an ArrayBuffer.')
    }
  }

  xhr.onerror = (e) => {
    console.error('Request failed:', e)
  }

  xhr.send()
}

const ScrollingVideo = ({
  id,
  textImage,
  textImageMobile,
  topColor,
  bottomColor,
}: Props) => {
  const [aspectRatio, setAspectRatio] = useState(1.6)
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

  const size: Sizes = isDesktop ? Sizes.L : isTablet ? Sizes.M : Sizes.S
  const dimension = MEDIA_DIMENSIONS[size].w
  const url = `/animations/${id}${dimension}.mp4`

  useEffect(() => {
    setAspectRatio(MEDIA_DIMENSIONS[size].w / MEDIA_DIMENSIONS[size].h)
  }, [size])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const video = document.getElementById(
        `${id}-video`
      ) as HTMLVideoElement | null
      if (!video) return

      const textPanel = gsap.utils.toArray('.textPanel')

      preloadVideo(url, (src) => {
        video.src = src
      })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: slider.current,
            scrub: true,
            start: `top bottom`,
            end: () => `center center+=${40 + window.innerHeight * -0.5}px`,
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
  }, [id, url])

  return (
    <Box ref={component} position="relative" sx={{ overflowY: 'hidden' }}>
      <Box
        ref={slider}
        position="relative"
        style={{ width: '100%', height: 'auto' }}
      >
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

        <div
          style={{
            position: 'relative',
            aspectRatio: aspectRatio,
          }}
        >
          <Box position="absolute" color={topColor} display="flex" width="100%">
            <ScrollingVideoFrameTop />
          </Box>
          <video
            id={`${id}-video`}
            className="video"
            width="100%"
            height="auto"
            preload="auto"
            style={{
              position: 'absolute',
              zIndex: '-10',
            }}
            autoPlay // This has to be here for iOS
            muted // This has to be here for iOS
            playsInline // This has to be here for iOS
            onLoadedData={(event) => {
              event.currentTarget.pause()
            }}
          ></video>
          <Box
            position="absolute"
            bottom={-1}
            color={bottomColor}
            display="flex"
            width="100%"
          >
            <ScrollingVideoFrameBottom />
          </Box>
        </div>
        <Stack
          width="100%"
          top="calc(50% + 50vh)"
          position="absolute"
          className="textPanel"
          alignContent="center"
          flexWrap="wrap"
          px={isTabletSSR ? 0 : 3}
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
