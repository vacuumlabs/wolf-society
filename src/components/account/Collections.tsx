import { CollectionData, NFTData } from '@/utils/hooks/useContentful'
import {
  BreakpointOverrides,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import Button from '../Button'
import { Countdown } from '../Countdown'

type CollectionsData = CollectionData & { nfts: NFTData[] }

export type CollectionsProps = {
  collectionsData: CollectionsData[]
}

export const Collections = ({ collectionsData }: CollectionsProps) => {
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  return (
    <Stack divider={<Divider />}>
      {collectionsData.map((collectionData) => (
        <Grid container key={collectionData.name} py={5}>
          <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
            <Stack gap={3} height="100%" justifyContent="center">
              <Stack gap={2}>
                <Typography variant="caption">{collectionData.name}</Typography>
                <Typography variant="body2">
                  Collect all the artworks in the collection and get an extra
                  reward of 100 game tokens
                </Typography>
              </Stack>
              <Stack
                direction={{ mobile: 'column', [breakpoint]: 'row' }}
                alignItems={{ mobile: 'start', [breakpoint]: 'center' }}
                justifyContent="space-between"
                gap={3}
              >
                <Button
                  sx={{ display: { mobile: 'none', [breakpoint]: 'inherit' } }}
                >
                  Unlock extra rewards
                </Button>
                {collectionData.deadline && (
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
                >
                  Unlock extra rewards
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
            <Grid
              container
              height="100%"
              rowSpacing={{ mobile: 2, [breakpoint]: 0 }}
              columnSpacing={{ mobile: 2, [breakpoint]: 4 }}
            >
              {collectionData.nfts.map((nft) => (
                <Grid
                  item
                  mobile={6}
                  {...{ [breakpoint]: 4 }}
                  key={nft.name}
                  display="grid"
                  alignContent="center"
                >
                  <img
                    src={nft.image.fields.file.url}
                    alt={`${nft.name} NFT image`}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Stack>
  )
}

export default Collections
