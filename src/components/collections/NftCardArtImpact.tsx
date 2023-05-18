import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useInView } from 'framer-motion'
import NftCard, { NftCardProps } from '../NftCard'

export type NftCardArtImpactProps = {
  changeArtist: () => void
  isLast: boolean
  nftCardProps: NftCardProps
  setPointerOver: (value: boolean) => void
}

const DynamicShareButton = dynamic(
  () => import('./ShareButton').then((mod) => mod.ShareButton),
  { ssr: false }
)

const NftCardArtImpact = ({
  changeArtist,
  isLast,
  nftCardProps,
  setPointerOver,
}: NftCardArtImpactProps) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef)

  useEffect(() => {
    if (isInView) changeArtist()
  }, [isInView, changeArtist])

  return (
    <Box
      ref={containerRef}
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
      <NftCard {...nftCardProps} displayPrice />
    </Box>
  )
}
export default NftCardArtImpact
