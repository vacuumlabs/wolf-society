import { useEffect, useState } from 'react'
import { NFTData } from './useContentful'
import { useGetNfts } from './useGetNfts'
import { useAccount } from 'wagmi'

export type NFTDataWithOwnership = NFTData & { owned: boolean }

export const useGetNftDataWithOwnership = (
  nftsData: NFTData[] | null
): NFTDataWithOwnership[] => {
  const [nftsDataWithOwnership, setNftsDataWithOwnership] = useState<
    NFTDataWithOwnership[]
  >(
    nftsData?.map((nftData) => {
      return { ...nftData, owned: false }
    }) ?? []
  )
  const userAccount = useAccount()
  const nftsAddresses = (nftsData
    ?.map((nftData) => nftData.tokenAddress)
    ?.filter((address) => address != null) ?? []) as `0x${string}`[]
  const userNfts = useGetNfts(userAccount.address, nftsAddresses)

  useEffect(() => {
    setNftsDataWithOwnership(
      nftsData?.map((nft) => {
        return {
          ...nft,
          owned: !!userNfts.find((userNft) => {
            return (
              userNft.contract.address.toLowerCase() ===
              (nft.tokenAddress ?? '').toLowerCase()
            )
          }),
        }
      }) ?? []
    )
  }, [userNfts, nftsData])

  return nftsDataWithOwnership
}
