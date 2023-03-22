import {
  injectTranslations,
  useTranslations,
} from '@/utils/hooks/useTranslations'
import { GetStaticPropsContext } from 'next'
import { useAccount } from 'wagmi'
import { useGetNfts } from '@/utils/hooks/useGetNfts'
import { NftCard } from '@/components/NftCard'
import { useGetNftsCollections } from '@/utils/hooks/useGetNftsCollection'
import { ourCollectionsAddresses } from '@/consts'
import { compareNfts } from '@/utils/helpers'

const Home = () => {
  const t = useTranslations()
  const { address } = useAccount()
  const ownedNfts = useGetNfts(address)
  const wlfSocietyNfts = useGetNftsCollections(ourCollectionsAddresses)

  return (
    <>
      <h1>{t('welcome')}</h1>
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
      translations: await injectTranslations(locale),
    },
  }
}

export default Home
