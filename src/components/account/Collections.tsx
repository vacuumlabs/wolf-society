import {
  CollectionData,
  ContentTypes,
  NFTData,
  useContentful,
} from '@/utils/hooks/useContentful'
import {
  BreakpointOverrides,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import Button from '../Button'
import { Countdown } from '../Countdown'

type CollectionsData = CollectionData & {
  nfts: (NFTData & { owned: boolean })[]
}

export type CollectionsProps = {
  collectionsData: CollectionsData[]
}

export const Collections = ({ collectionsData }: CollectionsProps) => {
  const translate = useContentful(ContentTypes.accountPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  return (
    <Stack divider={<Divider />}>
      {collectionsData.map((collectionData) => {
        const collectionIsComplete = collectionData.nfts.every(
          (nft) => nft.owned
        )
        return (
          <Grid container key={collectionData.name} py={5}>
            <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
              <Stack gap={3} height="100%" justifyContent="center">
                <Stack gap={2}>
                  <Typography variant="caption">
                    {collectionData.name}
                  </Typography>
                  <Typography variant="body2">
                    {translate('collectQuest')}
                  </Typography>
                </Stack>
                <Stack
                  direction={{ mobile: 'column', [breakpoint]: 'row' }}
                  alignItems={{ mobile: 'start', [breakpoint]: 'center' }}
                  justifyContent="space-between"
                  gap={3}
                >
                  {collectionIsComplete ? (
                    <Typography variant="caption">
                      {translate('complete')}
                    </Typography>
                  ) : (
                    <>
                      <Button
                        sx={{
                          display: { mobile: 'none', [breakpoint]: 'inherit' },
                        }}
                      >
                        {translate('unlockExtraRewards')}
                      </Button>
                      {collectionData.deadline !== undefined && (
                        <Typography variant="caption">
                          <Countdown
                            deadline={new Date(collectionData.deadline)}
                          />
                        </Typography>
                      )}
                      <Button
                        fullWidth
                        sx={{
                          display: { mobile: 'inherit', [breakpoint]: 'none' },
                          mb: 3,
                        }}
                      >
                        {translate('unlockExtraRewards')}
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
                      <img
                        src={nft.image.fields.file.url}
                        alt={`${nft.name} NFT image`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          opacity: nft.owned ? 1 : 0.2,
                        }}
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
          </Grid>
        )
      })}
    </Stack>
  )
}

export default Collections
