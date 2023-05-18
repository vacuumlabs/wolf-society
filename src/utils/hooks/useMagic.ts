import { useEffect, useState } from 'react'
import { Magic } from 'magic-sdk'
import { useAccount } from 'wagmi'

export const useMagic = (): Magic | null => {
  const [magic, setMagic] = useState<Magic | null>(null)
  const { address, connector } = useAccount()

  useEffect(() => {
    setMagic(
      new Magic(process.env.NEXT_PUBLIC_MAGIC_CONNECT_API_KEY as string, {
        network:
          process.env.NEXT_PUBLIC_TESTNET === 'true' ? 'goerli' : 'mainnet',
      })
    )
  }, [address, connector])

  return magic
}
