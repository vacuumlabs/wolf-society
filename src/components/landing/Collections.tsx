import { Box, Palette, Theme, useMediaQuery } from '@mui/material'
import { CommonColors, Stack } from '@mui/material'
import gsap from 'gsap'
import { useEffect, useLayoutEffect, useRef } from 'react'
import CollectionCard, { CollectionCardProps } from './CollectionCard'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

const d = new Date()
d.setHours(d.getHours() + 2)
const MockedCollections: Omit<CollectionCardProps, 'color'>[] = [
  {
    name: 'Earth Pollution',
    subtitle: 'Limited Edition',
    imageUrl: 'https://picsum.photos/id/986/1000/1000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque eget augue fringilla pretium vitae vitae leo. Suspendisse suscipit neque sapien, blandit commodo nulla convallis eget. Donec pretium iaculis ipsum, a commodo odio lobortis in.',
    deadline: d,
    remainingPieces: 2000,
  },
  {
    name: 'Global Warming',
    subtitle: 'Limited Edition',
    imageUrl: 'https://picsum.photos/id/987/1000/1000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque eget augue fringilla pretium vitae vitae leo. Suspendisse suscipit neque sapien, blandit commodo nulla convallis eget. Donec pretium iaculis ipsum, a commodo odio lobortis in.',
    remainingPieces: 2000,
  },
  {
    name: 'Species Extinction',
    subtitle: 'Minted out',
    imageUrl: 'https://picsum.photos/id/988/1000/1000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque eget augue fringilla pretium vitae vitae leo. Suspendisse suscipit neque sapien, blandit commodo nulla convallis eget. Donec pretium iaculis ipsum, a commodo odio lobortis in.',
    remainingPieces: 3000,
  },
]

const COLOR_ORDER: string[] = [
  'common.blue',
  'secondary.main',
  'common.brown',
  'black.main',
]

const Collections = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  const component = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLDivElement>(null)
  if (!isMobile) gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    if (isMobile) return
    let ctx = gsap.context(() => {
      const pixelsPause = 0
      let panels = gsap.utils.toArray('.panel')
      if (panels.length) {
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: slider.current,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            start: `top+=${pixelsPause} top`,
            end: () => '+=' + window.innerWidth * panels.length,
          },
        })
        ScrollTrigger.create({
          trigger: slider.current,
          end: () => '+=' + (window.innerWidth * panels.length + pixelsPause),
          pin: true,
        })
      }
    }, component)
    return () => ctx.revert()
  })

  return (
    <Stack
      ref={component}
      sx={{
        overflowX: 'hidden',
      }}
    >
      <Box
        ref={slider}
        sx={
          isMobile
            ? {}
            : {
                pt: '88px',
                width: `${100 * MockedCollections.length}vw`,
                height: `calc(${100 * MockedCollections.length}vw + 100vh)`,
                display: 'flex',
                flexWrap: 'wrap',
              }
        }
        className="container"
      >
        {MockedCollections.map((collection, index) => (
          <CollectionCard
            {...collection}
            key={collection.name}
            color={COLOR_ORDER[index % COLOR_ORDER.length]}
          />
        ))}
      </Box>
    </Stack>
  )
}
export default Collections
