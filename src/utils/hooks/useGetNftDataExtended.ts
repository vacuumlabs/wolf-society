import { useEffect, useState } from 'react'
import { NFTData } from './useContentful'
import { useGetNfts } from './useGetNfts'
import { useAccount } from 'wagmi'

export type NFTDataExtended = NFTData & { owned: boolean }

export const useGetNftDataExtended = (
  nftsData: NFTData[] | null
): NFTDataExtended[] => {
  const [nftsDataExtended, setNftsDataExtended] = useState<NFTDataExtended[]>(
    nftsData?.map((nftData) => {
      return { ...nftData, owned: false }
    }) ?? []
  )
  const userAccount = useAccount()
  const userNfts = useGetNfts(userAccount.address)

  useEffect(() => {
    setNftsDataExtended(
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

  return nftsDataExtended
}
