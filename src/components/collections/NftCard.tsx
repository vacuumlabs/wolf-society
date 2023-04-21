import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import Button from '../Button'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import { NFTDetail } from '../NFTDetail/NFTDetail'
import { MOCKED_NFT_DETAIL } from '../NFTDetail/mockedDetailData'
import { useEffect, useRef, useState } from 'react'
import { Edge } from './ShareButton'
import dynamic from 'next/dynamic'
import { useInView } from 'framer-motion'

export type NftCardProps = {
  name: string
  imageUrl: string
  priceEth: string
  priceFiat: string
  minted: number
  supply: number
  artistName: string
  changeArtist: () => void
  isLast: boolean
}

const DynamicShareButton = dynamic(
  () => import('./ShareButton').then((mod) => mod.ShareButton),
  { ssr: false }
)

const NftCard = ({
  name,
  imageUrl,
  priceEth,
  priceFiat,
  minted,
  supply,
  artistName,
  changeArtist,
  isLast,
}: NftCardProps) => {
  const translate = useContentful(ContentTypes.common)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)

  const containerRef = useRef(null)
  const isInView = useInView(containerRef)

  useEffect(() => {
    if (isInView) changeArtist()
  }, [isInView, changeArtist])

  return (
    <Box sx={{ mb: { mobile: '0', tabletM: isLast ? 0 : '130vh' } }}>
      <Card
        ref={containerRef}
        sx={{
          bgcolor: 'neutral.main',
          width: '100%',
          '& .MuiCardContent-root': {
            mobile: {},
            [breakpoint]: { translate: '0 48px' },
            desktopM: { translate: '0 56px' },
          },
          '&:hover .MuiCardContent-root': {
            mobile: {},
            [breakpoint]: { translate: '0 0' },
          },
        }}
      >
        <CardActionArea
          onClick={() => {
            console.log(`Clicked ${name}`)
          }}
        >
          <Box position="relative">
            <CardMedia
              component="img"
              sx={{ height: '100%' }}
              image={imageUrl}
              alt="Project image"
            />
            <Box
              bgcolor="black.main"
              position="absolute"
              bottom={0}
              right={0}
              px={2}
              py={1}
            >
              <Typography variant="body2" display="inline" color="neutral.400">
                {minted}
              </Typography>
              <Typography variant="body2" display="inline" color="neutral.700">
                /{supply} {translate('pieces')}
              </Typography>
            </Box>
            <DynamicShareButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translateY(100%)',
                zIndex: 1,
              }}
              removeEdges={new Set<Edge>(['r', 't'])}
            />
          </Box>
          <CardContent sx={{ p: 0, transition: 'translate 0.25s' }}>
            <Stack sx={{ p: 4, textAlign: 'start' }} gap={1}>
              <Typography variant="caption" color="secondary">
                {name}
              </Typography>
              <Typography variant="body2S">{artistName}</Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="caption">{priceEth}</Typography>
                <Typography variant="body2">{priceFiat}</Typography>
              </Stack>
            </Stack>
            <Button
              component="div"
              sx={{ width: '100%' }}
              endIcon={<ArrowRightIcon />}
              onClick={() => setIsDetailOpen(true)}
            >
              {translate('showDetails')}
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
      <NFTDetail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        {...MOCKED_NFT_DETAIL}
      />
    </Box>
  )
}
export default NftCard
