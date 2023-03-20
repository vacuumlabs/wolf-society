import { NftCard } from '@/components/NftCard'
import { useGetNfts } from '@/utils/hooks/useGetNfts'
import { useTranslations } from '@/utils/hooks/useTranslations'
import { useAccount } from 'wagmi'

const Support = () => {
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
export default Support
