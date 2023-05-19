import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export const useGetGameTokens = () => {
  const [gameTokens, setGameTokens] = useState<number | undefined>(undefined)
  const { address } = useAccount()

  useEffect(() => {
    const fetchBalance = async (address: string) => {
      const res = await fetch(`/api/user/${address}`)
      const { points } = await res.json()

      setGameTokens(points)
    }

    if (address == null) {
      return undefined
    }

    fetchBalance(address)
  }, [address])

  return gameTokens
}
