import {
  Container,
  Tab,
  Tabs,
  Typography,
  Box,
  BreakpointOverrides,
} from '@mui/material'
import { useState } from 'react'
import {
  useContentful,
  ContentTypes,
  Content,
  CollectionData,
  NFTData,
} from '@/utils/hooks/useContentful'
import Artworks from './Artworks'
import Collections from './Collections'
import { useGetNfts } from '@/utils/hooks/useGetNfts'
import { useAccount } from 'wagmi'

enum TabIds {
  ARTWORKS,
  COLLECTIONS,
}

const tabData: {
  id: number
  textKey: keyof Content[ContentTypes.accountPage]
}[] = [
  {
    id: TabIds.ARTWORKS,
    textKey: 'artworks',
  },
  {
    id: TabIds.COLLECTIONS,
    textKey: 'collections',
  },
]

type Props = {
  collectionsData: CollectionData[] | null
  nftsData: NFTData[] | null
}

export const ArtworksAndCollections = ({
  collectionsData,
  nftsData,
}: Props) => {
  const translate = useContentful(ContentTypes.accountPage)
  const [activeTab, setActiveTab] = useState<number>(0)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const userAddress = useAccount()
  const userNfts = useGetNfts(userAddress.address)

  const nftsDataWithUserOwnershipInfo =
    nftsData?.map((nft) => {
      return {
        ...nft,
        owned: !!userNfts.find((userNft) => {
          return userNft.tokenId === nft.tokenId?.toString()
        }),
      }
    }) ?? []

  return (
    <Box sx={{ bgcolor: 'neutral.400' }} pt={{ mobile: 5, [breakpoint]: 10 }}>
      <Container>
        <Tabs value={activeTab} TabIndicatorProps={{ sx: { display: 'none' } }}>
          {tabData.map((data, index) => {
            const color = activeTab === index ? 'black.main' : 'neutral.700'
            return (
              <Tab
                wrapped
                key={`tab-${index}`}
                sx={{
                  p: 0,
                  pb: 3,
                  pl: index > 0 ? 5 : 0,
                  maxWidth: 'none',
                }}
                label={
                  <Typography
                    variant="title"
                    color={color}
                    sx={{ '&:hover': { color: 'black.main' } }}
                  >
                    {translate(data.textKey)}
                  </Typography>
                }
                onClick={() => setActiveTab(index)}
              />
            )
          })}
        </Tabs>
        {activeTab === TabIds.ARTWORKS && (
          <Artworks
            nftsData={nftsDataWithUserOwnershipInfo.filter(
              (nftData) => nftData.owned
            )}
          />
        )}
        {activeTab === TabIds.COLLECTIONS && (
          <Collections
            collectionsData={
              collectionsData?.map((collectionData) => {
                return {
                  ...collectionData,
                  nfts: nftsDataWithUserOwnershipInfo.filter(
                    (nft) => nft.collectionId === collectionData.id
                  ),
                }
              }) ?? []
            }
          />
        )}
      </Container>
    </Box>
  )
}

export default ArtworksAndCollections
