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
import { NFTDescription, NFTDescriptionProps } from './NFTDescription'
import { NFTArtist, NFTArtistProps } from './NFTArtist'
import CloseIcon from '@mui/icons-material/Close'
import { NFTUsage, NFTUsageProps } from './NFTUsage'
import { NFTBuy, NFTBuyProps } from './NFTBuy'
import { useRef, useState } from 'react'
import { VerticalLine } from './NFTVerticalLine'
import { NFTAllocation } from './NFTAllocation'
import { OnScreen } from '@/components/OnScreen'

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
  const drawerPaperRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  const [buyInView, setBuyInView] = useState(false)

  const content = (
    <>
      <NFTDescription {...nftDescriptionProps} />
      <VerticalLine />
      <NFTArtist {...nftArtistProps} />
      <VerticalLine />
      <NFTAllocation />
      <VerticalLine />
      <NFTUsage {...nftUsageProps} />
      <VerticalLine />
      <NFTBuy {...{ ...nftBuyProps, buyInView }} className="nftBuy" />
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
      PaperProps={{
        ref: drawerPaperRef,
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
      {isMobile && (
        <Box
          display={buyInView ? 'none' : 'inherit'}
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
              drawerPaperRef.current?.scrollTo({
                top: drawerPaperRef.current?.scrollHeight,
                behavior: 'smooth',
              })
            }
          >
            <Stack direction="row" gap={'1ch'}>
              <Typography variant="button">{`buy nft ${nftBuyProps.priceETH}ETH`}</Typography>
            </Stack>
          </Button>
        </Box>
      )}
      <OnScreen selector=".nftBuy" setIntersecting={setBuyInView} />
    </Drawer>
  )
}
