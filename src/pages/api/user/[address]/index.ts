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
    return res.status(400).json({
      message: 'No ETH address provided.',
    })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Bad HTTP method.',
    })
  }

  const user = await db
    .selectFrom('app_user')
    .select(['eth_address', 'reward_points'])
    .where('app_user.eth_address', '=', eth_address)
    .executeTakeFirst()

  return user != null
    ? res.json({
        address: user.eth_address,
        points: user.reward_points,
      })
    : res.json({
        address: eth_address,
        points: 0,
      })
}
