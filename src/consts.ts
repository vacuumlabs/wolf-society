import { StaticImageData } from 'next/image'
import { Content, ContentTypes } from './utils/hooks/useContentful'
import allocationArtistsImage from 'public/images/allocationArtists.png'
import allocationDevelopmentImage from 'public/images/allocationDevelopment.png'
import allocationProjectsImage from 'public/images/allocationProjects.png'

/**
 * Matches the custom markdown tooltip syntax in the form:
 * `*inline text*(tooltip text)`
 */
export const tooltipCustomMarkdownRegex =
  /(\*([^*]*)\*\(((?:[^()]*|\((?:[^()]*|\([^()]*\))*\))*)\))/g

export const ourCollectionsAddresses: string[] = [
  '0x7dfd5e56dd343140b3d0823d55fdfde8203a729f',
]

export const SUBPAGES: {
  [key in keyof Pick<Content[ContentTypes.navbar], 'about' | 'collections' | 'blog' | 'faq' | 'account'>]: string
} = {
  about: '/',
  collections: '/art-impact',
  blog: '/blog',
  faq: '/faq',
  account: '/account',
}

export const SECTIONS = {
  about: {
    roadmap: {
      id: 'roadmap',
      href: '/#roadmap',
    },
  },
}

export const ALLOCATION_INFO: {
  percentage: string
  textKey: keyof Content[ContentTypes.common]
  image: StaticImageData
}[] = [
  {
    percentage: '70',
    textKey: 'allocationPart1',
    image: allocationProjectsImage,
  },
  {
    percentage: '20',
    textKey: 'allocationPart2',
    image: allocationDevelopmentImage,
  },
  {
    percentage: '10',
    textKey: 'allocationPart3',
    image: allocationArtistsImage,
  },
]
