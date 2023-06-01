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
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { Stack } from '@mui/material'
import Collection from '@/components/collections/Collection'
import { TitleSection } from '@/components/collections/TitleSection'
import { useRef } from 'react'
import { COLLECTIONS_COLOR_ORDER } from '@/consts'
import { useGetNftDataWithOwnership } from '@/utils/hooks/useGetNftDataWithOwnership'

type Props = {
  translations: Partial<Content>
  collectionsData: CollectionData[] | null
  nftData: NFTData[] | null
}

const ArtImpact = ({ collectionsData, nftData }: Props) => {
  const translate = useContentful(ContentTypes.common)
  const firstCollectionRef = useRef<HTMLDivElement>(null)
  const nftsDataWithOwnership = useGetNftDataWithOwnership(nftData)

  return !collectionsData ? (
    <></>
  ) : (
    <Stack mt={10}>
      <TitleSection firstCollection={firstCollectionRef} />
      {collectionsData.map((collection, index) => {
        const nftsInThisCollection = nftsDataWithOwnership.filter(
          (nft) => nft.collection.fields.id === collection.id
        )

        return (
          <Collection
            id={collection.id}
            name={collection.name}
            nftData={nftsInThisCollection}
            subtitle={translate('limitedEdition')}
            description={collection.description}
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
    },
  }
}

export default ArtImpact
