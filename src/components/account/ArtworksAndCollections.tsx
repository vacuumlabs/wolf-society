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
  nftData: NFTData[] | null
}

export const ArtworksAndCollections = ({ collectionsData, nftData }: Props) => {
  const translate = useContentful(ContentTypes.accountPage)
  const [activeTab, setActiveTab] = useState<number>(0)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const userAddress = useAccount()
  const userAllNfts = useGetNfts(userAddress.address)

  const userAllNftsAddresses = userAllNfts?.map((nft) => nft.contract.address)

  // TODO: uncomment this when ready to mint testnet nfts
  // const userOurNfts = nftData?.filter((nft) =>
  //   userAllNftsAddresses.includes(nft.address)
  // )
  const userOurNfts = nftData
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
        {activeTab === TabIds.ARTWORKS && <Artworks nftsData={userOurNfts} />}
        {activeTab === TabIds.COLLECTIONS && (
          <Collections
            collectionsData={
              collectionsData?.map((collectionData) => {
                return {
                  ...collectionData,
                  nfts:
                    nftData
                      ?.filter((nft) => nft.collectionId === collectionData.id)
                      .map((nft) => {
                        return {
                          ...nft,
                          // TODO: uncomment this when ready to mint testnet nfts
                          // owned: userAllNftsAddresses.includes(nft.address),
                          owned: true,
                        }
                      }) ?? [],
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
