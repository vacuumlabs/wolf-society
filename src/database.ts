import { createKysely } from '@vercel/postgres-kysely'
import { ColumnType, Generated, Kysely } from 'kysely'

interface AppUserTable {
  eth_address: string
  reward_points: Generated<number>
  created_at: ColumnType<Date, never, never>
}

interface TaskGroupTable {
  name: string
}

interface TaskTable {
  id: number
  task_group_name: string
  reward_amount: number
  active: boolean
}

interface CompletedTaskTable {
  task_group_name: string
  task_id: number
  completed_by: string
  completed_at: ColumnType<Date, never, never>
}

interface NftPurchaseTable {
  purchased_by: string
  token_address: string
  token_id: number
}

export interface Database {
  app_user: AppUserTable
  task_group: TaskGroupTable
  task: TaskTable
  completed_task: CompletedTaskTable
  nft_purchase: NftPurchaseTable
}

/**
 * DO NOT IMPORT IN CLIENT FACING CODE!
 */
export const db = createKysely<Database>()

export const POSTGRES_KEY_ALREADY_EXISTS_ERROR_CODE = '23505'

export const saveUserIfNotSaved = async (
  db: Kysely<Database>,
  eth_address: string
): Promise<boolean> => {
  // Check if user is already in DB
  const user = await db
    .selectFrom('app_user')
    .select('eth_address')
    .where('eth_address', '=', eth_address)
    .executeTakeFirst()

  // If not, save the user
  if (user == null) {
    try {
      await db
        .insertInto('app_user')
        .columns(['eth_address'])
        .values({
          eth_address: eth_address,
        })
        .execute()
    } catch (error) {
      return false
    }
  }
  return true
}
