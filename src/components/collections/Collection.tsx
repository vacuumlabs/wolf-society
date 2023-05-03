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
import { useState, useEffect, forwardRef } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import AppearingComponent from '../AppearingComponent'
import { Countdown } from '../Countdown'
import ScrollingCard from '../ScrollingCard'
import ArtistCard from './ArtistCard'
import NftCard from './NftCard'
import Button from '../Button'
import { ArtistCardMobile } from './ArtistCardMobile'
import type { NFTWithArtistData } from './types'

type Props = {
  id: string
  name: string
  description: string
  color: string
  subtitle: string
  deadline?: Date
  numberOfPieces?: number
  nftData: NFTWithArtistData[] | null
}

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
  const [countdownOrPieces, setCountdownOrPieces] = useState<React.ReactNode>()
  const locale = useLocale()
  const translateCommon = useContentful(ContentTypes.common)
  const translateCollection = useContentful(ContentTypes.collectionsPage)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletS')
  )

  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const collectionEthPrice = nftData?.reduce(
    (acc, nft) => acc + nft.priceInEth,
    0
  )

  const [artistName, setArtistName] = useState<string | undefined>(
    nftData?.[0]?.artistName
  )
  const [artistImage, setArtistImage] = useState<string | undefined>(
    nftData?.[0]?.artistImage.fields.file.url
  )

  const [artistMotto, setArtistMotto] = useState<string | undefined>(
    nftData?.[0]?.artistMotto
  )

  useEffect(() => {
    setCountdownOrPieces(
      deadline ? (
        <Countdown deadline={deadline} />
      ) : (
        `${numberOfPieces?.toLocaleString(locale)} ${translateCommon('pieces')}`
      )
    )
  }, [])

  const handleChangeArtist = (nft: NFTWithArtistData) => {
    setArtistName(nft.artistName)
    setArtistImage(nft.artistImage.fields.file.url)
    setArtistMotto(nft.artistMotto)
  }

  return (
    <Box sx={{ bgcolor: color, textAlign: 'center' }} id={id} ref={ref}>
      <AppearingComponent>
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
                  {countdownOrPieces}
                </Typography>
              </Stack>
              <Typography variant="display" color="neutral.main">
                {name}
              </Typography>
              <Typography
                variant={isMobile ? 'body2' : 'body1'}
                color="neutral.main"
              >
                {description}
              </Typography>
              <Button sx={{ height: 'auto !important' }}>
                <Stack direction="column">
                  <Typography variant="button">
                    {translateCollection('getCompleteCollection')}
                  </Typography>
                  <Typography variant="button">
                    {`${collectionEthPrice} ETH`}
                  </Typography>
                </Stack>
              </Button>
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
                width={{
                  mobile: '100%',
                  [breakpoint]: '50%',
                  position: 'relative',
                }}
              >
                <ArtistCard
                  name={artistName}
                  color={color}
                  imageUrl={artistImage}
                  text={artistMotto}
                />
              </Box>
            </Stack>
            {nftData && (
              <Stack spacing={{ mobile: 10, [breakpoint]: 0 }}>
                {nftData.map((nft, index) => (
                  <Stack width="100%" alignItems="center" key={nft.name}>
                    <ArtistCardMobile
                      artistImage={nft.artistImage.fields.file.url}
                      artistName={nft.artistName}
                    />
                    <ScrollingCard index={index}>
                      <NftCard
                        minted={100}
                        changeArtist={() => {
                          handleChangeArtist(nft)
                        }}
                        isLast={index === nftData.length - 1}
                        data={nft}
                      />
                    </ScrollingCard>
                  </Stack>
                ))}
              </Stack>
            )}
          </ParallaxProvider>
        </Container>
      </AppearingComponent>
    </Box>
  )
})
Collection.displayName = 'Collection'

export default Collection
