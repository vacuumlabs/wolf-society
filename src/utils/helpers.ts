import { SUBPAGES, lazyPayableClaimContractAddress } from '@/consts'
import { ethers } from 'ethers'
import { alchemy } from './configs/alchemy'
import { ERC721LazyPayableClaimAbi } from '@/abi/ERC721LazyPayableClaim'

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

export const getNftMintedAmount = async (
  tokenAddress: string,
  instanceId: number
) => {
  const lazyPayableClaimInterface = new ethers.utils.Interface(
    ERC721LazyPayableClaimAbi
  )
  const response = await alchemy.core.call({
    to: lazyPayableClaimContractAddress,
    data: lazyPayableClaimInterface.encodeFunctionData('getClaim', [
      tokenAddress,
      instanceId,
    ]),
  })
  const result = lazyPayableClaimInterface.decodeFunctionResult(
    'getClaim',
    response
  )
  return result[0].total
}
