import { verifyMessage } from 'viem'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, POSTGRES_KEY_ALREADY_EXISTS_ERROR_CODE } from '../../../database'
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
    return res.status(405).json({
      message: 'Bad HTTP method.',
    })
  }

  const { data, signature }: RequestData = req.body
  if (
    data.task_group_name === nftTestnetSmartContractAddress &&
    process.env.NEXT_PUBLIC_TESTNET !== 'true'
  ) {
    return res.status(400).json({
      message: 'This task is completable only on testnet.',
    })
  }

  const verification = await verifyMessage({
    address: data.eth_address,
    message: JSON.stringify(data),
    signature,
  })

  if (verification !== true) {
    return res.status(403).json({
      message: "Message signature doesn't match.",
    })
  }

  if (data.task_id === StaticTask.BUY_ALL_NFTS) {
    const nfts = await getNfts()
    if (!nfts) {
      return res.status(500).json({
        message: 'Error getting NFT data from CMS.',
      })
    }
    const collectionNfts = nfts
      .filter((nft) => nft.collection.fields.id === data.task_group_name)
      .map((nft) => nft.tokenAddress?.toLowerCase())
    if (collectionNfts.some((nft) => nft == null)) {
      return res.status(500).json({
        message: 'Not all NFTs have filled out token addresses.',
      })
    }
    const userNfts = await alchemy.nft.getNftsForOwner(data.eth_address, {
      contractAddresses: collectionNfts as string[],
    })
    const userOwnsAllNfts = (collectionNfts as string[]).every(
      (collectionNft) =>
        userNfts.ownedNfts.some(
          (userNft) => userNft.contract.address === collectionNft
        )
    )
    if (!userOwnsAllNfts) {
      return res.status(500).json({
        message: 'User does not own all NFTs from this collection.',
      })
    }
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
