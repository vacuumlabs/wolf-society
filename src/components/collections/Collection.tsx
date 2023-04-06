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
  Typography,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import AppearingComponent from '../AppearingComponent'
import { Countdown } from '../Countdown'
import ScrollingCard from '../ScrollingCard'
import ArtistCard from './ArtistCard'
import NftCard from './NftCard'

type Props = {
  name: string
  description: string
  artistName: string
  artistSubtext: string
  artistImage: string
  color: string
  subtitle: string
  deadline?: Date
  numberOfPieces?: number
  nftData: NFTData[] | null
}

const Collection = ({
  id,
  name,
  description,
  artistName,
  artistSubtext,
  artistImage,
  color,
  subtitle,
  deadline,
  numberOfPieces,
  nftData,
}: Props) => {
  const [countdownOrPieces, setCountdownOrPieces] = useState<React.ReactNode>()
  const locale = useLocale()
  const translateCommon = useContentful(ContentTypes.common)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  useEffect(() => {
    setCountdownOrPieces(
      deadline ? (
        <Countdown deadline={deadline} />
      ) : (
        `${numberOfPieces?.toLocaleString(locale)} ${translateCommon('pieces')}`
      )
    )
  }, [])
  return (
    <Box sx={{ bgcolor: color, textAlign: 'center' }} id={id}>
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
                  name={artistName}
                  color={color}
                  imageUrl={artistImage}
                  text={artistSubtext}
                />
              </Box>
            </Stack>
            {nftData && (
              <Stack spacing={{ mobile: 5, [breakpoint]: 0 }}>
                {nftData.map((nft, index) => (
                  <Stack width="100%" alignItems="center" key={nft.name}>
                    <ScrollingCard index={index}>
                      <NftCard
                        name={nft.name}
                        imageUrl={nft.image.fields.file.url}
                        priceEth={nft.priceInEth.toString()}
                        supply={nft.totalSupply}
                        minted={100}
                        priceFiat="750 EUR"
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
}

export default Collection
