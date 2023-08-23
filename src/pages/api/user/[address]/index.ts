import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'

type SuccessData = {
  address: string
  points: number
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

  const user = await db
    .selectFrom('app_user')
    .select(['reward_points'])
    .where('app_user.eth_address', '=', eth_address)
    .executeTakeFirst()

  user != null
    ? res.json({
        address: eth_address,
        points: user.reward_points,
      })
    : res.json({
        address: eth_address,
        points: 0,
      })
}
