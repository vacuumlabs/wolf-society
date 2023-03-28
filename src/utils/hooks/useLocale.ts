import { createContext, useContext } from 'react'

export const LocaleContext = createContext('en-US')

export const useLocale = () => {
  const content = useContext(LocaleContext)
  return content
}
