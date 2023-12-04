import { Box } from '@mui/material'
import NftCard, { NftCardProps } from '../NftCard'
import { OnScreen } from '../OnScreen'

export type NftCardArtImpactProps = {
  changeArtist: () => void
  isLast: boolean
  nftCardProps: NftCardProps
  setPointerOver: (value: boolean) => void
}

const NftCardArtImpact = ({
  changeArtist,
  isLast,
  nftCardProps,
  setPointerOver,
}: NftCardArtImpactProps) => {
  return (
    <>
      <Box
        className={`nftCard${nftCardProps.nftData.id}`}
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
        <NftCard {...nftCardProps} displayPrice limitHeight={false} />
      </Box>
      <OnScreen
        selector={`.nftCard${nftCardProps.nftData.id}`}
        setIntersecting={(visible: boolean) => {
          if (visible) {
            changeArtist()
          }
        }}
      />
    </>
  )
}
export default NftCardArtImpact
