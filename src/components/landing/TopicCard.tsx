import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
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
  return (
    <Parallax speed={100}>
      <Card
        sx={{
          maxWidth: 404,
          width: '100%',
          ml: { mobile: 0, desktopM: offsetLeft ? 40 : 0 },
          mr: { mobile: 0, desktopM: offsetLeft ? 0 : 40 },
        }}
      >
        <CardMedia component="img" height="300" image={imageUrl} alt="hmm" />
        <CardContent sx={{ bgcolor: 'neutral.main', p: 4, textAlign: 'start' }}>
          <Stack spacing={4}>
            <Typography variant="body2">{date}</Typography>
            <Typography variant="caption">{title}</Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ width: '100%' }}
            endIcon={<ArrowRightIcon />}
          >
            {translate('readMore')}
          </Button>
        </CardActions>
      </Card>
    </Parallax>
  )
}
export default TopicCard
