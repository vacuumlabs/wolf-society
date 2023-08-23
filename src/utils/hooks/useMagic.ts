import { useEffect, useState } from 'react'
import { Magic } from 'magic-sdk'
import { useAccount } from 'wagmi'
import { strict as assert } from 'assert'

export const useMagic = (): Magic | null => {
  const [magic, setMagic] = useState<Magic | null>(null)
  const { address, connector } = useAccount()

  const magicApiKey = process.env.NEXT_PUBLIC_MAGIC_CONNECT_API_KEY
  assert(magicApiKey, 'NEXT_PUBLIC_MAGIC_CONNECT_API_KEY is not set')

  useEffect(() => {
    setMagic(
      new Magic(magicApiKey, {
        network:
          process.env.NEXT_PUBLIC_TESTNET === 'true' ? 'goerli' : 'mainnet',
      })
    )
  }, [address, connector, magicApiKey])

  return magic
}
