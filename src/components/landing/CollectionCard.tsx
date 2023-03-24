import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

export type CollectionCardProps = {
  name: string
  imageUrl: string
  description: string
  color: string
  subtitle: string
}

const CollectionCard = ({
  name,
  imageUrl,
  description,
  color,
  subtitle,
}: CollectionCardProps) => {
  const translate = useContentful(ContentTypes.landingPage)
  const theme = useTheme()
  const displayHorizontally = useMediaQuery(theme.breakpoints.up('tabletM'))

  const horizontalCard = (
    <Card
      sx={{
        display: 'flex',
        width: '100%',
        height: 'calc(100vh - 88px)',
      }}
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
            <Button color="primary" variant="contained">
              {translate('showCollection')}
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
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
        <Button color="primary" variant="contained" sx={{ width: '100%' }}>
          {translate('showCollection')}
        </Button>
      </CardActions>
    </Card>
  )

  return displayHorizontally ? horizontalCard : verticalCard
}
export default CollectionCard
