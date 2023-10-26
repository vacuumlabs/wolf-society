import { SUBPAGES, lazyPayableClaimContractAddress } from '@/consts'
import { ERC721LazyPayableClaimAbi } from '@/abi/ERC721LazyPayableClaim'
import { getPublicClient } from '@wagmi/core'
import { Address } from 'wagmi'

export const formatAddress = (address: string) => {
  if (address.length <= 8) return address
  return address.slice(0, 4) + '....' + address.slice(address.length - 4)
}

export const getSubpagesKeys = () => {
  return Object.keys(SUBPAGES) as (keyof typeof SUBPAGES)[]
}

export const formatDate = (date: string, locale: string) => {
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
  tokenAddress: Address,
  instanceId: number
) => {
  const publicClient = getPublicClient()

  const response = await publicClient.readContract({
    address: lazyPayableClaimContractAddress,
    abi: ERC721LazyPayableClaimAbi,
    functionName: 'getClaim',
    args: [tokenAddress, BigInt(instanceId)],
  })

  return response.total
}

export const isNotNull = <T>(value: T | null | undefined): value is T =>
  value != null

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const isObjectWithProperty = <T extends string>(
  obj: unknown,
  propName: T
): obj is Record<string, unknown> & {
  [key in T]: unknown
} => isObject(obj) && propName in obj

export const addProtocolToUrl = (url: string) =>
  url.startsWith('//') ? `https:${url}` : url
