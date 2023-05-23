import {
  CollectionData,
  ContentTypes,
  NFTData,
  useContentful,
} from '@/utils/hooks/useContentful'
import { BreakpointOverrides, Grid, Stack, Typography } from '@mui/material'
import Button from '../Button'
import { Countdown } from '../Countdown'
import { useState } from 'react'
import { TaskDataExtended } from '@/utils/hooks/useGetTasksDataExtended'
import ExtraRewardsDrawer from './ExtraRewardsDrawer'
import NftCard from '../NftCard'

export type CollectionDataExtended = CollectionData & {
  nfts: (NFTData & { owned: boolean })[]
  tasks: TaskDataExtended[]
}

export type CollectionProps = {
  collectionData: CollectionDataExtended
}

export const Collection = ({ collectionData }: CollectionProps) => {
  const translate = useContentful(ContentTypes.accountPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const [drawerOpened, setDrawerOpened] = useState(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setDrawerOpened(open)
    }

  const collectionIsComplete = collectionData.nfts.every((nft) => nft.owned)
  const allTasksAreCompleted = collectionData.tasks.every(
    (task) => task.isCompleted
  )

  return (
    <Grid container key={collectionData.name} py={5}>
      <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
        <Stack gap={3} height="100%" justifyContent="center">
          <Stack gap={2}>
            <Typography variant="caption">{collectionData.name}</Typography>
            <Typography variant="body2">
              {translate('unlockRewardsQuest')}
            </Typography>
          </Stack>
          <Stack
            direction={{ mobile: 'column', [breakpoint]: 'row' }}
            alignItems={{ mobile: 'start', [breakpoint]: 'center' }}
            justifyContent="space-between"
            gap={3}
          >
            {allTasksAreCompleted ? (
              <Typography variant="caption">{translate('complete')}</Typography>
            ) : (
              <>
                <Button
                  sx={{
                    display: { mobile: 'none', [breakpoint]: 'inherit' },
                  }}
                  onClick={toggleDrawer(true)}
                >
                  {translate('unlockRewardsButton')}
                </Button>
                {collectionData.deadline !== undefined &&
                  !collectionIsComplete && (
                    <Typography variant="caption">
                      <Countdown deadline={new Date(collectionData.deadline)} />
                    </Typography>
                  )}
                <Button
                  fullWidth
                  sx={{
                    display: { mobile: 'inherit', [breakpoint]: 'none' },
                    mb: 3,
                  }}
                  onClick={toggleDrawer(true)}
                >
                  {translate('unlockRewardsButton')}
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Grid>
      <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
        <Grid container height="100%">
          {collectionData.nfts.map((nft) => (
            <Grid
              item
              mobile={6}
              {...{ [breakpoint]: 4 }}
              key={nft.name}
              display="grid"
              alignContent="center"
            >
              <Stack bgcolor="neutral.600" position="relative">
                <NftCard
                  compact
                  indicateOwnership
                  hideMintedIfOwned
                  nftData={nft}
                  minted={nft.totalSupply ? nft.minted : undefined}
                />
                {nft.totalSupply && !nft.owned && (
                  <Stack
                    direction="row"
                    position="absolute"
                    bottom={0}
                    right={0}
                    px={2}
                    py={1}
                    bgcolor="black.main"
                  >
                    <Typography variant="body2S" color="neutral.400">
                      {nft.minted}
                    </Typography>
                    <Typography color="neutral.700" variant="body2S">
                      /{nft.totalSupply}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <ExtraRewardsDrawer
        drawerOpened={drawerOpened}
        onClose={toggleDrawer(false)}
        collectionData={collectionData}
        collectionIsComplete={collectionIsComplete}
      />
    </Grid>
  )
}

export default Collection
