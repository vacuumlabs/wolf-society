import { CollectionData, NFTData } from '@/utils/hooks/useContentful'
import { BreakpointOverrides, Grid } from '@mui/material'
import NftCard from '../NftCard'

export type ArtworksProps = {
  nftsData: NFTData[] | null
}

export const Artworks = ({ nftsData }: ArtworksProps) => {
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  return nftsData ? (
    <Grid container spacing={{ mobile: 2, [breakpoint]: 4 }}>
      {nftsData.map((nft) => (
        <Grid item mobile={12} tabletM={6} desktopS={4} key={nft.name}>
          <NftCard data={nft} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <>No data</>
  )
}

export default Artworks
