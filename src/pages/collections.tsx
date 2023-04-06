import {
  CollectionData,
  Content,
  ContentTypes,
  getCollections,
  getTranslations,
  useContentful,
} from '@/utils/hooks/useContentful'
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
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

const Collections = ({
  collectionsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const translate = useContentful(ContentTypes.common)
  return !collectionsData ? (
    <></>
  ) : (
    <Stack mt={10}>
      {collectionsData.map((collection, index) => (
        <Collection
          id={collection.id}
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

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    // Will be passed to the page component as props
    props: {
      translations: await getTranslations(ContentTypes.collectionsPage, locale),
      collectionsData: await getCollections(locale),
    },
    revalidate: 60, // In seconds
  }
}

export default Collections
