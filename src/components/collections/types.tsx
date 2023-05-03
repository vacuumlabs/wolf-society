import { NFTArtistData, NFTData } from '@/utils/hooks/useContentful'

// The omit is a temporary measure to not break prod.
export type NFTWithArtistData = Omit<
  NFTData,
  | 'artistName'
  | 'artistImage'
  | 'artistDescLeft'
  | 'artistDescRight'
  | 'artistsTwitter'
  | 'artistsIG'
  | 'artistsWeb'
> &
  NFTArtistData
