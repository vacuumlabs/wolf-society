import { splitSignature, verifyMessage } from 'ethers/lib/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, POSTGRES_KEY_ALREADY_EXISTS_ERROR_CODE } from '../../../database'

type RequestData = {
  data: {
    eth_address: string
    task_id: number
    task_group_name: string
  }
  signature: string
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

  const signatureObject = splitSignature(signature)

  const verification =
    verifyMessage(JSON.stringify(data), signatureObject) === data.eth_address

  if (verification !== true) {
    return res.status(403).json({
      message: "Message signature doesn't match.",
    })
  }

  // Check if user is already in DB
  const user = await db
    .selectFrom('app_user')
    .select('eth_address')
    .where('eth_address', '=', data.eth_address)
    .executeTakeFirst()

  // If not, save the user
  if (user == null) {
    try {
      await db
        .insertInto('app_user')
        .columns(['eth_address'])
        .values({
          eth_address: data.eth_address,
        })
        .execute()
    } catch (error) {
      return res.status(500).json({
        message: 'Error saving user.',
      })
    }
  }

  try {
    await db
      .insertInto('completed_task')
      .columns(['task_group_name', 'task_id', 'completed_by'])
      .values({
        task_group_name: data.task_group_name,
        task_id: data.task_id,
        completed_by: data.eth_address,
      })
      .execute()
  } catch (error) {
    if ((error as any).code === POSTGRES_KEY_ALREADY_EXISTS_ERROR_CODE) {
      return res.status(400).json({
        message: 'Task already completed.',
      })
    }

    return res.status(500).json({
      message: 'Error saving user.',
    })
  }

  return res.json({
    message: 'success',
  })
}
