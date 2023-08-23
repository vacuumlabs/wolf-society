import { SUBPAGES, WEBPAGE_DOMAIN } from '@/consts'
import {
  NFTData,
  getNfts,
  getTranslations,
  ContentTypes,
  Content,
} from '@/utils/hooks/useContentful'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type Props = {
  translations: Partial<Content>
  nftData: NFTData[] | null
}

const ArtImpactNft = ({ nftData }: Props) => {
  const router = useRouter()

  const nft = nftData?.find((nft) => nft.id === router.query.nft) ?? null

  useEffect(() => {
    if (nft != null) {
      router.replace({ pathname: SUBPAGES.collections, query: { nft: nft.id } })
    }
  }, [nft])

  let queriedNftImageUrl = nft?.image.fields.file.url
  if (queriedNftImageUrl != null && !queriedNftImageUrl.startsWith('https:')) {
    queriedNftImageUrl = 'https:' + queriedNftImageUrl
  }
  const queriedNftArtist = nft?.artist.fields.artistName
  const pageUrl = `${WEBPAGE_DOMAIN}${SUBPAGES.collections}/${nft?.id ?? ''}`

  return nft != null ? (
    <Head>
      <meta name="og:title" content={nft.name} />
      <meta name="og:description" content={`by ${queriedNftArtist}`} />
      <meta name="og:image" content={queriedNftImageUrl} />
      <meta name="og:url" content={pageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={nft.name} />
      <meta name="twitter:description" content={`by ${queriedNftArtist}`} />
      <meta name="twitter:image" content={queriedNftImageUrl} />
      <meta property="og:title" content={nft.name} />
      <meta property="og:description" content={`by ${queriedNftArtist}`} />
      <meta property="og:image" content={queriedNftImageUrl} />
      <meta property="og:url" content={pageUrl} />
    </Head>
  ) : (
    <></>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      translations: {
        ...(await getTranslations(ContentTypes.collectionsPage, locale)),
      },
      nftData: await getNfts(locale),
    },
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default ArtImpactNft
