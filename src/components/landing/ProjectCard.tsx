import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  BreakpointOverrides,
  Button,
  Card,
  CardActionArea,
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
  const breakpoint: keyof BreakpointOverrides = 'desktopS'
  return (
    <Card
      sx={{
        bgcolor: 'neutral.main',
        maxWidth: 404,
        width: '100%',
        '& .MuiCardContent-root': {
          mobile: {},
          [breakpoint]: { translate: '0 64px' },
        },
        '&:hover .MuiCardContent-root': {
          mobile: {},
          [breakpoint]: { translate: '0 0' },
        },
      }}
    >
      <CardActionArea
        onClick={() => {
          console.log(`Clicked ${name}`)
        }}
      >
        <CardMedia component="img" height="300" image={imageUrl} alt="hmm" />
        <CardContent sx={{ p: 0, transition: 'translate 0.25s' }}>
          <Typography
            variant="title"
            color="secondary"
            sx={{ p: 4, textAlign: 'start', transition: 'translate 0.25s' }}
          >
            {name}
          </Typography>
          <Button
            component="div"
            color="primary"
            variant="contained"
            sx={{ width: '100%' }}
            endIcon={<ArrowRightIcon />}
          >
            {translate('readMore')}
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default ProjectCard
