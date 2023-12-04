import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { TaskData } from './useContentful'
import { TASKS_GROUP_NAME_SITEWIDE } from '@/consts'
import type { GetTasksResponseData } from '@/pages/api/user/[address]/tasks'

export type TaskDataWithCompletion = TaskData & {
  isCompleted: boolean
  isActive: boolean
  rewardAmount: number | undefined
}

export const useGetTasksDataWithCompletion = (tasksData: TaskData[] | null) => {
  const [tasksDataWithCompletion, setTasksDataWithCompletion] =
    useState<TaskDataWithCompletion[]>()
  const { address } = useAccount()

  useEffect(() => {
    const fetchTasks = async (address: string) => {
      const res = await fetch(`/api/user/${address}/tasks`)
      const responseData = (await res.json()) as GetTasksResponseData

      if (!responseData.success) {
        console.error("Failed to get user's tasks", responseData.message)
      } else {
        setTasksDataWithCompletion(
          tasksData?.map((taskData) => {
            const taskDataGroupName =
              taskData.nftOrCollection == null
                ? TASKS_GROUP_NAME_SITEWIDE
                : 'nftDesc' in taskData.nftOrCollection.fields
                ? taskData.nftOrCollection.fields.tokenAddress
                : taskData.nftOrCollection.fields.id

            const thisTask = responseData.tasks.find(
              ({ id, taskGroupName }) =>
                id === taskData.databaseId &&
                taskGroupName === taskDataGroupName
            )

            return {
              ...taskData,
              isActive: !!thisTask?.active,
              isCompleted: !!thisTask?.isCompleted,
              rewardAmount: thisTask?.rewardAmount,
            }
          }) ?? []
        )
      }
    }

    if (address) {
      fetchTasks(address)
    }
  }, [address, tasksData])

  return tasksDataWithCompletion
}
