import { Palette } from '@mui/material'
import { CommonColors, Stack } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Parallax, IParallax } from '@react-spring/parallax'
import CollectionCard, { CollectionCardProps } from './CollectionCard'
import { height } from '@mui/system'

const MockedCollections: Omit<
  CollectionCardProps,
  'color' | 'isFirst' | 'isLast' | 'offset' | 'scrollTo'
>[] = [
  {
    name: 'Earth Pollution',
    subtitle: 'Limited Edition\n1d 21h 30m 16s',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/16e8/0865/0b278877b8d6f8bdce91bf00c595a562?Expires=1679875200&Signature=UL48IBQ9nzSwbg9UOwUx31OdRQFCHn~Dw0HbfnuD1meAbF4bfuMFO8-Fn0DbOUghIppAHCMwH-mVyQL7lj~nzm0AntlKve~pKm0zQ41-NiDnMQKcS12Z0yiUFKjNZn31Cn9X1dSfw8f36Dr7YpE9GeyxT7jQvhtvgwEvBJpiJ~qbkN5iO63ZTE4z~tGqtsbXTj~B-RSjXPhcto83SUkmQ2XIRn8PBMNOk7ae~ZfHWqW3-ZnRD0WFdQGzcjeYXa7ndXsSaHlduQ7Fbw-3nIVz1BCX1bFPrXBLdD~chVZsa8kEZu0qDQqFJYMDj9mQepDoTcxjfICc33GzLnxr1RfNhA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque eget augue fringilla pretium vitae vitae leo. Suspendisse suscipit neque sapien, blandit commodo nulla convallis eget. Donec pretium iaculis ipsum, a commodo odio lobortis in.',
  },
  {
    name: 'Global Warming',
    subtitle: 'Limited Edition\n2,000 pieces',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/16e8/0865/0b278877b8d6f8bdce91bf00c595a562?Expires=1679875200&Signature=UL48IBQ9nzSwbg9UOwUx31OdRQFCHn~Dw0HbfnuD1meAbF4bfuMFO8-Fn0DbOUghIppAHCMwH-mVyQL7lj~nzm0AntlKve~pKm0zQ41-NiDnMQKcS12Z0yiUFKjNZn31Cn9X1dSfw8f36Dr7YpE9GeyxT7jQvhtvgwEvBJpiJ~qbkN5iO63ZTE4z~tGqtsbXTj~B-RSjXPhcto83SUkmQ2XIRn8PBMNOk7ae~ZfHWqW3-ZnRD0WFdQGzcjeYXa7ndXsSaHlduQ7Fbw-3nIVz1BCX1bFPrXBLdD~chVZsa8kEZu0qDQqFJYMDj9mQepDoTcxjfICc33GzLnxr1RfNhA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque eget augue fringilla pretium vitae vitae leo. Suspendisse suscipit neque sapien, blandit commodo nulla convallis eget. Donec pretium iaculis ipsum, a commodo odio lobortis in.',
  },
  {
    name: 'Species Extinction',
    subtitle: 'Minted out\n3,000 pieces',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/16e8/0865/0b278877b8d6f8bdce91bf00c595a562?Expires=1679875200&Signature=UL48IBQ9nzSwbg9UOwUx31OdRQFCHn~Dw0HbfnuD1meAbF4bfuMFO8-Fn0DbOUghIppAHCMwH-mVyQL7lj~nzm0AntlKve~pKm0zQ41-NiDnMQKcS12Z0yiUFKjNZn31Cn9X1dSfw8f36Dr7YpE9GeyxT7jQvhtvgwEvBJpiJ~qbkN5iO63ZTE4z~tGqtsbXTj~B-RSjXPhcto83SUkmQ2XIRn8PBMNOk7ae~ZfHWqW3-ZnRD0WFdQGzcjeYXa7ndXsSaHlduQ7Fbw-3nIVz1BCX1bFPrXBLdD~chVZsa8kEZu0qDQqFJYMDj9mQepDoTcxjfICc33GzLnxr1RfNhA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque eget augue fringilla pretium vitae vitae leo. Suspendisse suscipit neque sapien, blandit commodo nulla convallis eget. Donec pretium iaculis ipsum, a commodo odio lobortis in.',
  },
]

const COLOR_ORDER: string[] = [
  'common.blue',
  'secondary.main',
  'common.brown',
  'black.main',
]

const Collections = () => {
  const parallax = useRef<IParallax>(null)
  const scrollElementRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (to: number) => {
    if (to < 0 || to > MockedCollections.length - 1) return
    if (parallax.current) {
      setScrollPosition(to)
      parallax.current.scrollTo(to)
    }
  }

  useEffect(() => {
    const scrollElement = scrollElementRef.current
    if (!scrollElement) return

    scrollElement.addEventListener(
      'mousewheel',
      (e) => {
        e.preventDefault()
      },
      { passive: false }
    )
  }, [scrollPosition])

  return (
    <Stack
      sx={{
        flexDirection: { mobile: 'column', desktopS: 'row' },
        height: 'calc(100vh - 88px)',
      }}
      ref={scrollElementRef}
    >
      <Parallax
        pages={MockedCollections.length}
        ref={parallax}
        horizontal
        style={{ height: '100%', overflowX: 'hidden' }}
        onWheel={(e) => {
          const delta = e.deltaY
          if (
            scrollPosition === MockedCollections.length - 1 ||
            scrollPosition === 0
          ) {
            window.scrollBy({ top: window.scrollX + delta })
          }
        }}
      >
        {MockedCollections.map((collection, index) => (
          <CollectionCard
            {...collection}
            key={collection.name}
            color={COLOR_ORDER[index % COLOR_ORDER.length]}
            isFirst={index === 0}
            isLast={index === MockedCollections.length - 1}
            offset={index}
            scrollTo={scroll}
          />
        ))}
      </Parallax>
    </Stack>
  )
}
export default Collections
