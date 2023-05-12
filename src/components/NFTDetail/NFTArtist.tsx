import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
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
import { NFTDividerLine } from './NFTDividerLine'
import TypographyWithTooltips from '../TypographyWithTooltips'

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
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(breakpoint)
  )
  const margin = isMobile ? 'auto' : 0

  return (
    <>
      <Stack
        sx={{
          width: { mobile: '100w', tabletM: '80vw' },
          backgroundColor: 'neutral.400',
          overflowY: 'auto',
          paddingY: { mobile: 5, [breakpoint]: 10 },
          paddingX: { mobile: 2, [breakpoint]: 10 },
          gap: { mobile: 3, [breakpoint]: 5 },
        }}
      >
        <Typography variant="caption">{translate('aboutArtist')}</Typography>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          gap={{ mobile: 3, [breakpoint]: 4 }}
        >
          <Box sx={{ width: '168px', height: '168px', margin: margin }}>
            <CardMedia component="img" image={imageUrl} alt={name} />
          </Box>
          <Stack
            justifyContent="space-between"
            m={margin}
            gap={isMobile ? 3 : 0}
          >
            <Typography variant="headline" m={margin}>
              {name}
            </Typography>
            <NFTArtistSocialMedias {...socialLinks} />
          </Stack>
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} gap="32px">
          <TypographyWithTooltips
            variant="body2"
            text={descriptionLeft}
            key={`${name} description left`}
          />
          <TypographyWithTooltips
            variant="body2"
            text={descriptionRight}
            key={`${name} description right`}
          />
        </Stack>
      </Stack>
    </>
  )
}
