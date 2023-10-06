import { Stack, Typography } from '@mui/material'
import { Countdown } from '../Countdown'
import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { NFTDataWithOwnership } from '@/utils/hooks/useGetNftDataWithOwnership'

type Props = {
  nftData: NFTDataWithOwnership
  alignCenter?: boolean
}

export const NFTParameters = ({ nftData, alignCenter }: Props) => {
  const translateCommon = useContentful(ContentTypes.common)
  const { minted, totalSupply } = nftData
  const deadline =
    nftData.collection.fields?.deadline != null
      ? new Date(nftData.collection.fields.deadline)
      : undefined
  return (
    <Stack gap={1} alignItems={alignCenter ? 'center' : 'start'}>
      <Stack direction="row">
        <Typography variant="caption" color="neutral.700">
          {`${translateCommon('minted')}:`}&nbsp;
        </Typography>
        <Typography variant="caption">{`${minted ?? 0}`}</Typography>
        {totalSupply !== undefined && (
          <Typography variant="caption">{`/${totalSupply}`}</Typography>
        )}
      </Stack>
      {deadline !== undefined && !nftData.owned && (
        <Stack direction="row">
          <Typography variant="caption" color="neutral.700">
            {`${translateCommon('timeLeft')}:`}&nbsp;
          </Typography>
          <Typography variant="caption">
            <Countdown deadline={deadline} />
          </Typography>
        </Stack>
      )}
    </Stack>
  )
}
