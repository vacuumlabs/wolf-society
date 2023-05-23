import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../../database'
import { sql } from 'kysely'
import { TaskDB } from '@/types'

type SuccessData = {
  tasks: TaskDB[]
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

  const tasks = await db
    .selectFrom('task as t')
    .leftJoin('completed_task as ct', (join) =>
      join
        .onRef('t.id', '=', 'ct.task_id')
        .onRef('t.task_group_name', '=', 'ct.task_group_name')
        .on('ct.completed_by', '=', eth_address)
    )
    .select([
      't.task_group_name',
      't.id',
      't.reward_amount',
      sql<boolean>`CASE WHEN ct.completed_by = ${eth_address} THEN TRUE ELSE FALSE END`.as(
        'is_completed'
      ),
    ])
    .execute()

  return res.json({
    tasks: tasks.map(({ reward_amount, id, is_completed }) => ({
      id: id,
      isCompleted: is_completed,
      rewardAmount: reward_amount,
    })),
  })
}
