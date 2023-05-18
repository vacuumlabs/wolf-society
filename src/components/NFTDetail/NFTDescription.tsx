import { NFTData } from '@/utils/hooks/useContentful'
import {
  Box,
  CardMedia,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import dynamic from 'next/dynamic'
import TypographyWithTooltips from '../TypographyWithTooltips'
import { NFTParameters } from './NFTParameters'

const DynamicShareButton = dynamic(
  () => import('../collections/ShareButton').then((mod) => mod.ShareButton),
  { ssr: false }
)

export interface NFTDescriptionProps {
  nftData: NFTData
}

export const NFTDescription = ({ nftData }: NFTDescriptionProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  return (
    <Stack
      sx={{
        width: { mobile: '100vw', tabletM: '90vw' },
        backgroundColor: 'neutral.400',
        maxWidth: '1920px',
      }}
      direction={isMobile ? 'column' : 'row'}
    >
      <Box
        width={{ mobile: '100%', tabletM: '55%' }}
        bgcolor="neutral.600"
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Box mx={{ mobile: 2, tabletM: 10 }} mb={{ mobile: 2, tabletM: 0 }}>
          <CardMedia
            component="img"
            image={nftData.image.fields.file.url}
            alt={nftData.name}
          />
        </Box>
      </Box>
      <Stack
        sx={{
          width: { mobile: '100%', tabletM: '45%' },
          paddingY: { mobile: 5, tabletM: 10 },
          paddingX: { mobile: 2, tabletM: 10 },
          overflowY: 'auto',
        }}
        gap={5}
      >
        <Stack gap={isMobile ? 3 : 4}>
          <Typography variant="headline" fontWeight={600}>
            {nftData.name}
          </Typography>
          <NFTParameters nftData={nftData} />
          <DynamicShareButton />
        </Stack>
        <Stack gap={1}>
          <TypographyWithTooltips
            variant="body2"
            text={nftData.nftDesc}
            key={`${nftData.name} description`}
          ></TypographyWithTooltips>
        </Stack>
      </Stack>
    </Stack>
  )
}
