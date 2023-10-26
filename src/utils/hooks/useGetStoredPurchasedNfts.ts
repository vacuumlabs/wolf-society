import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { NFTData } from './useContentful'
import { useGetNfts } from './useGetNfts'
import { isNotNull } from '../helpers'
import type {
  GetNftsResponseData,
  GetNftsSuccessResponseData,
} from '@/pages/api/user/[address]/nfts'
import { Nft } from 'alchemy-sdk'

export type StoredNftData = {
  tokenAddress: string
  tokenId: number
  stored: boolean
}

const getIsNftStored = (data: GetNftsSuccessResponseData, nft: Nft) =>
  data.nfts.some(
    (storedNft) =>
      storedNft.token_address.toLowerCase() ===
        nft.contract.address.toLowerCase() &&
      storedNft.token_id === Number.parseInt(nft.tokenId)
  )

export const useGetStoredPurchasedNfts = (
  cmsNftData: NFTData[] | null,
  refetch: number
) => {
  const [storedNftData, setStoredNftData] = useState<
    StoredNftData[] | undefined
  >(undefined)
  const { address } = useAccount()

  const nftAddresses =
    cmsNftData?.map((nftData) => nftData.tokenAddress)?.filter(isNotNull) ?? []
  const ownedNfts = useGetNfts(address, nftAddresses)

  useEffect(() => {
    const fetchStoredNfts = async (address: string) => {
      const res = await fetch(`/api/user/${address}/nfts`)
      const responseData = (await res.json()) as GetNftsResponseData

      if (!responseData.success) {
        console.error(
          "Failed to get user's NFT purchases",
          responseData.message
        )
        return
      }

      const storedOwnedNfts = ownedNfts.map((nft) => ({
        tokenAddress: nft.contract.address,
        tokenId: Number.parseInt(nft.tokenId),
        stored: getIsNftStored(responseData, nft),
      }))

      setStoredNftData(storedOwnedNfts)
    }

    if (address) {
      fetchStoredNfts(address)
    }
  }, [address, cmsNftData, ownedNfts, refetch])

  return storedNftData
}
