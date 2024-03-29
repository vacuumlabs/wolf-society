import { Box } from '@mui/material'
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
import { COLLECTIONS_COLOR_ORDER } from '@/consts'

type Props = {
  collectionsData: CollectionData[] | null
}

const Collections = ({ collectionsData }: Props) => {
  const translate = useContentful(ContentTypes.common)
  const component = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLDivElement>(null)
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const pixelsPause = 0
      let panels = gsap.utils.toArray('.panel')
      if (panels.length) {
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: slider.current,
            scrub: 0,
            start: `top+=${pixelsPause} top`,
            end: () =>
              '+=' +
              window.innerWidth * (panels.length > 1 ? panels.length : 0),
            pin: true,
          },
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
      zIndex={10}
    >
      <Stack
        ref={component}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Box
          ref={slider}
          sx={{
            pt: '80px',
            width: `${100 * collectionsData.length}vw`,
            height: `calc(${
              100 * (collectionsData.length > 1 ? collectionsData.length : 0)
            }vw + 100vh)`,
            display: 'flex',
            flexWrap: 'wrap',
          }}
          className="container"
        >
          {collectionsData.map((collection, index) => (
            <CollectionCard
              id={collection.id}
              name={collection.name}
              description={collection.description}
              subtitle={translate('limitedEdition')}
              imageUrl={collection.image.fields.file.url}
              deadline={
                collection.deadline !== undefined
                  ? new Date(collection.deadline)
                  : undefined
              }
              numberOfPieces={collection.numberOfPieces}
              key={collection.name}
              color={
                COLLECTIONS_COLOR_ORDER[index % COLLECTIONS_COLOR_ORDER.length]
              }
              collectionNumber={index + 1}
              numberOfCollections={collectionsData.length}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  )
}
export default Collections
