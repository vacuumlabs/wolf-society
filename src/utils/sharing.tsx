import { NFTData } from './hooks/useContentful'
import TwitterIcon from '@/components/icons/TwitterIcon'
import EmailIcon from '@/components/icons/EmailIcon'
import FacebookIcon from '@/components/icons/FacebookIcon'
import { SUBPAGES, WEBPAGE_DOMAIN } from '@/consts'

export type SocialMedia = 'twitter' | 'facebook' | 'email'
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
        `https://twitter.com/intent/tweet?text=${content.text}&url=${content.link}`,
        '_blank',
        'noreferrer'
      )
      break
    case 'facebook':
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${content.link}`,
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
      `${WEBPAGE_DOMAIN}${SUBPAGES.collections}?nft=${nftData.id}`
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
