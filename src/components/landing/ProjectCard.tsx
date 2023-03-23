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
import { Parallax } from 'react-scroll-parallax'
import ArrowRightIcon from '../icons/ArrowRightIcon'

export type ProjectCardProps = {
  name: string
  imageUrl: string
  offsetLeft: boolean
}

const ProjectCard = ({ name, imageUrl, offsetLeft }: ProjectCardProps) => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'
  return (
    <Parallax speed={100}>
      <Card
        sx={{
          ml: { mobile: 0, desktopM: offsetLeft ? 40 : 0 },
          mr: { mobile: 0, desktopM: offsetLeft ? 0 : 40 },
          bgcolor: 'neutral.main',
          maxWidth: 424,
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
              variant="caption"
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
    </Parallax>
  )
}
export default ProjectCard
