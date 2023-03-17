import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import ArrowForward from '@mui/icons-material/ArrowForward'

export type ProjectCardProps = {
  name: string
  imageUrl: string
}

const ProjectCard = ({ name, imageUrl }: ProjectCardProps) => {
  return (
    <Card sx={{ maxWidth: 404, borderRadius: 0 }}>
      <CardMedia component="img" height="300" image={imageUrl} alt="hmm" />
      <CardContent sx={{ bgcolor: 'secondary.main', p: 4, textAlign: 'start' }}>
        <Typography variant="h2" color="dkGreen.main">
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button
          color="primary"
          variant="contained"
          sx={{ width: '100%', borderRadius: 0 }}
          endIcon={<ArrowForward />}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  )
}
export default ProjectCard
