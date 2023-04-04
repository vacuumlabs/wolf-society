import { Box, Theme, useMediaQuery } from '@mui/material'
import { Stack } from '@mui/material'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import CollectionCard from './CollectionCard'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import {
  CollectionData,
  ContentTypes,
  useContentful,
} from '@/utils/hooks/useContentful'

const COLOR_ORDER: string[] = [
  'common.blue',
  'secondary.main',
  'common.brown',
  'black.main',
]

type Props = {
  collectionsData: CollectionData[] | null
}

const Collections = ({ collectionsData }: Props) => {
  console.log('coldata', collectionsData)
  const translate = useContentful(ContentTypes.common)
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

  return !collectionsData ? (
    <></>
  ) : (
    <Box
      sx={{ bgcolor: 'neutral.400', pb: { mobile: '80px', desktopM: '160px' } }}
    >
      <Stack
        ref={component}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Box
          ref={slider}
          sx={
            isMobile
              ? {}
              : {
                  pt: '80px',
                  width: `${100 * collectionsData.length}vw`,
                  height: `calc(${100 * collectionsData.length}vw + 100vh)`,
                  display: 'flex',
                  flexWrap: 'wrap',
                }
          }
          className="container"
        >
          {collectionsData.map((collection, index) => (
            <CollectionCard
              name={collection.name}
              description={collection.description}
              subtitle={translate('limitedEdition')}
              imageUrl={collection.image.fields.file.url}
              deadline={
                collection.deadline ? new Date(collection.deadline) : undefined
              }
              numberOfPieces={collection.numberOfPieces}
              key={collection.name}
              color={COLOR_ORDER[index % COLOR_ORDER.length]}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  )
}
export default Collections
