import { ALLOCATION_INFO } from '@/consts'
import { Box, Drawer, Stack, Theme, useMediaQuery } from '@mui/material'
import HorizontalScroll from 'react-scroll-horizontal'
import AllocationInfoStack from '../AllocationInfoStack'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { NFTDescription, NFTDescriptionProps } from './NFTDescription'
import { NFTArtist, NFTArtistProps } from './NFTArtist'
import CloseIcon from '@mui/icons-material/Close'
import { NFTUsage, NFTUsageProps } from './NFTUsage'
import { NFTBuy, NFTBuyProps } from './NFTBuy'

export interface NFTDetailProps {
  id: number
  isOpenId: number | null
  setIsOpenId: (num: number | null) => void
  nftDescriptionProps: NFTDescriptionProps
  nftArtistProps: NFTArtistProps
  nftUsageProps: NFTUsageProps
  nftBuyProps: NFTBuyProps
}

export const NFTDetail = ({
  id,
  isOpenId,
  setIsOpenId,
  nftDescriptionProps,
  nftArtistProps,
  nftUsageProps,
  nftBuyProps,
}: NFTDetailProps) => {
  const translate = useContentful(ContentTypes.common)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )

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
      <NFTUsage {...nftUsageProps} />
      <NFTBuy {...nftBuyProps} />
    </>
  )
  return (
    <Drawer
      anchor="right"
      open={id === isOpenId}
      onClose={() => setIsOpenId(null)}
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
          onClick={() => setIsOpenId(null)}
        />
      </Box>
      {isMobile ? (
        <Stack sx={{ backgroundColor: 'neutral.400', gap: '80px' }}>
          {content}
        </Stack>
      ) : (
        <HorizontalScroll reverseScroll={true}>{content}</HorizontalScroll>
      )}
    </Drawer>
  )
}
