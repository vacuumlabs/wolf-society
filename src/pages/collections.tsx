import { ContentTypes, injectCMSContent } from '@/utils/hooks/useContentful'
import { GetStaticPropsContext } from 'next'
import { Stack } from '@mui/material'
import { MockedCollections } from '@/components/landing/Collections'
import Collection from '@/components/collections/Collection'

const COLOR_ORDER: string[] = [
  'secondary.main',
  'common.blue',
  'common.brown',
  'black.main',
]

const Collections = () => {
  return (
    <Stack mt={10}>
      {MockedCollections.map((collection, index) => (
        <Collection
          key={collection.name}
          color={COLOR_ORDER[index % COLOR_ORDER.length]}
          {...collection}
        />
      ))}
    </Stack>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    // Will be passed to the page component as props
    props: {
      translations: await injectCMSContent(
        ContentTypes.collectionsPage,
        locale
      ),
    },
  }
}

export default Collections
