import { Divider, Stack } from '@mui/material'
import Collection, { CollectionDataExtended } from './Collection'

export type CollectionsProps = {
  collectionsData: CollectionDataExtended[]
}

export const Collections = ({ collectionsData }: CollectionsProps) => {
  return (
    <Stack divider={<Divider />}>
      {collectionsData.map((collectionData) => (
        <Collection collectionData={collectionData} key={collectionData.id} />
      ))}
    </Stack>
  )
}

export default Collections
