import {
  Content,
  ContentTypes,
  useContentful,
} from '@/utils/hooks/useContentful'
import {
  Box,
  Drawer,
  Stack,
  Typography,
  Divider,
  BreakpointOverrides,
} from '@mui/material'
import CloseIcon from '../icons/CloseIcon'
import TaskCompleteIcon from '../icons/TaskCompleteIcon'
import TaskNotCompleteIcon from '../icons/TaskNotCompleteIcon'
import IconButton from '../IconButton'
import Button from '../Button'
import { CollectionDataExtended } from './Collection'
import { TaskDataWithCompletion } from '@/utils/hooks/useGetTasksDataWithCompletion'
import { useEffect, useRef, useState } from 'react'
import {
  MEDIUM_DOMAIN,
  SUBPAGES,
  StaticTask,
  TASKS_GROUP_NAME_SITEWIDE,
  TWITTER_DOMAIN,
} from '@/consts'
import { getAccount, getWalletClient } from '@wagmi/core'
import { enqueueSnackbar } from 'notistack'
import {
  SocialMedia,
  getCollectionShareableContent,
  getNftShareableContent,
  shareContentOnSocialMedia,
} from '@/utils/sharing'

type Props = {
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void
  drawerOpened: boolean
  collectionData: CollectionDataExtended
  collectionIsComplete: boolean
}

const ExtraRewardsDrawer = ({
  onClose,
  drawerOpened,
  collectionData,
  collectionIsComplete,
}: Props) => {
  const translate = useContentful(ContentTypes.accountPage)
  const translateCommon = useContentful(ContentTypes.common)
  const translateNavbar = useContentful(ContentTypes.navbar)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const [completingTask, _setCompletingTask] =
    useState<TaskDataWithCompletion | null>(null)
  const [completingTaskLast, _setCompletingTaskLast] =
    useState<TaskDataWithCompletion | null>(null)
  const completingTaskRef = useRef(completingTask)
  const completingTaskLastRef = useRef(completingTask)
  const setCompletingTask = (task: TaskDataWithCompletion | null) => {
    completingTaskRef.current = task
    _setCompletingTask(task)
  }
  const setCompletingTaskLast = (task: TaskDataWithCompletion | null) => {
    completingTaskLastRef.current = task
    _setCompletingTaskLast(task)
  }

  const postToCompleteTaskApi = async (task: TaskDataWithCompletion) => {
    const { address } = getAccount()
    const taskGroupName = task.nftOrCollection
      ? 'nftDesc' in task.nftOrCollection.fields
        ? task.nftOrCollection.fields.tokenAddress
        : task.nftOrCollection.fields.id
      : TASKS_GROUP_NAME_SITEWIDE
    const data = {
      eth_address: address,
      task_id: task.id,
      task_group_name: taskGroupName,
    }

    const walletClient = await getWalletClient()
    let signature: `0x${string}` | undefined
    try {
      signature = await walletClient?.signMessage({
        message: JSON.stringify(data),
      })
    } catch (err) {
      console.error(err)
    }
    if (!signature) return { message: translate('messageNotSignedError') }
    return fetch(`/api/user/complete-task`, {
      method: 'POST',
      body: JSON.stringify({
        data,
        signature,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const startCompletingTask = async (task: TaskDataWithCompletion) => {
    setCompletingTaskLast(completingTaskRef.current)
    setCompletingTask(null)
    const response = await postToCompleteTaskApi(task)
    if (response && 'status' in response && response.status === 200) {
      const completingTaskLastCurrent = completingTaskLastRef.current
      if (completingTaskLastCurrent) {
        completingTaskLastCurrent.isCompleted = true
      }
      setCompletingTaskLast(null)
    } else {
      const errorMessage =
        'message' in response
          ? response.message
          : translateCommon('genericErrorMessage')
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      })
    }
  }

  const actionButtonDisabledState = (task: TaskDataWithCompletion): boolean => {
    if (task.taskType === 'Buy all NFTs in a Collection')
      return !collectionIsComplete
    if (task.id === StaticTask.RETWEET_TWITTER)
      return translate('tweetIdToRetweet') === 'tweetIdToRetweet'
    const taskNftOrCollection = task.nftOrCollection?.fields
    if (taskNftOrCollection && 'nftDesc' in taskNftOrCollection) {
      const nftOwned = collectionData.nfts.find(
        (nft) => nft.id === taskNftOrCollection.id
      )?.owned
      return !nftOwned
    }
    return false
  }

  const guideToTask = async (task: TaskDataWithCompletion) => {
    setCompletingTask(task)
    if (task.taskType != null) {
      if (task.taskType === 'Buy all NFTs in a Collection') {
        await startCompletingTask({ ...task, id: StaticTask.BUY_ALL_NFTS })
        return
      }
      let socialMedia: SocialMedia | undefined
      switch (task.taskType) {
        case 'Share on Facebook':
          socialMedia = 'facebook'
          break
        case 'Share on Twitter':
          socialMedia = 'twitter'
          break
        case 'Share on LinkedIn':
          socialMedia = 'linkedin'
          break
      }
      const nftOrCollection = task.nftOrCollection?.fields
      if (socialMedia && nftOrCollection) {
        let content
        if ('nftDesc' in nftOrCollection) {
          content = getNftShareableContent(
            translateCommon('nftShareText'),
            collectionData.nfts.filter(
              (nft) => nft.id === nftOrCollection.id
            )[0]
          )
        } else {
          content = getCollectionShareableContent(
            translateCommon('collectionShareText'),
            collectionData.name,
            collectionData.id
          )
        }
        shareContentOnSocialMedia(content, socialMedia)
      }
      return
    }
    switch (task.id) {
      case StaticTask.JOIN_DISCORD:
        window.open(translateNavbar('discordLink'), '_blank')
        break
      case StaticTask.FOLLOW_TWITTER:
        window.open(
          `${TWITTER_DOMAIN}/intent/follow?screen_name=${translateNavbar(
            'twitterAccount'
          )}`,
          '_blank'
        )
        break
      case StaticTask.TURN_ON_TWITTER_NOTIFICATIONS:
        window.open(
          `${TWITTER_DOMAIN}/${translateNavbar('twitterAccount')}`,
          '_blank'
        )
        break
      case StaticTask.RETWEET_TWITTER:
        window.open(
          `${TWITTER_DOMAIN}/intent/retweet?tweet_id=${translate(
            'tweetIdToRetweet'
          )}`,
          '_blank'
        )
        break
      case StaticTask.FOLLOW_MEDIUM:
      case StaticTask.SUBSCRIBE_MEDIUM:
        window.open(
          `${MEDIUM_DOMAIN}/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`,
          '_blank'
        )
        break
      case StaticTask.SUBSCRIBE_NEWSLETTER:
        window.open(`${SUBPAGES.about}#newsletter`, '_blank')
        break
    }
  }

  const formatTaskText = (task: TaskDataWithCompletion) => {
    return task.text.replaceAll(
      '{nft.name}',
      task.nftOrCollection?.fields.name ?? ''
    )
  }

  useEffect(() => {
    const listener = async function (event: FocusEvent) {
      const completingTaskCurrent = completingTaskRef.current
      if (completingTaskCurrent != null) {
        await startCompletingTask(completingTaskCurrent)
      }
    }
    window.addEventListener('focus', listener, false)
    return () => {
      window.removeEventListener('focus', listener)
    }
  }, [])

  return (
    <Drawer
      anchor="right"
      open={drawerOpened}
      onClose={onClose}
      PaperProps={{
        sx: (theme) => ({
          overflowY: 'hidden',
          backgroundColor: theme.palette.neutral[400],
          width: {
            mobile: 'inherit',
            desktopS: '50%',
          },
        }),
      }}
    >
      <Stack direction="column" sx={{ overflowY: 'auto' }}>
        <Box
          position="absolute"
          left={0}
          right={0}
          bgcolor="neutral.400"
          p={2}
          zIndex={1}
        >
          <Stack justifyContent="end" direction="row">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>
        <Stack py={10} px={{ mobile: 3, [breakpoint]: 10 }} gap={3}>
          <Typography variant="caption">
            {translate('unlockExtraRewardsTitle')}
          </Typography>
          <Typography variant="body1">
            {translate('unlockExtraRewardsDescription')}
          </Typography>
          <Stack>
            {collectionData.tasks.map((task) => (
              <Box key={formatTaskText(task)}>
                <Stack
                  direction={{ mobile: 'column', [breakpoint]: 'row' }}
                  justifyContent="space-between"
                  alignItems="center"
                  py={3}
                  gap={2}
                >
                  <Stack direction="row" alignItems="center" gap={2}>
                    {task.isCompleted ? (
                      <TaskCompleteIcon />
                    ) : (
                      <TaskNotCompleteIcon />
                    )}
                    <Typography variant="body2">
                      {formatTaskText(task)}
                    </Typography>
                  </Stack>
                  {!task.isCompleted && (
                    <Button
                      sx={{ whiteSpace: 'nowrap' }}
                      onClick={() => {
                        guideToTask(task)
                      }}
                      disabled={actionButtonDisabledState(task)}
                    >
                      {translateCommon(
                        task.buttonLabel as keyof Content[ContentTypes.common]
                      )}
                    </Button>
                  )}
                </Stack>
                <Divider />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  )
}

export default ExtraRewardsDrawer
