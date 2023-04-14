import { Box, IconButton, Stack, Theme, useMediaQuery } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LanguageIcon from '@mui/icons-material/Language'

export interface NFTArtistSocialMediasProps {
  twitterURL?: string
  igUrl?: string
  webUrl?: string
}

export const NFTArtistSocialMedias = ({
  twitterURL,
  igUrl,
  webUrl,
}: NFTArtistSocialMediasProps) => (
  <Stack direction="row" m={{ mobile: 'auto', tabletM: 0 }}>
    {twitterURL && (
      <IconButton onClick={() => window.open(twitterURL, '_blank')}>
        <TwitterIcon />
      </IconButton>
    )}
    {igUrl && (
      <IconButton
        onClick={() => window.open(igUrl, '_blank')}
        sx={{ marginLeft: twitterURL ? '-1px' : 0 }}
      >
        <InstagramIcon />
      </IconButton>
    )}
    {webUrl && (
      <IconButton
        onClick={() => window.open(webUrl, '_blank')}
        sx={{ marginLeft: twitterURL || igUrl ? '-1px' : 0 }}
      >
        <LanguageIcon />
      </IconButton>
    )}
  </Stack>
)
