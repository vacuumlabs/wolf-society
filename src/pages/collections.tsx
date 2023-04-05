import {
  CollectionData,
  Content,
  ContentTypes,
  getCollections,
  getNfts,
  getTranslations,
  NFTData,
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
  nftData: NFTData[] | null
}

const Collections = ({ collectionsData, nftData }: Props) => {
  const translate = useContentful(ContentTypes.common)
  return !collectionsData ? (
    <></>
  ) : (
    <Stack mt={10}>
      {collectionsData.map((collection, index) => {
        const nftsInThisCollection =
          nftData?.filter((nft) => nft.collectionId === collection.id) ?? null
        return (
          <Collection
            name={collection.name}
            nftData={nftsInThisCollection}
            subtitle={translate('limitedEdition')}
            artistName={collection.artistName}
            artistSubtext={collection.artistSubtext}
            artistImage={collection.artistImage.fields.file.url}
            description={collection.description}
            deadline={
              collection.deadline ? new Date(collection.deadline) : undefined
            }
            numberOfPieces={collection.numberOfPieces}
            key={collection.name}
            color={COLOR_ORDER[index % COLOR_ORDER.length]}
          />
        )
      })}
    </Stack>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    // Will be passed to the page component as props
    props: {
      translations: await getTranslations(ContentTypes.collectionsPage, locale),
      collectionsData: await getCollections(locale),
      nftData: await getNfts(locale),
    },
  }
}

export default Collections
