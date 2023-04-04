import { Asset } from 'contentful'
import { createContext, useContext } from 'react'
import contentful from '../configs/contentful'

export enum ContentTypes {
  navbar = 'navbar',
  common = 'common',
  landingPage = 'landingPage',
  collectionsPage = 'collectionsPage',
  articlesPage = 'articlesPage',
  project = 'project',
  roadmap = 'roadmap',
}

export type ProjectData = {
  id: string
  name: string
  image: Asset
}

export type RoadmapData = {
  id: string
  quarter: string
  year: string
  items: string
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
  [ContentTypes.project]: ProjectData
  [ContentTypes.roadmap]: RoadmapData
}

const getSharedContent = async (locale: string = 'en-US') => {
  if (!contentful) return {}
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
    const contentLocalized = entries.items.reduce(
      (all: Content[typeof sharedContentType], item: any) => ({
        ...all,
        ...item.fields,
      }),
      {}
    )
    const contentEnglish = entriesEng.items.reduce(
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

/**
 * Fetches array of contents of certain content type, matched by id
 * @param contentType Content Type to get entries for
 * @param locale Locale to localize for, if it exists. Located as field 'locale' on the Content Type
 * @param orderBy String parameter for the query to order results by. If you want descending order, prefix with a minus. E.g. '-fields.id'
 * @returns Array of content
 */
export const getArrayOfContent = async <T>(
  contentType: ContentTypes,
  locale: string = 'en-US',
  orderBy?: string
): Promise<T[] | null> => {
  if (!contentful) return null
  const entriesLocalized = await contentful.getEntries<T>({
    content_type: contentType,
    'fields.locale': locale,
    order: orderBy,
  })
  const entriesEnglish = await contentful.getEntries<T>({
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

export const injectCMSContent = async (
  contentType: ContentTypes,
  locale: string = 'en-US'
): Promise<Partial<Content>> => {
  if (!contentful) return {}
  const entriesLocalized = await contentful.getEntries({
    content_type: contentType,
    'fields.locale': locale,
  })
  const entriesEnglish = await contentful.getEntries({
    content_type: contentType,
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
  const sharedContent = await getSharedContent(locale)
  return {
    ...sharedContent,
    [contentType]: { ...contentEnglish, ...contentLocalized },
  }
}

export const getProjects = (locale?: string) =>
  getArrayOfContent<ProjectData>(
    ContentTypes.project,
    locale,
    'fields.orderNumber'
  )

export const getRoadmap = (locale?: string) =>
  getArrayOfContent<RoadmapData>(ContentTypes.roadmap, locale, 'fields.id')

export const ContentContext = createContext<Content | undefined>(undefined)

export const useContentful = <T extends ContentTypes>(contentType: T) => {
  const content = useContext(ContentContext)
  return (key: keyof Content[T]) => content?.[contentType]?.[key] ?? key
}
