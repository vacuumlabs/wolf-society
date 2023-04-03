import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  BreakpointOverrides,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Theme,
  useMediaQuery,
} from '@mui/material'

export type ArtistCardProps = {
  name: string
  imageUrl: string
  text: string
  color: string
}

const ArtistCard = ({ name, imageUrl, text, color }: ArtistCardProps) => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletS')
  )
  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        sx={{
          bgcolor: 'neutral.main',
          width: '100%',
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          sx={{ width: '100%', height: '100%', maxHeight: '622px' }}
          alt="Project image"
        />
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="headline"
            color={color}
            sx={{
              p: 4,
              pt: { mobile: 8, [breakpoint]: 11 },
              textAlign: 'start',
              width: '50%',
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
      <Typography
        variant="handwritingLarge"
        sx={{
          position: { mobile: 'relative', [breakpoint]: 'absolute' },
          top: '50%',
          maxWidth: { mobile: '100%', [breakpoint]: '416px' },
          transform: {
            mobile: 'rotate(-3.66deg)',
            [breakpoint]: 'translate(-50%, 0%) rotate(-3.66deg)',
          },
          pb: { mobile: 5, [breakpoint]: 0 },
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}
export default ArtistCard
