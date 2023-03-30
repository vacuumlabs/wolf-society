import { Palette } from '@mui/material'
import { CommonColors, Stack } from '@mui/material'
import CollectionCard, { CollectionCardProps } from './CollectionCard'

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
    // remainingPieces: 2000,
  },
  // {
  //   name: 'Global Warming',
  //   subtitle: 'Limited Edition\n2,000 pieces',
  //   imageUrl:
  //     'https://picsum.photos/id/987/1000/1000',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque eget augue fringilla pretium vitae vitae leo. Suspendisse suscipit neque sapien, blandit commodo nulla convallis eget. Donec pretium iaculis ipsum, a commodo odio lobortis in.',
  // },
  // {
  //   name: 'Species Extinction',
  //   subtitle: 'Minted out\n3,000 pieces',
  //   imageUrl:
  //     'https://picsum.photos/id/988/1000/1000',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque eget augue fringilla pretium vitae vitae leo. Suspendisse suscipit neque sapien, blandit commodo nulla convallis eget. Donec pretium iaculis ipsum, a commodo odio lobortis in.',
  // },
]

const COLOR_ORDER: string[] = [
  'common.blue',
  'secondary.main',
  'common.brown',
  'black.main',
]

const Collections = () => {
  return (
    <Stack sx={{ flexDirection: { mobile: 'column', desktopS: 'row' } }}>
      {MockedCollections.map((collection, index) => (
        <CollectionCard
          {...collection}
          key={collection.name}
          color={COLOR_ORDER[index % COLOR_ORDER.length]}
        />
      ))}
    </Stack>
  )
}
export default Collections
