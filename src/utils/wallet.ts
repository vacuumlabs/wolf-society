import { getWalletClient } from '@wagmi/core'

export const signMessage = async (
  data: Record<string, string | number | undefined>
): Promise<`0x${string}` | undefined> => {
  const walletClient = await getWalletClient()

  try {
    return walletClient?.signMessage({
      message: JSON.stringify(data),
    })
  } catch (err) {
    console.error(err)
  }

  return undefined
}
