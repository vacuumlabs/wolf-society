import {
  injectTranslations,
  useTranslations,
} from '@/utils/hooks/useTranslations'
import { GetStaticPropsContext } from 'next'
import { useAccount } from 'wagmi'
import { useGetNfts } from '@/utils/hooks/useGetNfts'
import { NftCard } from '@/components/NftCard'

const Home = () => {
  const t = useTranslations()
  const { address } = useAccount()
  const ownedNfts = useGetNfts(address)

  return (
    <>
      <h1>{t('welcome')}</h1>
      {ownedNfts?.map((nft) => (
        <NftCard key={nft.contract.address} nft={nft} />
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
