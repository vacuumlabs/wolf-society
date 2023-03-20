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
import VisibilityIcon from '@mui/icons-material/Visibility'

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
  const theme = useTheme()
  const displayHorizontally = useMediaQuery(theme.breakpoints.up('tabletM'))

  const horizontalCard = (
    <Card
      sx={{
        borderRadius: 0,
        display: 'flex',
        width: '100%',
        height: '100vh',
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
                variant="h3"
                color="neutral.main"
                sx={{ 'white-space': 'pre-wrap' }}
              >
                {subtitle}
              </Typography>
              <Typography variant="h2" color="neutral.main">
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
            <Button
              color="primary"
              variant="contained"
              sx={{ borderRadius: 0 }}
            >
              Show collection
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  )

  const verticalCard = (
    <Card sx={{ borderRadius: 0 }}>
      <CardContent sx={{ bgcolor: `${color}`, p: 5, textAlign: 'start' }}>
        <Stack gap={4}>
          <Typography
            variant="h3"
            color="neutral.main"
            sx={{ 'white-space': 'pre-wrap' }}
          >
            {subtitle}
          </Typography>
          <Typography variant="h2" color="neutral.main">
            {name}
          </Typography>
        </Stack>
      </CardContent>
      <Box sx={{ p: 5, bgcolor: 'neutral.main' }}>
        <CardMedia component="img" image={imageUrl} alt={name} />
      </Box>

      <CardActions sx={{ padding: 0 }}>
        <Button
          color="primary"
          variant="contained"
          sx={{ width: '100%', borderRadius: 0 }}
        >
          Show collection
        </Button>
      </CardActions>
    </Card>
  )

  return displayHorizontally ? horizontalCard : verticalCard
}
export default CollectionCard
