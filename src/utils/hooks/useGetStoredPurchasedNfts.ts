import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { NFTData } from './useContentful'
import { useGetNfts } from './useGetNfts'
import { isNotNull } from '../helpers'

export type StoredNftData = {
  tokenAddress: string
  tokenId: number
  stored: boolean
}

type ApiResponseData = {
  nfts: { token_address: string; token_id: number }[] | undefined
  message: string | undefined
}

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
      const { nfts, message } = (await res.json()) as ApiResponseData

      if (nfts == null || message) {
        console.error("Failed to get user's NFT purchases", message ?? '')
        return
      }

      const storedOwnedNfts = ownedNfts.map((nft) => ({
        tokenAddress: nft.contract.address,
        tokenId: Number.parseInt(nft.tokenId),
        stored: nfts.some(
          (storedNft) =>
            storedNft.token_address.toLowerCase() ===
              nft.contract.address.toLowerCase() &&
            storedNft.token_id === Number.parseInt(nft.tokenId)
        ),
      }))

      setStoredNftData(storedOwnedNfts)
    }

    if (address == null) {
      return undefined
    }

    fetchStoredNfts(address)
  }, [address, cmsNftData, ownedNfts, refetch])

  return storedNftData
}
