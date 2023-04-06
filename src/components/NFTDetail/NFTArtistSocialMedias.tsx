import { Box, Stack, Theme, useMediaQuery } from '@mui/material'
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
}: NFTArtistSocialMediasProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  const margin = isMobile ? 'auto' : 0
  return (
    <Stack direction="row" m={margin}>
      {twitterURL && (
        <TwitterIcon
          onClick={() => window.open(twitterURL, '_blank')}
          fontSize="large"
          sx={{
            height: '50px',
            width: '50px',
            border: 'solid 3px',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        />
      )}
      {igUrl && (
        <InstagramIcon
          onClick={() => window.open(igUrl, '_blank')}
          fontSize="large"
          sx={{
            height: '50px',
            width: '50px',
            border: 'solid 3px',
            borderLeft: twitterURL ? 0 : 'solid 3px',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        />
      )}
      {webUrl && (
        <LanguageIcon
          onClick={() => window.open(webUrl, '_blank')}
          fontSize="large"
          sx={{
            height: '50px',
            width: '50px',
            border: 'solid 3px',
            borderLeft: twitterURL || igUrl ? 0 : 'solid 3px',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        />
      )}
    </Stack>
  )
}
