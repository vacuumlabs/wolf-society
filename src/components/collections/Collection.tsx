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
import NftCardArtImpact from './NftCardArtImpact'
import Button from '../Button'
import { ArtistCardMobile } from './ArtistCardMobile'
import { BigNumber, ethers } from 'ethers'

type Props = {
  id: string
  name: string
  description: string
  color: string
  subtitle: string
  deadline?: Date
  numberOfPieces?: number
  nftData: NFTData[] | null
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
  const [pointerOverNft, setPointerOverNft] = useState(false)
  const [countdownOrPieces, setCountdownOrPieces] = useState<React.ReactNode>()
  const locale = useLocale()
  const translateCommon = useContentful(ContentTypes.common)
  const translateCollection = useContentful(ContentTypes.collectionsPage)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletS')
  )

  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  const collectionEthPrice = ethers.utils.formatEther(
    nftData?.reduce(
      (acc, nft) => acc.add(ethers.utils.parseEther(nft.priceInEth.toString())),
      BigNumber.from(0)
    ) ?? 0
  )

  const [artistName, setArtistName] = useState<string | undefined>(
    nftData?.[0]?.artist.fields.artistName
  )
  const [artistImage, setArtistImage] = useState<string | undefined>(
    nftData?.[0]?.artist.fields.artistImage.fields.file.url
  )

  const [artistMotto, setArtistMotto] = useState<string | undefined>(
    nftData?.[0]?.artist.fields.artistMotto
  )

  useEffect(() => {
    setCountdownOrPieces(
      deadline !== undefined ? (
        <Countdown deadline={deadline} />
      ) : (
        `${numberOfPieces?.toLocaleString(locale)} ${translateCommon('pieces')}`
      )
    )
  }, [])

  const handleChangeArtist = (nft: NFTData) => {
    setArtistName(nft.artist.fields.artistName)
    setArtistImage(nft.artist.fields.artistImage.fields.file.url)
    setArtistMotto(nft.artist.fields.artistMotto)
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
            {nftData && (
              <Stack spacing={{ mobile: 10, [breakpoint]: 0 }}>
                {nftData.map((nft, index) => (
                  <Stack width="100%" alignItems="center" key={nft.name}>
                    <ArtistCardMobile
                      artistImage={
                        nft.artist.fields.artistImage.fields.file.url
                      }
                      artistName={nft.artist.fields.artistName}
                    />
                    <ScrollingCard index={index}>
                      <NftCardArtImpact
                        nftCardProps={{
                          minted: nft.minted,
                          data: nft,
                        }}
                        changeArtist={() => {
                          handleChangeArtist(nft)
                        }}
                        isLast={index === nftData.length - 1}
                        setPointerOver={setPointerOverNft}
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
