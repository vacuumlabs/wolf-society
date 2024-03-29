import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { BreakpointOverrides, Grid, Stack, Typography } from '@mui/material'
import NftCard from '../NftCard'
import { NFTDataWithOwnership } from '@/utils/hooks/useGetNftDataWithOwnership'

export type ArtworksProps = {
  nftsData: NFTDataWithOwnership[]
}

export const Artworks = ({ nftsData }: ArtworksProps) => {
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const translate = useContentful(ContentTypes.accountPage)
  return (
    <Grid container>
      {nftsData.map((nft) => (
        <Grid item mobile={12} tabletM={6} desktopS={4} key={nft.name}>
          <NftCard nftData={nft} displayCollection />
        </Grid>
      ))}
    </Grid>
  )
}

export default Artworks
