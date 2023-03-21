import { Nft } from 'alchemy-sdk'
import { useEffect, useState } from 'react'
import { alchemy } from '../configs/alchemy'

export const useGetNftsCollections = (
  addresses: string[] | undefined
): Nft[] => {
  const [nfts, setNfts] = useState<Nft[]>([])

  useEffect(() => {
    const fetchNfts = async (addresses: string[]) => {
      let nftsAcc: Nft[] = []

      for (const address of addresses) {
        nftsAcc = nftsAcc.concat(
          (await alchemy.nft.getNftsForContract(address)).nfts
        )
      }

      setNfts(nftsAcc)
    }
    if (addresses) fetchNfts(addresses)
  }, [addresses])

  return nfts
}
