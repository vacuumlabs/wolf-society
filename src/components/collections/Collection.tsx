import {
  useContentful,
  ContentTypes,
  NFTData,
} from '@/utils/hooks/useContentful'
import { useLocale } from '@/utils/hooks/useLocale'
import {
  Box,
  BreakpointOverrides,
  Container,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useState, forwardRef, useCallback } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { Countdown } from '../Countdown'
import ScrollingCard from '../ScrollingCard'
import ArtistCard from './ArtistCard'
import NftCardArtImpact from './NftCardArtImpact'
import { ArtistCardMobile } from './ArtistCardMobile'
import { NFTDataWithOwnership } from '@/utils/hooks/useGetNftDataWithOwnership'
import dynamic from 'next/dynamic'
import { getCollectionShareableContent } from '@/utils/sharing'

type Props = {
  id: string
  name: string
  description: string
  color: string
  subtitle: string
  deadline?: Date
  numberOfPieces?: number
  nftData: NFTDataWithOwnership[]
}

const DynamicShareButton = dynamic(
  () => import('./ShareButton').then((mod) => mod.ShareButton),
  { ssr: false }
)

const Collection = forwardRef<HTMLElement, Props>((props, ref) => {
  const {
    id,
    name,
    description,
    color,
    subtitle,
    deadline,
    numberOfPieces,
    nftData,
  } = props
  const [pointerOverNft, setPointerOverNft] = useState(false)
  const locale = useLocale()
  const translateCommon = useContentful(ContentTypes.common)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletS')
  )

  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const [artistName, setArtistName] = useState<string | undefined>(
    nftData[0]?.artist.fields.artistName
  )
  const [artistImage, setArtistImage] = useState<string | undefined>(
    nftData[0]?.artist.fields.artistImage.fields.file.url
  )

  const [artistMotto, setArtistMotto] = useState<string | undefined>(
    nftData[0]?.artist.fields.artistMotto
  )

  const handleChangeArtist = useCallback((nft: NFTData) => {
    setArtistName(nft.artist.fields.artistName)
    setArtistImage(nft.artist.fields.artistImage.fields.file.url)
    setArtistMotto(nft.artist.fields.artistMotto)
  }, [])

  return (
    <Box sx={{ bgcolor: color, textAlign: 'center' }} id={id} ref={ref}>
      <Container
        sx={{ position: 'relative', mb: { mobile: 10, [breakpoint]: 20 } }}
      >
        <ParallaxProvider>
          <Stack
            gap={4}
            alignItems="center"
            py={{ mobile: 10, [breakpoint]: 20 }}
          >
            <Stack direction="row" gap="4px">
              <Typography variant="caption" color="neutral.main">
                {subtitle}:
              </Typography>
              <Typography variant="caption" color="neutral.400">
                {deadline != null ? (
                  <Countdown deadline={deadline} />
                ) : (
                  `${numberOfPieces?.toLocaleString(locale)} ${translateCommon(
                    'pieces'
                  )}`
                )}
              </Typography>
            </Stack>
            <Typography variant="display" color="neutral.main">
              {name}
            </Typography>
            <DynamicShareButton
              color="neutral"
              shareableContent={getCollectionShareableContent(
                translateCommon('collectionShareText'),
                name,
                id
              )}
            />
            <Typography
              variant={isMobile ? 'body2' : 'body1'}
              color="neutral.main"
            >
              {description}
            </Typography>
          </Stack>
          <Stack
            alignItems="center"
            sx={{
              position: { mobile: 'static', [breakpoint]: 'sticky' },
              top: '80px',
              left: 0,
            }}
          >
            <Box
              width="100%"
              position="relative"
              maxWidth={{
                mobile: 'auto',
                [breakpoint]: '50%',
                desktopS: '622px',
              }}
            >
              <ArtistCard
                name={artistName}
                color={color}
                imageUrl={artistImage}
                text={artistMotto}
                translucent={pointerOverNft}
              />
            </Box>
          </Stack>

          <Stack spacing={{ mobile: 10, [breakpoint]: 0 }}>
            {nftData.map((nft, index) => (
              <Stack width="100%" alignItems="center" key={nft.name}>
                <ArtistCardMobile
                  artistImage={nft.artist.fields.artistImage.fields.file.url}
                  artistName={nft.artist.fields.artistName}
                />
                <ScrollingCard index={index}>
                  <NftCardArtImpact
                    nftData={nft}
                    changeArtist={handleChangeArtist}
                    isLast={index === nftData.length - 1}
                    setPointerOver={setPointerOverNft}
                  />
                </ScrollingCard>
              </Stack>
            ))}
          </Stack>
        </ParallaxProvider>
      </Container>
    </Box>
  )
})

Collection.displayName = 'Collection'

export default Collection
