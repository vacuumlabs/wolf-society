import { Asset } from 'contentful'
import { createContext, useContext } from 'react'
import contentful from '../configs/contentful'
import { getNftMintedAmount } from '../helpers'
import { nftTestnetInstanceId, nftTestnetSmartContractAddress } from '@/consts'

export enum ContentTypes {
  navbar = 'navbar',
  common = 'common',
  landingPage = 'landingPage',
  collectionsPage = 'collectionsPage',
  articlesPage = 'articlesPage',
  accountPage = 'accountPage',
  project = 'project',
  roadmap = 'roadmap',
  questionAndAnswer = 'questionAndAnswer',
  collection = 'collection',
  nft = 'nft',
  nftDetail = 'nftDetail',
  nftArtist = 'nftArtist',
  task = 'task',
  taskTexts = 'taskTexts',
}

export type ProjectData = {
  id: string
  name: string
  image: Asset
  description: string
  location: string
  project: string
  timeFrame: string
  partnerLogo: Asset
}

export type RoadmapData = {
  id: string
  quarter: string
  year: string
  items: string
}

export type QuestionAndAnswerData = {
  id: string
  orderNumber: number
  question: string
  answer: string
}

export type CollectionData = {
  id: string
  name: string
  description: string
  deadline?: string
  numberOfPieces?: number
  image: Asset
}

export type NFTDetailData = {
  buyNftAndSupport: string
  buyWithCard: string
  buyWithCrypto: string
  buyNft: string
  beatTheDrumTitle: string
  beatTheDrumSubtitle: string
  breadAndButterTitle: string
  breadAndButterSubtitle: string
  shareYourImpact: string
}

export type NFTArtistData = {
  id: string
  artistName: string
  artistImage: Asset
  artistDescLeft: string
  artistDescRight?: string
  artistMotto: string
  artistTwitter: string
  artistInstagram: string
  artistWeb: string
  artistFacebook: string
  artistLinkedIn: string
  artistDiscord: string
  artistYoutube: string
  artistEmail: string
  artistLinktree: string
}

export type NFTData = {
  id: string
  collection: {
    fields?: CollectionData
  }
  name: string
  priceInEth: number
  totalSupply?: number
  image: Asset
  nftDesc: string
  artist: {
    fields: NFTArtistData
  }
  beatTheDrumList: string
  breadAndButterList: string
  minted: number
  tokenAddress?: `0x${string}`
  manifoldLink?: string
  instanceId?: number
}

export type TaskData = {
  id: string
  databaseId: number
  text: string
  taskText:
    | 'buyAllNfts'
    | 'joinDiscord'
    | 'followTwitter'
    | 'turnOnTwitterNotifications'
    | 'retweet'
    | 'followMedium'
    | 'subscribeMedium'
    | 'subscribeNewsletter'
    | 'shareNftOnTwitter'
    | 'shareNftOnFacebook'
    | 'shareNftOnLinkedIn'
  buttonLabel: string
  nftOrCollection?: {
    fields: NFTData | CollectionData
  }
  taskType?: 'Share on Twitter' | 'Share on Facebook' | 'Share on LinkedIn'
}

export type TaskTextsData = {
  buyAllNfts: string
  joinDiscord: string
  followTwitter: string
  turnOnTwitterNotifications: string
  retweet: string
  followMedium: string
  subscribeMedium: string
  subscribeNewsletter: string
  shareNftOnTwitter: string
  shareNftOnFacebook: string
  shareNftOnLinkedIn: string
}

export type CollectionsPageData = {
  description: string
  pieces: string
  aboutArtist: string
  artImpactTitle: string
  artImpactSubtitle1: string
  artImpactSubtitle2: string
  artImpactText1: string
  artImpactText2: string
  artImpactHeadline: string
  viewArtworks: string
}

export type AccountPageData = {
  yourContribution: string
  yourRewards: string
  gameTokens: string
  distribute: string
  claimRewards: string
  playGame: string
  artworks: string
  collections: string
  complete: string
  noArtworks: string
  unlockRewardsQuest: string
  unlockRewardsButton: string
  unlockExtraRewardsTitle: string
  unlockExtraRewardsDescription: string
  messageNotSignedError: string
  tweetIdToRetweet: string
  earn: string
  youOwnXOfY: string
  nftRewardDialogTitle: string
  nftRewardDialogText: string
  nftRewardDialogButtonText: string
  nftPurchaseRewardClaimed: string
  availableFor: string
}

export type NavbarData = {
  about: string
  collections: string
  blog: string
  email: string
  makeImpact: string
  launchApp: string
  faq: string
  account: string
  discordLink: string
  twitterAccount: string
}

export type CommonData = {
  secondsShort: string
  minutesShort: string
  hoursShort: string
  daysShort: string
  pieces: string
  minted: string
  limitedEdition: string
  timeLeft: string
  makeImpactButton: string
  readMore: string
  showDetails: string
  allocationPart1: string
  allocationPart2: string
  allocationPart3: string
  connectWallet: string
  disconnectWallet: string
  nftShareText: string
  collectionShareText: string
  share: string
  follow: string
  join: string
  subscribe: string
  turnOn: string
  retweet: string
  complete: string
  genericErrorMessage: string
  newsletterText: string
  newsletterInputLabel: string
  newsletterButton: string
  newsletterSubscriptionSuccess: string
  newsletterSubscriptionError: string
  newsletterSubscriptionConflict: string
}

export type LandingPageData = {
  heroTitle: string
  heroSubtitle: string
  youAreWolfSociety: string
  makeImpact: string
  manifestTitle1: string
  manifestTitle2: string
  manifestTitle3: string
  manifestTitle4: string
  manifestContent1: string
  manifestContent2: string
  manifestContent3: string
  manifestContent4: string
  supportedProjects: string
  allProjects: string
  makeImpactText: string
  readMore: string
  makeItHappen: string
  makeItHappenText: string
  haveFun: string
  haveFunText: string
  haveFunDrawerContent: string
  breadAndButter: string
  breadAndButterText: string
  breadAndButterDrawerContent: string
  showCollection: string
  questions: string
  articles: string
  allArticles: string
  roadmap: string
  partners: string
  newsletterText: string
  newsletterInputLabel: string
  newsletterButton: string
  newsletterSubscriptionSuccess: string
  newsletterSubscriptionError: string
  newsletterSubscriptionConflict: string
  location: string
  project: string
  timeFrame: string
  projectEndorsedBy: string
}

export type ArticlesPageData = {
  articles: string
  readMore: string
  exploreMore: string
  gratefulPart1: string
  gratefulPart2: string
}

// Content to be injected into every page
const SHARED_CONTENT: ContentTypes[] = [
  ContentTypes.navbar,
  ContentTypes.common,
]

export type Content = {
  [ContentTypes.navbar]: NavbarData
  [ContentTypes.common]: CommonData
  [ContentTypes.landingPage]: LandingPageData
  [ContentTypes.collectionsPage]: CollectionsPageData
  [ContentTypes.articlesPage]: ArticlesPageData
  [ContentTypes.accountPage]: AccountPageData
  [ContentTypes.project]: ProjectData
  [ContentTypes.roadmap]: RoadmapData
  [ContentTypes.questionAndAnswer]: QuestionAndAnswerData
  [ContentTypes.collection]: CollectionData
  [ContentTypes.nft]: NFTData
  [ContentTypes.nftDetail]: NFTDetailData
  [ContentTypes.nftArtist]: NFTArtistData
  [ContentTypes.task]: TaskData
  [ContentTypes.taskTexts]: TaskTextsData
}

/**
 * Fetches array of contents of certain content type, matched by id
 * @param contentType Content Type to get entries for
 * @param locale Locale to localize for, if it exists. Located as field 'locale' on the Content Type
 * @param orderBy String parameter for the query to order results by. If you want descending order, prefix with a minus. E.g. '-fields.id'
 * @returns Array of content
 */
export const getArrayOfContent = async <T>({
  contentType,
  locale = 'en-US',
  orderBy,
  query = {},
}: {
  contentType: ContentTypes
  locale?: string
  orderBy?: string
  query?: any
}): Promise<T[] | null> => {
  if (!contentful) return null
  const entriesLocalized = await contentful.getEntries<T>({
    ...query,
    content_type: contentType,
    'fields.locale': locale,
    order: orderBy,
  })
  const entriesEnglish = await contentful.getEntries<T>({
    ...query,
    content_type: contentType,
    'fields.locale': 'en-US',
    order: orderBy,
  })
  const content = entriesEnglish.items.reduce((all: T[], item: any) => {
    let fields = item.fields
    const itemLocalized = entriesLocalized.items.filter(
      (content: any) => content.fields.id === item.fields.id
    )
    if (itemLocalized.length > 0) {
      fields = { ...fields, ...itemLocalized[0].fields }
    }
    return all.concat(fields)
  }, [])
  return content
}

export const getTranslations = async (
  contentType: ContentTypes,
  locale: string = 'en-US'
): Promise<Partial<Content>> => {
  if (!contentful) return {}
  let result = {}
  for (const contType of SHARED_CONTENT.concat(contentType)) {
    const entriesLocalized = await contentful.getEntries({
      content_type: contType,
      'fields.locale': locale,
    })
    const entriesEnglish = await contentful.getEntries({
      content_type: contType,
      'fields.locale': 'en-US',
    })
    const contentLocalized = entriesLocalized.items.reduce(
      (all: Partial<Content>, item: any) => ({ ...all, ...item.fields }),
      {}
    )
    const contentEnglish = entriesEnglish.items.reduce(
      (all: Partial<Content>, item: any) => ({ ...all, ...item.fields }),
      {}
    )
    result = {
      ...result,
      [contType]: { ...contentEnglish, ...contentLocalized },
    }
  }
  return result
}

export const getProjects = (locale?: string) =>
  getArrayOfContent<ProjectData>({
    contentType: ContentTypes.project,
    locale,
    orderBy: 'fields.orderNumber',
  })

export const getRoadmap = (locale?: string) =>
  getArrayOfContent<RoadmapData>({
    contentType: ContentTypes.roadmap,
    locale,
    orderBy: 'fields.id',
  })

export const getQuestionsAndAnswers = (locale?: string) =>
  getArrayOfContent<QuestionAndAnswerData>({
    contentType: ContentTypes.questionAndAnswer,
    locale,
    orderBy: 'fields.id',
  })

export const getCollections = (locale?: string) =>
  getArrayOfContent<CollectionData>({
    contentType: ContentTypes.collection,
    locale,
    orderBy: 'fields.orderNumber',
  })

// For testing purposes, use testnet contract address for all NFTs
const changeNftPropertiesIfTestnet = (nftData: NFTData) => {
  return process.env.NEXT_PUBLIC_TESTNET === 'true'
    ? {
        ...nftData,
        tokenAddress: nftTestnetSmartContractAddress,
        instanceId: nftTestnetInstanceId,
      }
    : nftData
}

export const getNfts = async (locale?: string) => {
  const nftsData = await getArrayOfContent<NFTData>({
    contentType: ContentTypes.nft,
    locale,
    orderBy: 'fields.orderNumber',
  })
  if (!nftsData) return nftsData
  return await Promise.all(
    nftsData.map(async (nftDataFromCMS) => {
      const nftData = changeNftPropertiesIfTestnet(nftDataFromCMS)
      return {
        ...nftData,
        minted:
          nftData.tokenAddress && nftData.instanceId
            ? await getNftMintedAmount(nftData.tokenAddress, nftData.instanceId)
            : 0,
      }
    })
  )
}

export const getTasks = async (locale?: string) => {
  const tasksData = await getArrayOfContent<TaskData>({
    contentType: ContentTypes.task,
    locale,
    orderBy: 'fields.id',
  })
  if (!tasksData || process.env.NEXT_PUBLIC_TESTNET !== 'true') return tasksData
  return tasksData.map((taskDataFromCMS) => {
    const nftOrCollectionFields = taskDataFromCMS.nftOrCollection?.fields
    if (
      taskDataFromCMS.nftOrCollection != null &&
      nftOrCollectionFields != null &&
      'nftDesc' in nftOrCollectionFields
    ) {
      taskDataFromCMS.nftOrCollection.fields = changeNftPropertiesIfTestnet(
        nftOrCollectionFields
      )
    }
    return taskDataFromCMS
  })
}

export const ContentContext = createContext<Content | undefined>(undefined)

export const useContentful = <T extends ContentTypes>(contentType: T) => {
  const content = useContext(ContentContext)
  return (key: keyof Content[T]) => content?.[contentType]?.[key] ?? key
}
