import { IconButton, Stack } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YoutubeIcon from '@mui/icons-material/YouTube'
import DiscordIcon from '../icons/DiscordIcon'
import LinktreeIcon from '../icons/LinktreeIcon'
import TwitterIcon from '../icons/TwitterIcon'
import InstagramIcon from '../icons/InstagramIcon'
import FacebookIcon from '../icons/FacebookIcon'
import WebIcon from '../icons/WebIcon'
import EmailIcon from '../icons/EmailIcon'

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
      component: <WebIcon />,
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
              key={`social-media-${index}`}
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
