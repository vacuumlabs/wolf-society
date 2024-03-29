import { NFTData } from './hooks/useContentful'
import TwitterIcon from '@/components/icons/TwitterIcon'
import EmailIcon from '@/components/icons/EmailIcon'
import FacebookIcon from '@/components/icons/FacebookIcon'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import {
  FACEBOOK_DOMAIN,
  LINKEDIN_DOMAIN,
  SUBPAGES,
  TWITTER_DOMAIN,
  WEBPAGE_DOMAIN,
} from '@/consts'

export type SocialMedia = 'twitter' | 'facebook' | 'email' | 'linkedin'
export type ShareableContent = { text: string; link: string; image?: unknown }

export const socialMediaListData: Partial<
  Record<SocialMedia, { icon: JSX.Element }>
> = {
  twitter: {
    icon: <TwitterIcon />,
  },
  facebook: {
    icon: <FacebookIcon />,
  },
  linkedin: {
    icon: <LinkedInIcon />,
  },
  email: {
    icon: <EmailIcon />,
  },
}

export const shareContentOnSocialMedia = (
  content: ShareableContent,
  socialMedia: SocialMedia
) => {
  switch (socialMedia) {
    case 'twitter':
      window.open(
        `${TWITTER_DOMAIN}/intent/tweet?text=${content.text}&url=${content.link}`,
        '_blank',
        'noreferrer'
      )
      break
    case 'facebook':
      window.open(
        `${FACEBOOK_DOMAIN}/sharer/sharer.php?u=${content.link}`,
        '_blank',
        'noreferrer'
      )
      break
    case 'linkedin':
      window.open(
        `${LINKEDIN_DOMAIN}/sharing/share-offsite/?url=${content.link}`,
        '_blank',
        'noreferrer'
      )
      break
    case 'email':
      window.open(
        `mailto:?body=${content.text}%20${content.link}`,
        '_blank',
        'noreferrer'
      )
      break
  }
}

export const getNftShareableContent = (cmsText: string, nftData: NFTData) => {
  const text = cmsText.replace('{name}', nftData.name)
  return {
    text,
    image: nftData.image.fields.file.url,
    link: encodeURIComponent(
      `${WEBPAGE_DOMAIN}${SUBPAGES.collections}/${nftData.id}`
    ),
  }
}

export const getCollectionShareableContent = (
  cmsText: string,
  name: string,
  id: string
): ShareableContent => {
  const text = cmsText.replace('{name}', name)
  return {
    text,
    link: encodeURIComponent(`${WEBPAGE_DOMAIN}${SUBPAGES.collections}#${id}`),
  }
}
