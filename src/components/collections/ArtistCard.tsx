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
  name?: string
  imageUrl?: string
  text?: string
  color: string
  translucent: boolean
}

const ArtistCard = ({
  name,
  imageUrl,
  text,
  color,
  translucent,
}: ArtistCardProps) => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(breakpoint)
  )

  const lastName = name?.substring(name?.lastIndexOf(' '))
  const firstName = name?.substring(0, name?.lastIndexOf(' '))

  return isMobile ? null : (
    <Box
      sx={{
        position: 'relative',
        opacity: translucent ? 0.2 : 1,
        transition: 'opacity 0.25s',
      }}
    >
      <Card
        sx={{
          bgcolor: 'neutral.main',
          width: '100%',
          '&.MuiPaper-root': {
            maxHeight: 'calc(100vh - 80px)',
          },
        }}
      >
        <Box
          sx={{
            maxHeight: {
              desktopS: 'calc(100vh - 80px - 152px)',
              desktopM: 'calc(100vh - 80px - 248px)',
              desktopL: 'calc(100vh - 80px - 312px)',
            },
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            sx={{
              width: '100%',
              height: '100%',
            }}
            alt="Artist image"
          />
        </Box>
        <Typography
          variant="headline"
          color={color}
          sx={{
            p: 4,
            pt: { mobile: 8, [breakpoint]: 11 },
            textAlign: 'start',
          }}
        >
          {firstName}
          <br />
          {lastName}
        </Typography>
      </Card>
      <Typography
        variant="handwritingLarge"
        sx={{
          position: { mobile: 'relative', [breakpoint]: 'absolute' },
          top: '50%',
          maxWidth: {
            mobile: '100%',
            [breakpoint]: '416px',
            desktopM: '446px',
          },
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
