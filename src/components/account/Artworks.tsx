import {
  ContentTypes,
  NFTData,
  useContentful,
} from '@/utils/hooks/useContentful'
import { BreakpointOverrides, Grid, Stack, Typography } from '@mui/material'
import NftCard from '../NftCard'

export type ArtworksProps = {
  nftsData: NFTData[]
}

export const Artworks = ({ nftsData }: ArtworksProps) => {
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const translate = useContentful(ContentTypes.accountPage)
  return nftsData.length > 0 ? (
    <Grid container>
      {nftsData.map((nft) => (
        <Grid item mobile={12} tabletM={6} desktopS={4} key={nft.name}>
          <NftCard
            data={nft}
            displayCollection
            detailButtonsMode="shareTwitter"
          />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Stack alignItems="center">
      <Typography variant="body2" textAlign="center" maxWidth={344}>
        {translate('noArtworks')}
      </Typography>
    </Stack>
  )
}

export default Artworks
