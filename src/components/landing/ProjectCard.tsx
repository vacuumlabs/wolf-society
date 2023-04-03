import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  BreakpointOverrides,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import Button from '../Button'
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
        width: '100%',
        '& .MuiCardContent-root': {
          mobile: {},
          [breakpoint]: { translate: '0 48px' },
          desktopM: { translate: '0 56px' },
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
        <CardMedia
          component="img"
          height="300"
          image={imageUrl}
          alt="Project image"
        />
        <CardContent sx={{ p: 0, transition: 'translate 0.25s' }}>
          <Typography
            variant="caption"
            color="secondary"
            sx={{ p: 4, textAlign: 'start' }}
          >
            {name}
          </Typography>
          <Button
            component="div"
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
