import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  Box,
  CardMedia,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import {
  NFTArtistSocialMedias,
  NFTArtistSocialMediasProps,
} from './NFTArtistSocialMedias'
import { VerticalLine } from './NFTVerticalLine'

export interface NFTArtistProps {
  name: string
  imageUrl: string
  socialLinks: NFTArtistSocialMediasProps
  descriptionLeft: string
  descriptionRight: string
}

export const NFTArtist = ({
  imageUrl,
  name,
  socialLinks,
  descriptionLeft,
  descriptionRight,
}: NFTArtistProps) => {
  const translate = useContentful(ContentTypes.collectionsPage)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  const margin = isMobile ? 'auto' : 0

  return (
    <>
      <Stack
        sx={{ width: '100vw', backgroundColor: 'neutral.400' }}
        p={{ mobile: '16px', tabletM: '80px' }}
        gap="40px"
      >
        <Typography variant="caption">{translate('aboutArtist')}</Typography>
        <Stack direction={isMobile ? 'column' : 'row'} gap="32px">
          <Box sx={{ width: '250px', height: '250px', margin: margin }}>
            <CardMedia component="img" image={imageUrl} alt={name} />
          </Box>
          <Stack
            justifyContent="space-between"
            m={margin}
            gap={isMobile ? '24px' : 0}
          >
            <Typography variant="headline" m={margin}>
              {name}
            </Typography>
            <NFTArtistSocialMedias {...socialLinks} />
          </Stack>
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} gap="32px">
          <Typography variant="body2">{descriptionLeft}</Typography>
          <Typography variant="body2">{descriptionRight}</Typography>
        </Stack>
      </Stack>
      <VerticalLine />
    </>
  )
}
