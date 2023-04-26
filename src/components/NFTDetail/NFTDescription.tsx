import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  Box,
  CardMedia,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Countdown } from '../Countdown'
import dynamic from 'next/dynamic'

const DynamicShareButton = dynamic(
  () => import('../collections/ShareButton').then((mod) => mod.ShareButton),
  { ssr: false }
)

export interface NFTDescriptionProps {
  name: string
  deadline: Date | undefined
  totalPieces: number | undefined
  soldPieces: number | undefined
  descriptionText: string
  imageUrl: string
}

export const NFTDescription = ({
  name,
  totalPieces,
  soldPieces,
  deadline,
  descriptionText,
  imageUrl,
}: NFTDescriptionProps) => {
  const translate = useContentful(ContentTypes.collectionsPage)
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
        <Box mx={{ mobile: '16px', tabletM: '80px' }}>
          <CardMedia component="img" image={imageUrl} alt={name} />
        </Box>
      </Box>
      <Stack
        sx={{
          width: { mobile: '100%', tabletM: '45%' },
          padding: { mobile: '16px', tabletM: '80px' },
        }}
        gap={5}
      >
        <Stack gap={isMobile ? 3 : 4} mb={isMobile ? 5 : 0}>
          <Typography variant="headline" fontWeight={600} mt={isMobile ? 3 : 0}>
            {name}
          </Typography>
          <Stack>
            {totalPieces && soldPieces && (
              <Stack direction="row" mb={1}>
                <Typography variant="caption" color="neutral.700">{`${translate(
                  'pieces'
                )}: `}</Typography>
                <Typography variant="caption">{`${soldPieces}/${totalPieces}`}</Typography>
              </Stack>
            )}
            {deadline && (
              <Stack gap="8px">
                <Stack direction="row">
                  <Typography
                    variant="caption"
                    color="neutral.700"
                  >{`${translate('available')}: `}</Typography>
                  <Typography variant="caption">
                    <Countdown deadline={deadline} />
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
          <DynamicShareButton />
        </Stack>
        <Stack gap="8px">
          <Typography variant="body2">{descriptionText}</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
