import { createContext, useContext } from 'react'
import contentful from '../configs/contentful'

type Translations = {
  welcome: string
  wolfSocietyFoundation: string
  updates: string
  blog: string
  disconnect: string
  connect: string
  close: string
  donate: string
  support: string
}

export type Translator = (key: keyof Translations) => string

export const injectTranslations = async (locale: string = 'en-US') => {
  const entries = await contentful.getEntries({
    content_type: 'translations',
    'fields.locale': locale,
  })
  const entriesEng = await contentful.getEntries({
    content_type: 'translations',
    'fields.locale': 'en-US',
  })
  const translations = await entries.items.reduce(
    (all: Translations, item: any) => ({ ...all, ...item.fields }),
    {}
  )
  const translationsEng = await entriesEng.items.reduce(
    (all: Translations, item: any) => ({ ...all, ...item.fields }),
    {}
  )
  return { ...translationsEng, ...translations }
}

export const TranslationsContext = createContext<Translations | undefined>(
  undefined
)

export const useTranslations = () => {
  const translations = useContext(TranslationsContext)
  return (key: keyof Translations) => translations?.[key] ?? key
}
