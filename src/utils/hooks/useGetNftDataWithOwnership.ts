import { useEffect, useState } from 'react'
import { NFTData } from './useContentful'
import { useGetNfts } from './useGetNfts'
import { useAccount } from 'wagmi'
import { isNotNull } from '../helpers'

export type NFTDataWithOwnership = NFTData & { owned: boolean }

export const useGetNftDataWithOwnership = (
  nftsData: NFTData[] | null
): NFTDataWithOwnership[] => {
  const [nftsDataWithOwnership, setNftsDataWithOwnership] = useState<
    NFTDataWithOwnership[]
  >(nftsData?.map((nftData) => ({ ...nftData, owned: false })) ?? [])

  const userAccount = useAccount()
  const nftsAddresses =
    nftsData?.map((nftData) => nftData.tokenAddress)?.filter(isNotNull) ?? []
  const userNfts = useGetNfts(userAccount.address, nftsAddresses)

  useEffect(() => {
    setNftsDataWithOwnership(
      nftsData?.map((nft) => ({
        ...nft,
        owned: !!userNfts.find(
          (userNft) =>
            userNft.contract.address.toLowerCase() ===
            (nft.tokenAddress ?? '').toLowerCase()
        ),
      })) ?? []
    )
  }, [userNfts, nftsData])

  return nftsDataWithOwnership
}
