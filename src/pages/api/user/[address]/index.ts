import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'

type GetUserSuccessResponseData = {
  address: string
  points: number
  success: true
}

type GetUserErrorResponseData = {
  message: string
  success: false
}

export type GetUserResponseData =
  | GetUserSuccessResponseData
  | GetUserErrorResponseData

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetUserResponseData>
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

  const user = await db
    .selectFrom('app_user')
    .select(['reward_points'])
    .where('app_user.eth_address', '=', eth_address)
    .executeTakeFirst()

  res.json({
    success: true,
    address: eth_address,
    points: user?.reward_points ?? 0,
  })
}
