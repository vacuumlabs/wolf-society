import { Nft } from 'alchemy-sdk'

export const compareNfts = (nft1: Nft, nft2: Nft): boolean => {
  return (
    nft1.contract.address === nft2.contract.address &&
    nft1.tokenId === nft2.tokenId
  )
}
