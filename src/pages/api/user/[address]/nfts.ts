import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'

export type GetNftsSuccessResponseData = {
  success: true
  nfts: {
    token_address: string
    token_id: number
  }[]
}

export type GetNftsErrorResponseData = {
  success: false
  message: string
}

export type GetNftsResponseData =
  | GetNftsSuccessResponseData
  | GetNftsErrorResponseData

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetNftsResponseData>
) {
  const eth_address = req.query.address

  if (typeof eth_address !== 'string') {
    res.status(400).json({
      success: false,
      message: 'No ETH address provided.',
    })
    return
  }

  if (req.method !== 'GET') {
    res.status(405).json({
      success: false,
      message: 'Bad HTTP method.',
    })
    return
  }

  const nfts = await db
    .selectFrom('nft_purchase')
    .select(['token_address', 'token_id'])
    .where('nft_purchase.purchased_by', '=', eth_address)
    .execute()

  res.json({ success: true, nfts })
}
