import { Nft } from 'alchemy-sdk'
import { useEffect, useState } from 'react'
import { alchemy } from '../configs/alchemy'

export const useGetNfts = (address: string | undefined): Nft[] => {
  if (!address) return []
  const [nfts, setNfts] = useState<Nft[]>([])

  const fetchNfts = async (address: string) => {
    setNfts((await alchemy.nft.getNftsForOwner(address)).ownedNfts)
  }

  useEffect(() => {
    fetchNfts(address)
  }, [])

  return nfts
}
