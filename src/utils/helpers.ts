import { SUBPAGES } from '@/consts'
import { Nft } from 'alchemy-sdk'
import { Content, ContentTypes } from './hooks/useContentful'

export const compareNfts = (nft1: Nft, nft2: Nft): boolean => {
  return (
    nft1.contract.address === nft2.contract.address &&
    nft1.tokenId === nft2.tokenId
  )
}

export const formatAddress = (address: string) => {
  if (address.length <= 8) return address
  return address.slice(0, 4) + '....' + address.slice(address.length - 4)
}

export const getSubpagesKeys = () => {
  return Object.keys(SUBPAGES) as (keyof typeof SUBPAGES)[]
}

export const formatDate = (date: string, locale: any) => {
  return new Date(date).toLocaleDateString(locale, { dateStyle: 'medium' })
}

export const formatCategories = (categories: string[]) => {
  return categories.map((category) =>
    category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
}
