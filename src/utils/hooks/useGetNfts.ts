import { alchemy } from '@/alchemy'
import { Nft } from 'alchemy-sdk'
import { useEffect, useState } from 'react'

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
