import {
  ContentTypes,
  injectCMSContent,
  useContentful,
} from '@/utils/hooks/useContentful'
import { GetStaticPropsContext } from 'next'
import { useAccount } from 'wagmi'
import { useGetNfts } from '@/utils/hooks/useGetNfts'
import { NftCard } from '@/components/NftCard'
import { useGetNftsCollections } from '@/utils/hooks/useGetNftsCollection'
import { ourCollectionsAddresses } from '@/consts'
import { compareNfts } from '@/utils/helpers'

const Home = () => {
  const translate = useContentful(ContentTypes.collectionsPage)
  const { address } = useAccount()
  const ownedNfts = useGetNfts(address)
  const wlfSocietyNfts = useGetNftsCollections(ourCollectionsAddresses)

  return (
    <>
      {wlfSocietyNfts?.map((nft, index) => (
        <NftCard
          key={index}
          nft={nft}
          owned={ownedNfts.some((ownedNft) => compareNfts(ownedNft, nft))}
        />
      ))}
    </>
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

export default Home
