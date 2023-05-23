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

export const nftTestnetSmartContractAddress =
  '0x6c5a72a30ab18A013307A514133144bBcac1f61d'

export const nftSmartContractAddress =
  '0x6c5a72a30ab18A013307A514133144bBcac1f61d'

export const COLLECTIONS_COLOR_ORDER: string[] = [
  'common.blue',
  'secondary.main',
  'common.brown',
  'black.main',
]

export const lazyPayableClaimContractAddress = process.env.NEXT_PUBLIC_TESTNET
  ? '0x73CA7420625d312d1792Cea60Ced7B35D009322c'
  : '0x'

export const manifoldTxFee = 500000000000000

export const nullAddress = '0x0000000000000000000000000000000000000000'

export const MAGIC_WALLET_USER_REJECTED_ACTION_MESSAGE =
  'User rejected the action'
export const METAMASK_USER_DENIED_SIGNATURE_DETAILS =
  'MetaMask Personal Message Signature: User denied message signature.'

export const WEBPAGE_DOMAIN = 'https://wolfsociety.org'

export const TASKS_GROUP_NAME_SITEWIDE = 'sitewide'

export const SUBPAGES: {
  [key in keyof Pick<
    Content[ContentTypes.navbar],
    'about' | 'collections' | 'blog' | 'faq' | 'account'
  >]: string
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
  BUY_ALL_NFTS,
  JOIN_DISCORD,
  TURN_ON_DISCORD_NOTIFICATIONS,
  FOLLOW_TWITTER,
  TURN_ON_TWITTER_NOTIFICATIONS,
  RETWEET_TWITTER,
  FOLLOW_MEDIUM,
  SUBSCRIBE_MEDIUM,
  SUBSCRIBE_NEWSLETTER,
}
