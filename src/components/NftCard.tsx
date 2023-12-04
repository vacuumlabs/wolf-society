import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
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
import { NFTDetail } from './NFTDetail/NFTDetail'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { NFTDataWithOwnership } from '@/utils/hooks/useGetNftDataWithOwnership'
import { getNftShareableContent } from '@/utils/sharing'
import CardButton from '@/components/CardButton'

export type NftCardProps = {
  minted?: number
  nftData: NFTDataWithOwnership
  displayPrice?: boolean
  displayCollection?: boolean
  compact?: boolean
  indicateOwnership?: boolean
  hideMintedIfOwned?: boolean
  limitHeight?: boolean
}

const DynamicShareButton = dynamic(
  () =>
    import('./collections/CardShareButton').then((mod) => mod.CardShareButton),
  { ssr: false }
)

const NftCard = ({
  minted,
  nftData,
  displayPrice,
  displayCollection,
  compact,
  indicateOwnership,
  hideMintedIfOwned,
  limitHeight = true,
}: NftCardProps) => {
  const { totalSupply, name, priceInEth, image } = nftData
  const translate = useContentful(ContentTypes.common)
  const translateNftDetail = useContentful(ContentTypes.nftDetail)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)
  const router = useRouter()

  function openNFTDetail() {
    router.replace(
      {
        query: { ...router.query, nft: nftData.id },
      },
      undefined,
      {
        shallow: true,
      }
    )
  }

  function closeNFTDetail() {
    const newQuery = { ...router.query }
    delete newQuery.nft
    router.replace(
      {
        query: newQuery,
      },
      undefined,
      {
        shallow: true,
      }
    )
    setIsDetailOpen(false)
  }

  useEffect(() => {
    if (router.query.nft === nftData.id) {
      setIsDetailOpen(true)
    }
  }, [router.query.nft])

  return (
    <>
      <Card
        sx={{
          bgcolor: 'neutral.main',
          transition: '250ms',
          width: '100%',
          height: '100%',
          '& .MuiCardContent-root': {
            mobile: {},
            [breakpoint]: { translate: '0 0' },
          },
          '&:hover .MuiCardContent-root': {
            mobile: {},
            [breakpoint]: { translate: '0 -48px' },
            desktopM: { translate: '0 -56px' },
          },
        }}
      >
        <CardActionArea
          onClick={() => {
            openNFTDetail()
          }}
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Box position="relative" width="100%">
            <CardMedia
              component="img"
              sx={{
                height: limitHeight
                  ? compact
                    ? { mobile: '164px', [breakpoint]: '186px' }
                    : { mobile: '342px', [breakpoint]: '404px' }
                  : '100%',
                opacity: !indicateOwnership || nftData.owned ? 1 : 0.2,
              }}
              image={nftData.image.fields.file.url}
              alt="Project image"
            />
            {minted !== undefined && (!hideMintedIfOwned || !nftData.owned) && (
              <Box
                bgcolor="black.main"
                position="absolute"
                bottom={0}
                right={0}
                px={2}
                py={1}
              >
                <Typography
                  variant={compact ? 'body2S' : 'body2'}
                  display="inline"
                  color="neutral.400"
                >
                  {minted}
                </Typography>
                <Typography
                  variant={compact ? 'body2S' : 'body2'}
                  display="inline"
                  color="neutral.700"
                >
                  {totalSupply
                    ? `/${totalSupply} ${compact ? '' : translate('pieces')}`
                    : ` ${translate('minted')}`}
                </Typography>
              </Box>
            )}
          </Box>
          {!compact && (
            <CardContent
              sx={{
                p: 0,
                transition: 'translate 0.25s',
                flexGrow: 1,
                width: '100%',
                display: { mobile: 'flex', [breakpoint]: 'block' },
                flexDirection: 'column',
              }}
            >
              <Stack
                sx={{
                  textAlign: 'start',
                  p: 4,
                  height: { mobile: 'auto', [breakpoint]: '100%' },
                  flexGrow: 1,
                }}
              >
                <Stack
                  sx={{
                    gap: 3,
                    pt: { [breakpoint]: '48px', desktopM: '56px' },
                    justifyContent: 'space-between',
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="caption" color="secondary">
                    {name}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    {displayCollection && (
                      <Typography variant="body2">
                        {nftData.collection.fields?.name}
                      </Typography>
                    )}
                    <Typography variant="body2">
                      {nftData.artist.fields.artistName}
                    </Typography>
                    {displayPrice && (
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Typography variant="caption">
                          {priceInEth} ETH
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Stack>
              <Box
                sx={{
                  width: '100%',
                  position: { mobile: 'relative', [breakpoint]: 'absolute' },
                  transition: 'translate 0.25s',
                  left: 0,
                }}
              >
                <Stack direction="row" gap="1px">
                  <DynamicShareButton
                    variant="primary"
                    sx={{
                      height: '100%',
                      boxShadow: 'none',
                      backgroundColor: 'red',
                    }}
                    shareableContent={getNftShareableContent(
                      translate('nftShareText'),
                      nftData
                    )}
                  />
                  <CardButton>
                    <Typography variant="button">
                      {translate('showDetails')}
                    </Typography>
                  </CardButton>
                </Stack>
              </Box>
            </CardContent>
          )}
        </CardActionArea>
      </Card>
      <NFTDetail
        isOpen={isDetailOpen}
        onClose={() => closeNFTDetail()}
        nftArtistProps={{
          name: nftData.artist.fields.artistName,
          descriptionLeft: nftData.artist.fields.artistDescLeft,
          descriptionRight: nftData.artist.fields.artistDescRight,
          imageUrl: nftData.artist.fields.artistImage.fields.file.url,
          socialLinks: {
            twitterUrl: nftData.artist.fields.artistTwitter,
            instagramUrl: nftData.artist.fields.artistInstagram,
            webUrl: nftData.artist.fields.artistWeb,
            facebookUrl: nftData.artist.fields.artistFacebook,
            discordUrl: nftData.artist.fields.artistDiscord,
            linkedInUrl: nftData.artist.fields.artistLinkedIn,
            youtubeUrl: nftData.artist.fields.artistYoutube,
            email: nftData.artist.fields.artistEmail,
            linktreeUrl: nftData.artist.fields.artistLinktree,
          },
        }}
        nftData={nftData}
        nftUsageProps={{
          lists: [
            {
              caption: translateNftDetail('breadAndButterTitle'),
              description: translateNftDetail('breadAndButterSubtitle'),
              texts: nftData.breadAndButterList.split('\n'),
            },
          ],
        }}
      />
    </>
  )
}
export default NftCard
