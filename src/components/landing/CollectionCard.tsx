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

export type CollectionCardProps = {
  name: string
  imageUrl: string
  description: string
  color: string
  subtitle: string
  deadline?: Date
  remainingPieces?: number
}

const CollectionCard = ({
  name,
  imageUrl,
  description,
  color,
  subtitle,
  deadline,
  remainingPieces,
}: CollectionCardProps) => {
  const [countdownOrPieces, setCountdownOrPieces] = useState<React.ReactNode>()
  const translate = useContentful(ContentTypes.landingPage)
  const translateCommon = useContentful(ContentTypes.common)
  const locale = useLocale()
  const theme = useTheme()
  const displayHorizontally = useMediaQuery(theme.breakpoints.up('tabletM'))
  const nameFormatted = name.replaceAll(' ', '\n')

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

  const horizontalCard = (
    <Card
      sx={{
        display: 'flex',
        width: '100vw',
        height: 'calc(100vh - 88px)',
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
            <Button>{translate('showCollection')}</Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  )

  const verticalCard = (
    <Card>
      <CardContent sx={{ bgcolor: `${color}`, p: 5, textAlign: 'start' }}>
        <Stack gap={5}>
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
