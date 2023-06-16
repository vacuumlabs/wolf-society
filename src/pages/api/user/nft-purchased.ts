import { verifyMessage } from 'viem'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  db,
  POSTGRES_KEY_ALREADY_EXISTS_ERROR_CODE,
  saveUserIfNotSaved,
} from '@/database'
import { getNfts } from '@/utils/hooks/useContentful'
import { alchemy } from '@/utils/configs/alchemy'

type RequestData = {
  data: {
    eth_address: `0x${string}`
    token_address: `0x${string}`
    token_id: number
  }
  signature: `0x${string}`
}

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Bad HTTP method.',
    })
  }

  const { data, signature }: RequestData = req.body
  const { eth_address, token_address, token_id } = data

  const verification = await verifyMessage({
    address: eth_address,
    message: JSON.stringify(data),
    signature,
  })

  if (verification !== true) {
    return res.status(403).json({
      message: "Message signature doesn't match.",
    })
  }

  const ourNfts = await getNfts()
  if (!ourNfts) {
    return res.status(500).json({
      message: 'Error getting NFT data from CMS.',
    })
  }

  const isProvidedNftOurs = ourNfts.some(
    ({ tokenAddress }) =>
      token_address.toLowerCase() === tokenAddress?.toLowerCase()
  )

  if (!isProvidedNftOurs) {
    return res.status(422).json({
      message: "Provided Token Address doesn't match a Wolf Society NFT.",
    })
  }

  const ownedNftsForGivenTokenAddress = await alchemy.nft.getNftsForOwner(
    eth_address,
    {
      contractAddresses: [token_address],
    }
  )

  if (ownedNftsForGivenTokenAddress.totalCount < 1) {
    return res.status(422).json({
      message: 'Provided NFT not owned (address mismatch).',
    })
  }

  const specificNft = ownedNftsForGivenTokenAddress.ownedNfts.find(
    (nft) => Number.parseInt(nft.tokenId) === token_id
  )

  if (specificNft == null) {
    return res.status(422).json({
      message: 'Provided NFT not owned (id mismatch).',
    })
  }

  // Must be != null due to earlier check
  const nftPrice = ourNfts.find(
    (it) => it.tokenAddress?.toLowerCase() === token_address.toLowerCase()
  )!.priceInEth
  const tokensToAward = Math.floor(nftPrice * 1000)

  const userSaved = await saveUserIfNotSaved(db, eth_address)

  if (!userSaved) {
    return res.status(500).json({
      message: 'Error saving user.',
    })
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
    if ((error as any).code === POSTGRES_KEY_ALREADY_EXISTS_ERROR_CODE) {
      return res.status(500).json({
        message: 'Tokens for NFT purchase can only be claimed once!',
      })
    }

    return res.status(500).json({
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
    return res.status(500).json({
      message: 'Error crediting tokens for NFT purchase.',
    })
  }

  return res.json({
    message: 'success',
  })
}
