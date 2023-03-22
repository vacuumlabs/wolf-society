import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import ArrowRightIcon from '../icons/ArrowRightIcon'

export type ProjectCardProps = {
  name: string
  imageUrl: string
}

const ProjectCard = ({ name, imageUrl }: ProjectCardProps) => {
  const translate = useContentful(ContentTypes.landingPage)
  return (
    <Card sx={{ maxWidth: 404, width: '100%' }}>
      <CardMedia component="img" height="300" image={imageUrl} alt="hmm" />
      <CardContent sx={{ bgcolor: 'neutral.main', p: 4, textAlign: 'start' }}>
        <Typography variant="h3" color="secondary">
          {name}
        </Typography>
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
  )
}
export default ProjectCard
