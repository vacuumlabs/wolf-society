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
  const userNfts = useGetNfts(userAccount.address)

  useEffect(() => {
    setNftsDataWithOwnership(
      nftsData?.map((nft) => {
        return {
          ...nft,
          owned: !!userNfts.find((userNft) => {
            return userNft.tokenId === nft.tokenId?.toString()
          }),
        }
      }) ?? []
    )
  }, [userNfts, nftsData])

  return nftsDataWithOwnership
}
