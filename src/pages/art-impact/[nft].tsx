import { SUBPAGES } from '@/consts'
import { NFTData, getNfts } from '@/utils/hooks/useContentful'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type Props = {
  nft: NFTData | null
}

const ArtImpactNft = ({ nft }: Props) => {
  const router = useRouter()

  useEffect(() => {
    router.replace({ pathname: SUBPAGES.collections, query: { nft: nft?.id } })
  }, [])
  let queriedNftImageUrl = nft?.image.fields.file.url
  if (queriedNftImageUrl != null && !queriedNftImageUrl.startsWith('https:')) {
    queriedNftImageUrl = 'https:' + queriedNftImageUrl
  }
  const queriedNftArtist = nft?.artist?.fields?.artistName
  return nft != null ? (
    <Head>
      <meta name="og:title" content={nft.name} />
      <meta name="og:description" content={`by ${queriedNftArtist}`} />
      <meta name="og:image" content={queriedNftImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={nft.name} />
      <meta name="twitter:description" content={`by ${queriedNftArtist}`} />
      <meta name="twitter:image" content={queriedNftImageUrl} />
    </Head>
  ) : (
    <></>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
  params,
}: GetStaticPropsContext) => {
  const nftData = await getNfts(locale)
  return {
    props: {
      nft: nftData?.find((nft) => nft.id === params?.nft) ?? null,
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
