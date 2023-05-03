import {
  CollectionData,
  Content,
  ContentTypes,
  getCollections,
  getNftArtists,
  getNfts,
  getTranslations,
  NFTArtistData,
  NFTData,
  useContentful,
} from '@/utils/hooks/useContentful'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { Stack } from '@mui/material'
import Collection from '@/components/collections/Collection'
import { TitleSection } from '@/components/collections/TitleSection'
import { useRef } from 'react'

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
  artistData: NFTArtistData[] | null
}

const ArtImpact = ({ collectionsData, nftData, artistData }: Props) => {
  const translate = useContentful(ContentTypes.common)
  const firstCollectionRef = useRef<HTMLDivElement>(null)
  return !collectionsData ? (
    <></>
  ) : (
    <Stack mt={10}>
      <TitleSection firstCollection={firstCollectionRef} />
      {collectionsData.map((collection, index) => {
        const nftsInThisCollection =
          nftData?.filter((nft) => nft.collectionId === collection.id) ?? null
        const nftsWithArtistData = nftsInThisCollection
          ?.map((nft): NFTWithArtistData | null => {
            const artist = artistData?.find(
              (artist) => artist.id === nft.artistId
            )

            if (nft == null || artist == null) {
              return null
            }

            return { ...nft, ...artist }
          })
          .filter((it) => it != null)

        return (
          <Collection
            id={collection.id}
            name={collection.name}
            nftData={nftsInThisCollection}
            subtitle={translate('limitedEdition')}
            artistSubtext={collection.artistSubtext}
            description={collection.description}
            deadline={
              collection.deadline ? new Date(collection.deadline) : undefined
            }
            numberOfPieces={collection.numberOfPieces}
            key={collection.name}
            color={COLOR_ORDER[index % COLOR_ORDER.length]}
            ref={index === 0 ? firstCollectionRef : null}
          />
        )
      })}
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    // Will be passed to the page component as props
    props: {
      translations: {
        ...(await getTranslations(ContentTypes.collectionsPage, locale)),
        ...(await getTranslations(ContentTypes.nftDetail, locale)),
      },
      collectionsData: await getCollections(locale),
      nftData: await getNfts(locale),
      artistData: await getNftArtists(locale),
    },
    revalidate: 60, // In seconds
  }
}

export default ArtImpact
