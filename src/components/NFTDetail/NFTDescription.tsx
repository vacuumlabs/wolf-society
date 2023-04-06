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
import { VerticalLine } from './NFTVerticalLine'

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
  const elementWidth = isMobile ? '100%' : '50%'
  return (
    <Stack
      sx={{ width: '100vw', backgroundColor: 'neutral.400' }}
      direction={isMobile ? 'column' : 'row'}
    >
      <Box
        width={elementWidth}
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
          width: elementWidth,
          padding: { mobile: '16px', tabletM: '80px' },
        }}
        gap={'88px'}
      >
        <Stack gap="32px">
          <Typography variant="headline" fontWeight={600}>
            {name}
          </Typography>
          <Stack>
            {totalPieces && soldPieces && (
              <Stack direction="row">
                <Typography variant="caption" color="neutral.700">{`${translate(
                  'pieces'
                )}: `}</Typography>
                <Typography variant="caption">{`${soldPieces}/${totalPieces}`}</Typography>
              </Stack>
            )}
            {deadline && (
              <Stack>
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
        </Stack>
        <Stack gap="8px">
          <Typography variant="caption">{translate('description')}</Typography>
          <Typography variant="body2">{descriptionText}</Typography>
        </Stack>
      </Stack>
      <VerticalLine />
    </Stack>
  )
}
