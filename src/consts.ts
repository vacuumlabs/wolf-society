import { Content, ContentTypes } from './utils/hooks/useContentful'

export const ourCollectionsAddresses: string[] = [
  '0x7dfd5e56dd343140b3d0823d55fdfde8203a729f',
]

export const SUBPAGES: {
  [key in keyof Partial<Content[ContentTypes.navbar]>]: string
} = {
  about: '/',
  collections: '/collections',
  blog: '/blog',
}
