import { SUBPAGES } from '@/consts'
import { Nft } from 'alchemy-sdk'
import { Content, ContentTypes } from './hooks/useContentful'
import { RefObject, useEffect, useMemo, useState } from 'react'

export const compareNfts = (nft1: Nft, nft2: Nft): boolean => {
  return (
    nft1.contract.address === nft2.contract.address &&
    nft1.tokenId === nft2.tokenId
  )
}

export const getSubpagesKeys = () => {
  return Object.keys(SUBPAGES) as (keyof Partial<
    Content[ContentTypes.navbar]
  >)[]
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
