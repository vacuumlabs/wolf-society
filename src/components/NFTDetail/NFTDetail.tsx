import { ALLOCATION_INFO } from '@/consts'
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import HorizontalScroll from 'react-scroll-horizontal'
import AllocationInfoStack from '../AllocationInfoStack'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { NFTDescription, NFTDescriptionProps } from './NFTDescription'
import { NFTArtist, NFTArtistProps } from './NFTArtist'
import CloseIcon from '@mui/icons-material/Close'
import { NFTUsage, NFTUsageProps } from './NFTUsage'
import { NFTBuy, NFTBuyProps } from './NFTBuy'
import { ReactNode, useRef } from 'react'
import { useInView } from 'framer-motion'
import { VerticalLine } from './NFTVerticalLine'
import { NFTAllocation } from './NFTAllocation'

export interface NFTDetailProps {
  isOpen: boolean
  onClose: () => void
  nftDescriptionProps: NFTDescriptionProps
  nftArtistProps: NFTArtistProps
  nftUsageProps: NFTUsageProps
  nftBuyProps: NFTBuyProps
}

export const NFTDetail = ({
  isOpen,
  onClose,
  nftDescriptionProps,
  nftArtistProps,
  nftUsageProps,
  nftBuyProps,
}: NFTDetailProps) => {
  const bottomAnchorRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  const buyInView = useInView(bottomAnchorRef)

  const content = (
    <>
      <NFTDescription {...nftDescriptionProps} />
      <NFTArtist {...nftArtistProps} />
      <NFTAllocation />
      <VerticalLine />
      <NFTUsage {...nftUsageProps} />
      <VerticalLine />
      <NFTBuy {...nftBuyProps} />
    </>
  )
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => onClose()}
      sx={{
        '& .MuiPaper-root': {
          width: '100vw',
          overflowX: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          position: { mobile: 'sticky', tabletM: 'absolute' },
          minWidth: '100%',
          minHeight: '80px',
          top: 0,
          left: 0,
          zIndex: 99,
          backgroundColor: isMobile ? 'neutral.600' : 'transparent',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {isMobile ? (
        <Stack sx={{ backgroundColor: 'neutral.400', gap: '80px' }}>
          {content}
        </Stack>
      ) : (
        <HorizontalScroll reverseScroll={true}>
          {content.props.children}
        </HorizontalScroll>
      )}
      {isMobile && !buyInView && (
        <Box
          sx={{
            position: 'sticky',
            minWidth: '100%',
            bottom: 0,
            left: 0,
            zIndex: 99,
          }}
        >
          <Button
            variant="contained"
            fullWidth={true}
            onClick={() =>
              bottomAnchorRef?.current?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <Stack direction="row" gap={'1ch'}>
              <Typography variant="button">{`buy nft ${nftBuyProps.priceETH}ETH`}</Typography>
              <Typography
                variant="button"
                sx={{ opacity: 0.5 }}
              >{`${nftBuyProps.priceEur}EUR`}</Typography>
            </Stack>
          </Button>
        </Box>
      )}
      <Box
        ref={bottomAnchorRef}
        sx={{ width: '10px', minHeight: '10px', marginTop: '-10px' }}
      ></Box>
    </Drawer>
  )
}
