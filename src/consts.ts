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

export const nftTestnetSmartContractAddress: `0x${string}` =
  '0x81a1419049a6731ab52505da86cf077d850b3fee'

export const nftTestnetInstanceId = 1049684612

export const COLLECTIONS_COLOR_ORDER: string[] = [
  'common.blue',
  'secondary.main',
  'common.brown',
  'black.main',
]

// Address is the same for Mainnet as for Goerli
export const lazyPayableClaimContractAddress =
  process.env.NEXT_PUBLIC_TESTNET !== 'true'
    ? '0x1EB73FEE2090fB1C20105d5Ba887e3c3bA14a17E'
    : '0x074eaee8fc3e4e2b361762253f83d9a94aec6fd4'

export const manifoldTxFee = 500000000000000

export const nullAddress = '0x0000000000000000000000000000000000000000'

export const MAGIC_WALLET_USER_REJECTED_ACTION_MESSAGE =
  'User rejected the action'
export const METAMASK_USER_DENIED_SIGNATURE_DETAILS =
  'MetaMask Personal Message Signature: User denied message signature.'

export const WEBPAGE_DOMAIN = 'https://wolfsociety.org'
export const TWITTER_DOMAIN = 'https://twitter.com'
export const MEDIUM_DOMAIN = 'https://medium.com'
export const FACEBOOK_DOMAIN = 'https://facebook.com'
export const LINKEDIN_DOMAIN = 'https://linkedin.com'

export const TASKS_GROUP_NAME_SITEWIDE = 'sitewide'

export const SUBPAGES: {
  [key in keyof Pick<
    Content[ContentTypes.navbar],
    'about' | 'collections' | 'blog' | 'faq' | 'account'
  > & 'presale']: string
} = {
  about: '/',
  collections: '/art-impact',
  blog: '/blog',
  faq: '/faq',
  account: '/account',
  presale: '/presale',
}

export const SECTIONS = {
  about: {
    roadmap: {
      id: 'roadmap',
      href: '/#roadmap',
    },
    newsletter: {
      id: 'newsletter',
      href: '/#newsletter',
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

export enum StaticTask {
  BUY_ALL_NFTS = 0,
  JOIN_DISCORD = 1,
  FOLLOW_TWITTER = 2,
  TURN_ON_TWITTER_NOTIFICATIONS = 3,
  RETWEET_TWITTER = 4,
  FOLLOW_MEDIUM = 5,
  SUBSCRIBE_MEDIUM = 6,
  SUBSCRIBE_NEWSLETTER = 7,
}
