import { Nft } from 'alchemy-sdk'
import { useEffect, useState } from 'react'
import { alchemy } from '../configs/alchemy'

export const useGetNfts = (
  userAddress: string | undefined,
  nftsAddresses: string[]
): Nft[] => {
  const [nfts, setNfts] = useState<Nft[]>([])

  useEffect(() => {
    const fetchNfts = async (address: string) => {
      setNfts(
        (
          await alchemy.nft.getNftsForOwner(address, {
            contractAddresses: nftsAddresses,
          })
        ).ownedNfts
      )
    }
    if (userAddress) {
      fetchNfts(userAddress)
    } else {
      setNfts([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress, JSON.stringify(nftsAddresses)])

  return nfts
}
