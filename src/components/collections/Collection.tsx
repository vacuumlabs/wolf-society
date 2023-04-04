import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { useLocale } from '@/utils/hooks/useLocale'
import {
  Box,
  BreakpointOverrides,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import AppearingComponent from '../AppearingComponent'
import { Countdown } from '../Countdown'
import { CollectionCardProps } from '../landing/CollectionCard'
import ScrollingCard from '../ScrollingCard'
import ArtistCard from './ArtistCard'
import NftCard, { NftCardProps } from './NftCard'

const getMockNft = (index: number): NftCardProps => {
  return {
    name: `NFT name ${index}`,
    imageUrl: `https://picsum.photos/id/${index}/404/404`,
    priceEth: '0.5 ETH',
    priceFiat: '750 EUR',
    minted: 100,
    supply: 1000,
  }
}

const MockedNfts: NftCardProps[] = [
  getMockNft(500),
  getMockNft(501),
  getMockNft(502),
]

const Collection = ({
  name,
  imageUrl,
  description,
  color,
  subtitle,
  deadline,
  remainingPieces,
}: CollectionCardProps) => {
  const [countdownOrPieces, setCountdownOrPieces] = useState<React.ReactNode>()
  const locale = useLocale()
  const translateCommon = useContentful(ContentTypes.common)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  useEffect(() => {
    setCountdownOrPieces(
      deadline ? (
        <Countdown deadline={deadline} />
      ) : (
        `${remainingPieces?.toLocaleString(locale)} ${translateCommon(
          'pieces'
        )}`
      )
    )
  }, [])
  return (
    <Box sx={{ bgcolor: color, textAlign: 'center' }}>
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
              <Typography variant="body1" color="neutral.main">
                {description}
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              sx={{
                position: { mobile: 'static', desktopM: 'sticky' },
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
                  name="Artist Name"
                  color={color}
                  imageUrl="https://picsum.photos/id/259/700/600"
                  text="Lorem ipsum dolor
sit amet, consectetur
adipiscing elit.
Donec malesuada
tellus"
                />
              </Box>
            </Stack>
            <Stack spacing={{ mobile: 5, [breakpoint]: 0 }}>
              {MockedNfts.map((nft, index) => (
                <Stack width="100%" alignItems="center" key={nft.name}>
                  <ScrollingCard index={index}>
                    <NftCard {...nft} />
                  </ScrollingCard>
                </Stack>
              ))}
            </Stack>
          </ParallaxProvider>
        </Container>
      </AppearingComponent>
    </Box>
  )
}

export default Collection
