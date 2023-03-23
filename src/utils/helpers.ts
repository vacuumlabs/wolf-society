import { SUBPAGES } from '@/consts'
import { Nft } from 'alchemy-sdk'
import { Content, ContentTypes } from './hooks/useContentful'

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