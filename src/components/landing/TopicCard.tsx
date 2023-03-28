import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import Button from '../Button'
import ArrowRightIcon from '../icons/ArrowRightIcon'

export type TopicCardProps = {
  title: string
  date: string
  imageUrl: string
}

const TopicCard = ({ title, date, imageUrl }: TopicCardProps) => {
  const translate = useContentful(ContentTypes.landingPage)

  return (
    <Card
      sx={{
        width: '100%',
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
}
export default TopicCard
