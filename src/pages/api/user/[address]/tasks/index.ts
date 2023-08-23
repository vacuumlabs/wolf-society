import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../../database'
import { sql } from 'kysely'
import { StaticTask } from '@/consts'

export type TaskRow = {
  id: StaticTask
  taskGroupName: string
  isCompleted: boolean
  rewardAmount: number
  active: boolean
}

type SuccessData = {
  tasks: TaskRow[]
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
      't.active',
      sql<boolean>`CASE WHEN ct.completed_by = ${eth_address} THEN TRUE ELSE FALSE END`.as(
        'is_completed'
      ),
    ])
    .execute()

  res.json({
    tasks: tasks.map(
      ({ reward_amount, id, task_group_name, is_completed, active }) => ({
        id: id,
        taskGroupName: task_group_name,
        isCompleted: is_completed,
        rewardAmount: reward_amount,
        active: active,
      })
    ),
  })
}
