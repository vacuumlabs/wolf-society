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
import { NFTDescription } from './NFTDescription'
import { NFTArtist, NFTArtistProps } from './NFTArtist'
import CloseIcon from '../icons/CloseIcon'
import { NFTUsage, NFTUsageProps } from './NFTUsage'
import { NFTBuy } from './NFTBuy'
import { useRef, useState } from 'react'
import { NFTDividerLine } from './NFTDividerLine'
import { OnScreen } from '@/components/OnScreen'
import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { NFTDataWithOwnership } from '@/utils/hooks/useGetNftDataWithOwnership'

export interface NFTDetailProps {
  isOpen: boolean
  onClose: () => void
  nftData: NFTDataWithOwnership
  nftArtistProps: NFTArtistProps
  nftUsageProps: NFTUsageProps
}

export const NFTDetail = ({
  isOpen,
  onClose,
  nftData,
  nftArtistProps,
  nftUsageProps,
}: NFTDetailProps) => {
  const translate = useContentful(ContentTypes.nftDetail)
  const drawerPaperRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  const [buyInView, setBuyInView] = useState(false)
  const [scrollAnimValue, setScrollAnimValue] = useState(0)

  const content = (
    <>
      <NFTDescription nftData={nftData} />
      <NFTDividerLine />
      <NFTArtist {...nftArtistProps} />
      <NFTDividerLine />
      <NFTUsage {...nftUsageProps} />
      {!isMobile && <NFTDividerLine />}
      <NFTBuy nftData={nftData} buyInView={buyInView} className="nftBuy" />
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
        <Stack sx={{ backgroundColor: 'neutral.400' }}>{content}</Stack>
      ) : (
        <HorizontalScroll reverseScroll={true} animValues={scrollAnimValue}>
          {content.props.children}
        </HorizontalScroll>
      )}
      {!nftData.owned && (
        <Box
          display={buyInView ? 'none' : 'inherit'}
          sx={{
            position: isMobile ? 'sticky' : 'fixed',
            minWidth: isMobile ? '100%' : 0,
            bottom: 0,
            left: isMobile ? 0 : undefined,
            right: isMobile ? undefined : 0,
            m: isMobile ? 0 : 2,
            zIndex: 99,
          }}
        >
          <Button
            variant="contained"
            fullWidth={isMobile}
            onClick={() => {
              if (isMobile) {
                drawerPaperRef.current?.scrollTo({
                  top: drawerPaperRef.current?.scrollHeight,
                  behavior: 'smooth',
                })
              } else {
                const scrollDiv =
                  document.getElementsByClassName('scroll-horizontal')[0]
                    .children[0]

                const scrollDivTransformX = new WebKitCSSMatrix(
                  window
                    .getComputedStyle(scrollDiv)
                    .getPropertyValue('transform')
                ).m41

                const scrollAmount =
                  -scrollDiv.clientWidth -
                  scrollDivTransformX +
                  window.innerWidth
                setScrollAnimValue(
                  scrollAnimValue === scrollAmount
                    ? scrollAmount - 1
                    : scrollAmount
                )
              }
            }}
          >
            <Stack direction="row" gap={'1ch'}>
              <Typography variant="button">{`${translate('buyNft')} ${
                nftData.priceInEth
              } ETH`}</Typography>
            </Stack>
          </Button>
        </Box>
      )}
      <OnScreen selector=".nftBuy" setIntersecting={setBuyInView} />
    </Drawer>
  )
}
