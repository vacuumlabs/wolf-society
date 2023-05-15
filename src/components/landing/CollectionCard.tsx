import { SUBPAGES } from '@/consts'
import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { useLocale } from '@/utils/hooks/useLocale'
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
import { useEffect, useState } from 'react'
import Button from '../Button'
import { Countdown } from '../Countdown'
import Link from 'next/link'

export type CollectionCardProps = {
  id: string
  name: string
  imageUrl: string
  description: string
  color: string
  subtitle: string
  deadline?: Date
  numberOfPieces?: number
  collectionNumber: number
  numberOfCollections: number
}

const CollectionCard = ({
  id,
  name,
  imageUrl,
  description,
  color,
  subtitle,
  deadline,
  numberOfPieces,
  collectionNumber,
  numberOfCollections,
}: CollectionCardProps) => {
  const [countdownOrPieces, setCountdownOrPieces] = useState<React.ReactNode>()
  const translate = useContentful(ContentTypes.landingPage)
  const translateCommon = useContentful(ContentTypes.common)
  const locale = useLocale()
  const theme = useTheme()
  const displayHorizontally = useMediaQuery(theme.breakpoints.up('tabletM'))
  const nameFormatted = name.replaceAll(' ', '\n')
  const href = `${SUBPAGES['collections']}#${id}`

  useEffect(() => {
    setCountdownOrPieces(
      deadline !== undefined ? (
        <Countdown deadline={deadline} />
      ) : (
        `${numberOfPieces?.toLocaleString(locale)} ${translateCommon('pieces')}`
      )
    )
  }, [])

  const horizontalCard = (
    <Card
      sx={{
        display: 'flex',
        width: '100vw',
        height: 'calc(100vh - 80px)',
      }}
      className="panel"
    >
      <Box
        width="50%"
        bgcolor="neutral.main"
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Box mx="80px" my="170px">
          <CardMedia component="img" image={imageUrl} alt={name} />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: 'neutral.400',
          textAlign: 'center',
          position: 'absolute',
          left: 'calc(50% - 44px)',
          top: 'calc(50% - 44px)',
          width: '88px',
          height: '88px',
        }}
      >
        <Typography variant="body2" color="neutral.700" mt={'26px'}>{`${
          collectionNumber < 10 ? '0' + collectionNumber : collectionNumber
        }/${
          numberOfCollections < 10
            ? '0' + numberOfCollections
            : numberOfCollections
        }`}</Typography>
      </Box>
      <Box width="50%" sx={{ display: 'flex', flexDirection: 'column' }}>
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
            <Stack gap={5}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" color="neutral.main">
                  {subtitle}
                </Typography>
                <Typography variant="caption" color="neutral.main">
                  {countdownOrPieces}
                </Typography>
              </Stack>
              <Typography
                variant="headline"
                color="neutral.main"
                sx={{ whiteSpace: 'pre-wrap' }}
              >
                {nameFormatted}
              </Typography>
            </Stack>
          </Box>
          <Box mb={5}>
            <Typography color="neutral.main" variant="body2">
              {description}
            </Typography>
          </Box>
          <CardActions sx={{ padding: 0 }}>
            <Link {...{ href }} passHref>
              <Button>{translate('showCollection')}</Button>
            </Link>
          </CardActions>
        </Box>
      </Box>
    </Card>
  )

  const verticalCard = (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: 'calc(100vh - 80px)',
      }}
      className="panel"
    >
      <CardContent
        sx={{ bgcolor: `${color}`, p: 5, textAlign: 'start', flexGrow: 1 }}
      >
        <Stack gap={5} height="100%" justifyContent="space-between">
          <Stack gap="4px">
            <Typography variant="caption" color="neutral.main">
              {subtitle}
            </Typography>
            <Typography variant="caption" color="neutral.main">
              {countdownOrPieces}
            </Typography>
          </Stack>
          <Typography
            variant="headline"
            color="neutral.main"
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {nameFormatted}
          </Typography>
        </Stack>
      </CardContent>
      <Box
        sx={{
          p: 5,
          bgcolor: 'neutral.main',
          maxHeight: 'calc(100vh - 80px - 228px - 48px)',
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{ height: '100%' }}
        />
      </Box>

      <CardActions sx={{ padding: 0 }}>
        <Button sx={{ width: '100%' }} href={href}>
          {translate('showCollection')}
        </Button>
      </CardActions>
    </Card>
  )

  return displayHorizontally ? horizontalCard : verticalCard
}
export default CollectionCard
