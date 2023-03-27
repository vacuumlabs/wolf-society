import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Button from '../Button'
import { Parallax } from 'react-scroll-parallax'
import ArrowRightIcon from '../icons/ArrowRightIcon'

export type TopicCardProps = {
  title: string
  date: string
  imageUrl: string
  offsetLeft: boolean
}

const TopicCard = ({ title, date, imageUrl, offsetLeft }: TopicCardProps) => {
  const translate = useContentful(ContentTypes.landingPage)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletS')
  )

  const topicCard = (
    <Card
      sx={{
        maxWidth: 404,
        width: '100%',
        ml: { mobile: 0, desktopM: offsetLeft ? 40 : 0 },
        mr: { mobile: 0, desktopM: offsetLeft ? 0 : 40 },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt="Article image"
      />
      <CardContent sx={{ bgcolor: 'neutral.main', p: 4, textAlign: 'start' }}>
        <Stack spacing={4}>
          <Typography variant="body2">{date}</Typography>
          <Typography variant="caption">{title}</Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button sx={{ width: '100%' }} endIcon={<ArrowRightIcon />}>
          {translate('readMore')}
        </Button>
      </CardActions>
    </Card>
  )

  return isMobile ? topicCard : <Parallax speed={100}>{topicCard}</Parallax>
}
export default TopicCard
