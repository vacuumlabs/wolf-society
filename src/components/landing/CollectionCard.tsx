import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ParallaxLayer } from '@react-spring/parallax'
import { useRef, useState } from 'react'
import Button from '../Button'

export type CollectionCardProps = {
  name: string
  imageUrl: string
  description: string
  color: string
  subtitle: string
  isFirst: boolean
  isLast: boolean
  offset: number
  scrollTo: (num: number) => void
}

const CollectionCard = ({
  name,
  imageUrl,
  description,
  color,
  subtitle,
  isFirst,
  isLast,
  offset,
  scrollTo,
}: CollectionCardProps) => {
  const translate = useContentful(ContentTypes.landingPage)
  const theme = useTheme()
  const displayHorizontally = useMediaQuery(theme.breakpoints.up('tabletM'))
  const [showCard, setShowCard] = useState<boolean>(false)
  const thisRef = useRef<HTMLDivElement>(null)

  const horizontalCard = (
    <ParallaxLayer
      offset={offset}
      speed={0.2}
      onClick={() => {
        isFirst && !showCard ? null : scrollTo(offset + 1)
      }}
      onWheel={(e) => {
        const deltaY = e.deltaY
        const navbarOffset = 88
        const elementPosition = thisRef?.current?.getBoundingClientRect().top
        const offsetPosition =
          (elementPosition || 0) + window.pageYOffset - navbarOffset
        const scrollDirection = deltaY > 0 ? 1 : -1
        const newOffset = offset + scrollDirection

        if (
          (scrollDirection === 1 && isLast) ||
          (scrollDirection === -1 && isFirst)
        ) {
          window.scrollBy({ top: deltaY })
        } else {
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }

        scrollTo(newOffset)
        e.stopPropagation()
      }}
    >
      <Card
        ref={thisRef}
        sx={{
          display: 'flex',
          width: '100%',
          height: 'calc(100vh - 88px)',
        }}
        onClick={() => setShowCard(true)}
      >
        <Box
          width="50%"
          bgcolor="neutral.main"
          alignItems="center"
          display="flex"
          justifyContent="center"
          sx={{
            height: '100%',
          }}
        >
          <Box mx="80px" my="170px">
            <CardMedia component="img" image={imageUrl} alt={name} />
          </Box>
        </Box>
        <Box
          width="50%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box
            sx={{
              bgcolor: `${color}`,
              textAlign: 'start',
              flexGrow: 1,
              display: 'flex',
              p: 10,
              flexDirection: 'column',
            }}
          >
            <Box flexGrow={1}>
              <Stack gap={4}>
                <Typography
                  variant="caption"
                  color="neutral.main"
                  sx={{ whiteSpace: 'pre-wrap' }}
                >
                  {subtitle}
                </Typography>
                <Typography variant="headline" color="neutral.main">
                  {name}
                </Typography>
              </Stack>
            </Box>
            <Box mb={10}>
              <Typography color="neutral.main" variant="body2">
                {description}
              </Typography>
            </Box>
            <CardActions sx={{ padding: 0 }}>
              <Button>{translate('showCollection')}</Button>
            </CardActions>
          </Box>
        </Box>
      </Card>
    </ParallaxLayer>
  )

  const verticalCard = (
    <Card>
      <CardContent sx={{ bgcolor: `${color}`, p: 5, textAlign: 'start' }}>
        <Stack gap={4}>
          <Typography
            variant="caption"
            color="neutral.main"
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {subtitle}
          </Typography>
          <Typography variant="headline" color="neutral.main">
            {name}
          </Typography>
        </Stack>
      </CardContent>
      <Box sx={{ p: 5, bgcolor: 'neutral.main' }}>
        <CardMedia component="img" image={imageUrl} alt={name} />
      </Box>

      <CardActions sx={{ padding: 0 }}>
        <Button sx={{ width: '100%' }}>{translate('showCollection')}</Button>
      </CardActions>
    </Card>
  )

  return displayHorizontally ? horizontalCard : verticalCard
}
export default CollectionCard
