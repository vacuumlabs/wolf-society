import { Box } from '@mui/material'
import NftCard from '../NftCard'
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver'
import { useCallback } from 'react'
import { NFTDataWithOwnership } from '@/utils/hooks/useGetNftDataWithOwnership'

export type NftCardArtImpactProps = {
  changeArtist: (data: NFTDataWithOwnership) => void
  isLast: boolean
  nftData: NFTDataWithOwnership
  setPointerOver: (value: boolean) => void
}

const NftCardArtImpact = ({
  changeArtist,
  isLast,
  nftData,
  setPointerOver,
}: NftCardArtImpactProps) => {
  const handleIntersection = useCallback(
    (visible: boolean) => {
      if (visible) {
        changeArtist(nftData)
      }
    },
    [changeArtist, nftData]
  )

  useIntersectionObserver(`.nftCard${nftData.id}`, handleIntersection)

  return (
    <Box
      className={`nftCard${nftData.id}`}
      onPointerEnter={() => {
        setPointerOver(true)
      }}
      onPointerLeave={() => {
        setPointerOver(false)
      }}
      sx={{
        mb: { mobile: '0', tabletM: isLast ? 'calc(100vh - 80px)' : '130vh' },
      }}
    >
      <NftCard
        nftData={nftData}
        minted={nftData.minted}
        displayPrice
        limitHeight={false}
      />
    </Box>
  )
}

export default NftCardArtImpact
