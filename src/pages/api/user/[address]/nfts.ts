import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'

type SuccessData = {
  nfts: {
    token_address: string
    token_id: number
  }[]
}

type ErrorData = {
  message: string
}

export type ResponseData = SuccessData | ErrorData

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const eth_address = req.query.address

  if (typeof eth_address !== 'string') {
    res.status(400).json({
      message: 'No ETH address provided.',
    })
    return
  }

  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'Bad HTTP method.',
    })
    return
  }

  const nfts = await db
    .selectFrom('nft_purchase')
    .select(['token_address', 'token_id'])
    .where('nft_purchase.purchased_by', '=', eth_address)
    .execute()

  res.json({ nfts })
}
