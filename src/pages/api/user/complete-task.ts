import { verifyMessage } from 'viem'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  db,
  POSTGRES_KEY_ALREADY_EXISTS_ERROR_CODE,
  saveUserIfNotSaved,
} from '../../../database'
import { StaticTask, nftTestnetSmartContractAddress } from '@/consts'
import { getNfts } from '@/utils/hooks/useContentful'
import { alchemy } from '@/utils/configs/alchemy'

type RequestData = {
  data: {
    eth_address: `0x${string}`
    task_id: number
    task_group_name: string
  }
  signature: `0x${string}`
}

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Bad HTTP method.',
    })
    return
  }

  const { data, signature } = req.body as RequestData
  if (
    data.task_group_name === nftTestnetSmartContractAddress &&
    process.env.NEXT_PUBLIC_TESTNET !== 'true'
  ) {
    res.status(400).json({
      message: 'This task is completable only on testnet.',
    })
    return
  }

  const verification = await verifyMessage({
    address: data.eth_address,
    message: JSON.stringify(data),
    signature,
  })

  if (!verification) {
    res.status(403).json({
      message: "Message signature doesn't match.",
    })
    return
  }

  try {
    const isTaskActive = await db
      .selectFrom('task')
      .select(['active'])
      .where('task_group_name', '=', data.task_group_name)
      .where('id', '=', data.task_id)
      .executeTakeFirst()

    if (isTaskActive == null || !isTaskActive.active) {
      res.status(400).json({
        message: "Can't complete inactive task!",
      })
      return
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error checking task active status.',
    })
    return
  }

  if (data.task_id === StaticTask.BUY_ALL_NFTS) {
    const nfts = await getNfts()
    if (!nfts) {
      res.status(500).json({
        message: 'Error getting NFT data from CMS.',
      })
      return
    }
    const collectionNfts = nfts
      .filter(
        (nft) =>
          nft.collection?.fields != null &&
          nft.collection.fields.id === data.task_group_name
      )
      .map((nft) => nft.tokenAddress?.toLowerCase())
    if (collectionNfts.some((nft) => nft == null)) {
      res.status(500).json({
        message: 'Not all NFTs have filled out token addresses.',
      })
      return
    }
    const userNfts = await alchemy.nft.getNftsForOwner(data.eth_address, {
      contractAddresses: collectionNfts as string[],
    })
    const userOwnsAllNfts = (collectionNfts as string[]).every(
      (collectionNft) =>
        userNfts.ownedNfts.some(
          (userNft) =>
            userNft.contract.address.toLowerCase() ===
            collectionNft.toLowerCase()
        )
    )
    if (!userOwnsAllNfts) {
      res.status(500).json({
        message: 'User does not own all NFTs from this collection.',
      })
      return
    }
  }

  const userSaved = await saveUserIfNotSaved(db, data.eth_address)

  if (!userSaved) {
    res.status(500).json({
      message: 'Error saving user.',
    })
    return
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
      res.status(400).json({
        message: 'Task already completed.',
      })
      return
    }

    res.status(500).json({
      message: 'Error saving user.',
    })
    return
  }

  res.json({
    message: 'success',
  })
}
