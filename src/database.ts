import { createKysely } from '@vercel/postgres-kysely'
import { ColumnType, Generated } from 'kysely'

interface AppUserTable {
  eth_address: string
  reward_points: Generated<ColumnType<number, number, never>>
  created_at: Generated<ColumnType<Date, never, never>>
}

interface TaskGroupTable {
  name: string
}

interface TaskTable {
  id: number
  task_group_name: string
  reward_amount: number
}

interface CompletedTaskTable {
  task_group_name: string
  task_id: number
  completed_by: string
  completed_at: Generated<ColumnType<Date, never, never>>
}

export interface Database {
  app_user: AppUserTable
  task_group: TaskGroupTable
  task: TaskTable
  completed_task: CompletedTaskTable
}

/**
 * DO NOT IMPORT IN CLIENT FACING CODE!
 */
export const db = createKysely<Database>()

export const POSTGRES_KEY_ALREADY_EXISTS_ERROR_CODE = '23505'
