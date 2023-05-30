import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { TaskData } from './useContentful'
import { TaskRow } from '@/types'

export type TaskDataWithCompletion = TaskData & {
  isCompleted: boolean
}

export const useGetTasksDataWithCompletion = (tasksData: TaskData[] | null) => {
  const [tasksDataWithCompletion, setTasksDataWithCompletion] = useState<
    TaskDataWithCompletion[] | undefined
  >(undefined)
  const { address } = useAccount()

  useEffect(() => {
    const fetchTasks = async (address: string) => {
      const res = await fetch(`/api/user/${address}/tasks`)
      const { tasks, message } = await res.json()
      if (message) {
        console.error("Failed to get user's tasks", message)
      } else {
        setTasksDataWithCompletion(
          tasksData?.map((taskData) => {
            return {
              ...taskData,
              isCompleted: !!(tasks as TaskRow[]).find(
                ({ id }) => id === taskData.id
              )?.isCompleted,
            }
          }) ?? []
        )
      }
    }

    if (address == null) {
      return undefined
    }

    fetchTasks(address)
  }, [address, tasksData])

  return tasksDataWithCompletion
}
