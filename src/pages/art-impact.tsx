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
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Stack } from '@mui/material'
import Collection from '@/components/collections/Collection'
import { TitleSection } from '@/components/collections/TitleSection'
import { useRef } from 'react'
import { COLLECTIONS_COLOR_ORDER } from '@/consts'
import { useGetNftDataExtended } from '@/utils/hooks/useGetNftDataExtended'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'

type Props = {
  translations: Partial<Content>
  collectionsData: CollectionData[] | null
  nftData: NFTData[] | null
  query: ParsedUrlQuery
}

const ArtImpact = ({ collectionsData, nftData, query }: Props) => {
  const translate = useContentful(ContentTypes.common)
  const firstCollectionRef = useRef<HTMLDivElement>(null)
  const nftsDataExtended = useGetNftDataExtended(nftData)

  const queriedNft = query.nft
    ? nftData?.find((nft) => nft.id === query.nft)
    : undefined
  return !collectionsData ? (
    <></>
  ) : (
    <Stack mt={10}>
      <TitleSection firstCollection={firstCollectionRef} />
      {collectionsData.map((collection, index) => {
        const nftsInThisCollection = nftsDataExtended.filter(
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
      {queriedNft != null && (
        <Head>
          <meta name="og:title" content={queriedNft.name} />
          <meta name="og:image" content={queriedNft.image.fields.file.url} />
        </Head>
      )}
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  locale,
}: GetServerSidePropsContext) => {
  return {
    // Will be passed to the page component as props
    props: {
      translations: {
        ...(await getTranslations(ContentTypes.collectionsPage, locale)),
        ...(await getTranslations(ContentTypes.nftDetail, locale)),
      },
      collectionsData: await getCollections(locale),
      nftData: await getNfts(locale),
      query,
    },
  }
}

export default ArtImpact
