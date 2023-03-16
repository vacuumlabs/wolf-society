import { createContext, useContext } from 'react'
import contentful from '../configs/contentful'

export type Translations = {
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
    locale,
  })
  const translations = await entries.items.reduce(
    (all: Translations, item: any) => ({ ...all, ...item.fields }),
    {}
  )
  return translations
}

export const TranslationsContext = createContext<Translations | undefined>(
  undefined
)

export const useTranslations = () => {
  const translations = useContext(TranslationsContext)
  return (key: keyof Translations) => translations?.[key] ?? key
}
