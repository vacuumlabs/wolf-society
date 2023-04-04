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

export type NftCardProps = {
  name: string
  imageUrl: string
  priceEth: string
  priceFiat: string
  minted: number
  supply: number
}

const NftCard = ({
  name,
  imageUrl,
  priceEth,
  priceFiat,
  minted,
  supply,
}: NftCardProps) => {
  const translate = useContentful(ContentTypes.common)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'
  return (
    <Card
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
        </Box>
        <CardContent sx={{ p: 0, transition: 'translate 0.25s' }}>
          <Stack sx={{ p: 4, textAlign: 'start' }} gap={1}>
            <Typography variant="caption" color="secondary">
              {name}
            </Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="caption">{priceEth}</Typography>
              <Typography variant="body2">{priceFiat}</Typography>
            </Stack>
          </Stack>
          <Button
            component="div"
            sx={{ width: '100%' }}
            endIcon={<ArrowRightIcon />}
          >
            {translate('showDetails')}
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default NftCard
