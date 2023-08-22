import { verifyMessage } from 'viem'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, saveUserIfNotSaved } from '@/database'
import { getNfts } from '@/utils/hooks/useContentful'
import { alchemy } from '@/utils/configs/alchemy'
import { isKeyAlreadyExistError } from '@/utils/api'
import { Address } from 'wagmi'

export type PurchaseNftRequestData = {
  data: {
    eth_address: Address
    token_address: Address
    token_id: number
  }
  signature: `0x${string}`
}

export type PurchaseNftResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PurchaseNftResponseData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Bad HTTP method.',
    })
    return
  }

  const { data, signature } = req.body as PurchaseNftRequestData
  const { eth_address, token_address, token_id } = data

  const verification = await verifyMessage({
    address: eth_address,
    message: JSON.stringify(data),
    signature,
  })

  if (!verification) {
    res.status(403).json({
      message: "Message signature doesn't match.",
    })
    return
  }

  const ourNfts = await getNfts()
  if (!ourNfts) {
    res.status(500).json({
      message: 'Error getting NFT data from CMS.',
    })
    return
  }

  const isProvidedNftOurs = ourNfts.some(
    ({ tokenAddress }) =>
      token_address.toLowerCase() === tokenAddress?.toLowerCase()
  )

  if (!isProvidedNftOurs) {
    res.status(422).json({
      message: "Provided Token Address doesn't match a Wolf Society NFT.",
    })
    return
  }

  const ownedNftsForGivenTokenAddress = await alchemy.nft.getNftsForOwner(
    eth_address,
    {
      contractAddresses: [token_address],
    }
  )

  if (ownedNftsForGivenTokenAddress.totalCount < 1) {
    res.status(422).json({
      message: 'Provided NFT not owned (address mismatch).',
    })
    return
  }

  const specificNft = ownedNftsForGivenTokenAddress.ownedNfts.find(
    (nft) => Number.parseInt(nft.tokenId) === token_id
  )

  if (specificNft == null) {
    res.status(422).json({
      message: 'Provided NFT not owned (id mismatch).',
    })
    return
  }

  // Must be != null due to earlier check
  const nftPrice = ourNfts.find(
    (it) => it.tokenAddress?.toLowerCase() === token_address.toLowerCase()
  )?.priceInEth

  if (nftPrice == null) {
    res.status(500).json({
      message: "Couldn't find token by address",
    })
    return
  }

  const tokensToAward = Math.floor(nftPrice * 1000)

  const userSaved = await saveUserIfNotSaved(db, eth_address)

  if (!userSaved) {
    res.status(500).json({
      message: 'Error saving user.',
    })
    return
  }

  // Award tokens
  try {
    await db
      .insertInto('nft_purchase')
      .values({
        purchased_by: eth_address,
        token_address: token_address,
        token_id: token_id,
      })
      .execute()
  } catch (error) {
    if (isKeyAlreadyExistError(error)) {
      res.status(500).json({
        message: 'Tokens for NFT purchase can only be claimed once!',
      })
      return
    }

    res.status(500).json({
      message: 'Error saving NFT purchase.',
    })
  }

  try {
    await db
      .updateTable('app_user')
      .set(({ bxp }) => ({
        reward_points: bxp('reward_points', '+', tokensToAward),
      }))
      .where('eth_address', '=', eth_address)
      .execute()
  } catch (error) {
    res.status(500).json({
      message: 'Error crediting tokens for NFT purchase.',
    })
    return
  }

  res.json({
    message: 'success',
  })
}
