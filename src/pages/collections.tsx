import {
  CollectionData,
  Content,
  ContentTypes,
  getCollections,
  getTranslations,
  useContentful,
} from '@/utils/hooks/useContentful'
import { GetStaticPropsContext } from 'next'
import { Stack } from '@mui/material'
import Collection from '@/components/collections/Collection'

const COLOR_ORDER: string[] = [
  'secondary.main',
  'common.blue',
  'common.brown',
  'black.main',
]

type Props = {
  translations: Partial<Content>
  collectionsData: CollectionData[] | null
}

const Collections = ({ collectionsData }: Props) => {
  const translate = useContentful(ContentTypes.common)
  return !collectionsData ? (
    <></>
  ) : (
    <Stack mt={10}>
      {collectionsData.map((collection, index) => (
        <Collection
          name={collection.name}
          subtitle={translate('limitedEdition')}
          imageUrl={collection.image.fields.file.url}
          description={collection.description}
          deadline={
            collection.deadline ? new Date(collection.deadline) : undefined
          }
          numberOfPieces={collection.numberOfPieces}
          key={collection.name}
          color={COLOR_ORDER[index % COLOR_ORDER.length]}
        />
      ))}
    </Stack>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    // Will be passed to the page component as props
    props: {
      translations: await getTranslations(ContentTypes.collectionsPage, locale),
      collectionsData: await getCollections(locale),
    },
  }
}

export default Collections
