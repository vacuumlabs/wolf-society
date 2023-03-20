import { NftCard } from '@/components/NftCard'
import { useGetNfts } from '@/utils/hooks/useGetNfts'
import { useTranslations } from '@/utils/hooks/useTranslations'
import { Container } from '@mui/material'
import { useAccount } from 'wagmi'

const Support = () => {
  const t = useTranslations()
  const { address } = useAccount()
  const ownedNfts = useGetNfts(address)

  return (
    <Container sx={{ mt: 10 }}>
      <h1>{t('welcome')}</h1>
      {ownedNfts?.map((nft) => (
        <NftCard key={nft.contract.address} nft={nft} />
      ))}
    </Container>
  )
}
export default Support
