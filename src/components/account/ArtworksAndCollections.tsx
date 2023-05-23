import {
  Container,
  Tab,
  Tabs,
  Typography,
  Box,
  BreakpointOverrides,
  Stack,
} from '@mui/material'
import { useState } from 'react'
import {
  useContentful,
  ContentTypes,
  Content,
  CollectionData,
  NFTData,
  TaskData,
} from '@/utils/hooks/useContentful'
import Artworks from './Artworks'
import Collections from './Collections'
import { useGetNftDataExtended } from '@/utils/hooks/useGetNftDataExtended'
import NextLink from 'next/link'
import { SUBPAGES } from '@/consts'
import Button from '../Button'
import { useGetTasksDataExtended } from '@/utils/hooks/useGetTasksDataExtended'

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
  tasksData: TaskData[] | null
}

export const ArtworksAndCollections = ({
  collectionsData,
  nftsData,
  tasksData,
}: Props) => {
  const translate = useContentful(ContentTypes.accountPage)
  const translateCommon = useContentful(ContentTypes.common)
  const [activeTab, setActiveTab] = useState<number>(0)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const nftsDataExtended = useGetNftDataExtended(nftsData)
  const tasksDataExtended = useGetTasksDataExtended(tasksData)
  const ownedNfts = nftsDataExtended.filter((nftData) => nftData.owned)

  return ownedNfts.length > 0 ? (
    <Box sx={{ bgcolor: 'neutral.400' }} py={{ mobile: 5, [breakpoint]: 10 }}>
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
        {activeTab === TabIds.ARTWORKS && <Artworks nftsData={ownedNfts} />}
        {activeTab === TabIds.COLLECTIONS && (
          <Collections
            collectionsData={
              collectionsData?.map((collectionData) => {
                const collectionNfts = nftsDataExtended.filter(
                  (nft) => nft.collection.fields.id === collectionData.id
                )
                return {
                  ...collectionData,
                  nfts: collectionNfts,
                  tasks:
                    tasksDataExtended?.filter((taskData) => {
                      const taskNft = taskData.nftOrCollection
                      return (
                        taskNft == null ||
                        taskNft.fields.id === collectionData.id ||
                        collectionNfts.some(
                          (nft) => nft.id === taskNft.fields.id
                        )
                      )
                    }) ?? [],
                }
              }) ?? []
            }
          />
        )}
      </Container>
    </Box>
  ) : (
    <Box sx={{ bgcolor: 'neutral.400' }} py={{ mobile: 10, [breakpoint]: 20 }}>
      <Container>
        <Stack alignItems="center" gap={3}>
          <Typography variant="body2" textAlign="center" maxWidth={344}>
            {translate('noArtworks')}
          </Typography>
          <NextLink
            href={SUBPAGES['collections']}
            passHref
            style={{ lineHeight: 0 }}
          >
            <Button>{translateCommon('makeImpactButton')}</Button>
          </NextLink>
        </Stack>
      </Container>
    </Box>
  )
}

export default ArtworksAndCollections
