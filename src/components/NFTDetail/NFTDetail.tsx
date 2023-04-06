import { ALLOCATION_INFO } from '@/consts'
import {
  Box,
  Button,
  Drawer,
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
  const translate = useContentful(ContentTypes.common)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  const buyInView = useInView(bottomAnchorRef)

  const content = (
    <>
      <NFTDescription {...nftDescriptionProps} />
      <NFTArtist {...nftArtistProps} />
      <Stack
        gap={{ mobile: 5, desktopS: 10 }}
        direction={{ mobile: 'column', tabletM: 'row' }}
        sx={{ width: '100vw', backgroundColor: 'neutral.400' }}
        p={{ mobile: '16px', tabletM: '80px' }}
      >
        {ALLOCATION_INFO.map((allocation, index) => (
          <Box py={3} key={`AllocationInfoStack${index}`}>
            <AllocationInfoStack
              percentage={allocation.percentage}
              text={translate(allocation.textKey)}
              image={allocation.image}
              isHorizontal={false}
              imageOnTheRight={index % 2 === 0}
            />
          </Box>
        ))}
      </Stack>
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
          position: 'sticky',
          minWidth: '100%',
          top: 0,
          left: 0,
          zIndex: 99,
        }}
      >
        <CloseIcon
          sx={{
            border: 'solid 3px',
            position: 'absolute',
            top: '6px',
            right: '6px',
            height: '38px',
            width: '38px',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={onClose}
        />
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
