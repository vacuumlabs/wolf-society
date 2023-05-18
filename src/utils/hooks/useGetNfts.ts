import { nftSmartContractAddress } from '@/consts'
import { Nft } from 'alchemy-sdk'
import { useEffect, useState } from 'react'
import { alchemy } from '../configs/alchemy'

export const useGetNfts = (address: string | undefined): Nft[] => {
  const [nfts, setNfts] = useState<Nft[]>([])

  useEffect(() => {
    const fetchNfts = async (address: string) => {
      setNfts(
        (
          await alchemy.nft.getNftsForOwner(address, {
            contractAddresses: [nftSmartContractAddress],
          })
        ).ownedNfts
      )
    }
    if (address) fetchNfts(address)
  }, [address])

  return nfts
}
