import { Asset } from 'contentful'
import { createContext, useContext } from 'react'
import contentful from '../configs/contentful'
import { getNftMintedAmount } from '../helpers'

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
}

export type ProjectData = {
  id: string
  name: string
  image: Asset
  description: string
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
  deadline: string
  numberOfPieces: number
  image: Asset
  artistName: string
  artistSubtext: string
  artistImage: Asset
}

export type NFTDetailData = {
  buyNftAndSupport: string
  buyWithCard: string
  buyWithCrypto: string
}

export type NFTArtistData = {
  id: string
  artistName: string
  artistImage: Asset
  artistDescLeft: string
  artistDescRight: string
  nftDesc: string
  artistTwitter: string
  artistIG: string
  artistWeb: string
  artistMotto: string
}

export type NFTData = {
  id: string
  collectionId: string
  tokenId: number
  name: string
  priceInEth: number
  totalSupply?: number
  image: Asset
  artistName: string
  artistImage: Asset
  artistDescLeft: string
  artistDescRight: string
  nftDesc: string
  artistsTwitter: string
  artistsIG: string
  artistsWeb: string
  artist: {
    fields: NFTArtistData
  }
  minted: number
}

export type CollectionsPageData = {
  description: string
  pieces: string
  available: string
  aboutArtist: string
  artImpactTitle: string
  artImpactSubtitle1: string
  artImpactSubtitle2: string
  artImpactText1: string
  artImpactText2: string
  artImpactHeadline: string
  viewArtworks: string
  getCompleteCollection: string
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
}

// Content to be injected into every page
const SHARED_CONTENT: ContentTypes[] = [
  ContentTypes.navbar,
  ContentTypes.common,
]

export type Content = {
  [ContentTypes.navbar]: {
    about: string
    collections: string
    blog: string
    email: string
    makeImpact: string
    launchApp: string
    faq: string
    account: string
    discordLink: string
    twitterLink: string
  }
  [ContentTypes.common]: {
    secondsShort: string
    minutesShort: string
    hoursShort: string
    daysShort: string
    pieces: string
    minted: string
    limitedEdition: string
    makeImpactButton: string
    readMore: string
    showDetails: string
    allocationPart1: string
    allocationPart2: string
    allocationPart3: string
    connectWallet: string
    disconnectWallet: string
  }
  [ContentTypes.landingPage]: {
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
  }
  [ContentTypes.collectionsPage]: CollectionsPageData
  [ContentTypes.articlesPage]: {
    articles: string
    readMore: string
    exploreMore: string
    gratefulPart1: string
    gratefulPart2: string
  }
  [ContentTypes.accountPage]: AccountPageData
  [ContentTypes.project]: ProjectData
  [ContentTypes.roadmap]: RoadmapData
  [ContentTypes.questionAndAnswer]: QuestionAndAnswerData
  [ContentTypes.collection]: CollectionData
  [ContentTypes.nft]: NFTData
  [ContentTypes.nftDetail]: NFTDetailData
  [ContentTypes.nftArtist]: NFTArtistData
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

export const getNfts = async (locale?: string) => {
  const nftsData = await getArrayOfContent<NFTData>({
    contentType: ContentTypes.nft,
    locale,
    orderBy: 'fields.id',
  })
  if (!nftsData) return nftsData
  return await Promise.all(
    nftsData.map(async (nftData) => {
      return { ...nftData, minted: await getNftMintedAmount(nftData.tokenId) }
    })
  )
}

export const ContentContext = createContext<Content | undefined>(undefined)

export const useContentful = <T extends ContentTypes>(contentType: T) => {
  const content = useContext(ContentContext)
  return (key: keyof Content[T]) => content?.[contentType]?.[key] ?? key
}
