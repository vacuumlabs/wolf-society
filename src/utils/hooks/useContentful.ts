import { createContext, useContext } from 'react'
import contentful from '../configs/contentful'

export enum ContentTypes {
  navbar = 'navbar',
  common = 'common',
  landingPage = 'landingPage',
  collectionsPage = 'collectionsPage',
  articlesPage = 'articlesPage',
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
  }
  [ContentTypes.common]: {
    secondsShort: string
    minutesShort: string
    hoursShort: string
    daysShort: string
    pieces: string
    makeImpactButton: string
    readMore: string
    allocationPart1: string
    allocationPart2: string
    allocationPart3: string
  }
  [ContentTypes.landingPage]: {
    heroTitle: string
    heroSubtitle: string
    youAreWolfSociety: string
    makeImpact: string
    manifestTitle: string
    manifestContent: string
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
  [ContentTypes.collectionsPage]: {}
  [ContentTypes.articlesPage]: {
    articles: string
    readMore: string
    exploreMore: string
    gratefulPart1: string
    gratefulPart2: string
  }
}

const getSharedContent = async (locale: string = 'en-US') => {
  let result = {}
  for (const sharedContentType of SHARED_CONTENT) {
    const entries = await contentful.getEntries({
      content_type: sharedContentType,
      'fields.locale': locale,
    })
    const entriesEng = await contentful.getEntries({
      content_type: sharedContentType,
      'fields.locale': 'en-US',
    })
    const contentLocalized = await entries.items.reduce(
      (all: Content[typeof sharedContentType], item: any) => ({
        ...all,
        ...item.fields,
      }),
      {}
    )
    const contentEnglish = await entriesEng.items.reduce(
      (all: Content[typeof sharedContentType], item: any) => ({
        ...all,
        ...item.fields,
      }),
      {}
    )
    result = {
      ...result,
      [sharedContentType]: { ...contentEnglish, ...contentLocalized },
    }
  }
  return result
}

export const injectCMSContent = async (
  contentType: ContentTypes,
  locale: string = 'en-US'
) => {
  const entriesLocalized = await contentful.getEntries({
    content_type: contentType,
    'fields.locale': locale,
  })
  const entriesEnglish = await contentful.getEntries({
    content_type: contentType,
    'fields.locale': 'en-US',
  })
  const contentLocalized = await entriesLocalized.items.reduce(
    (all: Content, item: any) => ({ ...all, ...item.fields }),
    {}
  )
  const contentEnglish = await entriesEnglish.items.reduce(
    (all: Content, item: any) => ({ ...all, ...item.fields }),
    {}
  )
  const sharedContent = await getSharedContent(locale)
  return {
    ...sharedContent,
    [contentType]: { ...contentEnglish, ...contentLocalized },
  }
}

export const ContentContext = createContext<Content | undefined>(undefined)

export const useContentful = <T extends ContentTypes>(contentType: T) => {
  const content = useContext(ContentContext)
  return (key: keyof Content[T]) => content?.[contentType]?.[key] ?? key
}
