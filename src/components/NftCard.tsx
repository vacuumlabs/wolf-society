import {
  useContentful,
  ContentTypes,
  NFTData,
} from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import Button from './Button'
import { NFTDetail } from './NFTDetail/NFTDetail'
import { MOCKED_NFT_DETAIL } from './NFTDetail/mockedDetailData'
import { useState } from 'react'
import dynamic from 'next/dynamic'

export type NftCardProps = {
  minted?: number
  data: NFTData
  displayPrice?: boolean
  displayCollection?: boolean
}

const DynamicShareButton = dynamic(
  () => import('./collections/ShareButton').then((mod) => mod.ShareButton),
  { ssr: false }
)

const NftCard = ({
  minted,
  data,
  displayPrice,
  displayCollection,
}: NftCardProps) => {
  const { totalSupply, name, priceInEth, image } = data
  const translate = useContentful(ContentTypes.common)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)

  return (
    <>
      <Card
        sx={{
          bgcolor: 'neutral.main',
          width: '100%',
          '& .MuiCardContent-root': {
            mobile: {},
            [breakpoint]: { translate: '0 48px' },
            desktopM: { translate: '0 56px' },
          },
          '&:hover .MuiCardContent-root': {
            mobile: {},
            [breakpoint]: { translate: '0 0' },
          },
        }}
      >
        <CardActionArea
          onClick={() => {
            setIsDetailOpen(true)
          }}
        >
          <Box position="relative">
            <CardMedia
              component="img"
              sx={{ height: '100%' }}
              image={data.image.fields.file.url}
              alt="Project image"
            />
            {minted !== undefined && (
              <Box
                bgcolor="black.main"
                position="absolute"
                bottom={0}
                right={0}
                px={2}
                py={1}
              >
                <Typography
                  variant="body2"
                  display="inline"
                  color="neutral.400"
                >
                  {minted}
                </Typography>
                <Typography
                  variant="body2"
                  display="inline"
                  color="neutral.700"
                >
                  {totalSupply
                    ? `/${totalSupply} ${translate('pieces')}`
                    : ` ${translate('minted')}`}
                </Typography>
              </Box>
            )}
          </Box>
          <CardContent sx={{ p: 0, transition: 'translate 0.25s' }}>
            <Stack sx={{ p: 4, textAlign: 'start' }} gap={1}>
              <Typography variant="caption" color="secondary">
                {name}
              </Typography>
              <Stack direction="row" justifyContent="space-between">
                {displayCollection && (
                  <Typography variant="body2">
                    {data.collection.fields.name}
                  </Typography>
                )}
                <Typography variant="body2">
                  {data.artist.fields.artistName}
                </Typography>
                {displayPrice && (
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="caption">{priceInEth} ETH</Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Stack direction="row" gap="1px">
              <DynamicShareButton
                variant="primary"
                sx={{
                  height: '100%',
                  boxShadow: 'none',
                  backgroundColor: 'red',
                }}
              />
              <Button
                component="div"
                sx={{ width: '100%' }}
                onClick={() => setIsDetailOpen(true)}
              >
                {translate('showDetails')}
              </Button>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
      <NFTDetail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        nftArtistProps={{
          name: data.artist.fields.artistName,
          descriptionLeft: data.artist.fields.artistDescLeft,
          descriptionRight: data.artist.fields.artistDescRight,
          imageUrl: data.artist.fields.artistImage.fields.file.url,
          socialLinks: {
            twitterURL: data.artist.fields.artistTwitter,
            igUrl: data.artist.fields.artistIG,
            webUrl: data.artist.fields.artistWeb,
          },
        }}
        nftDescriptionProps={{
          name: name,
          totalPieces: totalSupply,
          soldPieces: minted,
          deadline: undefined,
          descriptionText: data.nftDesc,
          imageUrl: image.fields.file.url,
        }}
        nftUsageProps={MOCKED_NFT_DETAIL.nftUsageProps}
        nftBuyProps={{ nft: data }}
      />
    </>
  )
}
export default NftCard
