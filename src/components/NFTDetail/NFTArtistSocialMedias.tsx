import { IconButton, Stack } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LanguageIcon from '@mui/icons-material/Language'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YoutubeIcon from '@mui/icons-material/Youtube'
import EmailIcon from '@mui/icons-material/Email'
import DiscordIcon from '../icons/DiscordIcon'
import LinktreeIcon from '../icons/LinktreeIcon'

export interface NFTArtistSocialMediasProps {
  twitterUrl?: string
  instagramUrl?: string
  webUrl?: string
  facebookUrl?: string
  linkedInUrl?: string
  discordUrl?: string
  youtubeUrl?: string
  email?: string
  linktreeUrl?: string
}

export const NFTArtistSocialMedias = ({
  twitterUrl,
  instagramUrl,
  webUrl,
  facebookUrl,
  linkedInUrl,
  discordUrl,
  youtubeUrl,
  email,
  linktreeUrl,
}: NFTArtistSocialMediasProps) => {
  const socialMediaComponentsData = [
    {
      value: twitterUrl,
      component: <TwitterIcon />,
    },
    {
      value: instagramUrl,
      component: <InstagramIcon />,
    },
    {
      value: webUrl,
      component: <LanguageIcon />,
    },
    {
      value: facebookUrl,
      component: <FacebookIcon />,
    },
    {
      value: linkedInUrl,
      component: <LinkedInIcon />,
    },
    {
      value: discordUrl,
      component: <DiscordIcon />,
    },
    {
      value: youtubeUrl,
      component: <YoutubeIcon />,
    },
    {
      value: linktreeUrl,
      component: <LinktreeIcon />,
    },
    {
      value: email,
      component: <EmailIcon />,
      prefix: 'mailto:',
    },
  ]
  return (
    <Stack direction="row" m={{ mobile: 'auto', tabletM: 0 }}>
      {socialMediaComponentsData.map((socialMediaComponentData, index) => {
        const href =
          (socialMediaComponentData.prefix ?? '') +
          socialMediaComponentData.value
        return (
          socialMediaComponentData.value && (
            <IconButton
              onClick={() => window.open(href, '_blank')}
              sx={{
                marginLeft: index > 0 ? '-1px' : 0,
                marginRight:
                  index < socialMediaComponentsData.length - 1 ? '-1px' : 0,
              }}
            >
              {socialMediaComponentData.component}
            </IconButton>
          )
        )
      })}
    </Stack>
  )
}
