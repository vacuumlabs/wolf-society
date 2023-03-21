import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import ArrowRightIcon from '../icons/ArrowRightIcon'

export type TopicCardProps = {
  title: string
  date: string
  imageUrl: string
}

const TopicCard = ({ title, date, imageUrl }: TopicCardProps) => {
  return (
    <Card sx={{ maxWidth: 404, width: '100%' }}>
      <CardMedia component="img" height="300" image={imageUrl} alt="hmm" />
      <CardContent sx={{ bgcolor: 'neutral.main', p: 4, textAlign: 'start' }}>
        <Stack spacing={4}>
          <Typography variant="body2">{date}</Typography>
          <Typography variant="h3">{title}</Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button
          color="primary"
          variant="contained"
          sx={{ width: '100%' }}
          endIcon={<ArrowRightIcon />}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  )
}
export default TopicCard
