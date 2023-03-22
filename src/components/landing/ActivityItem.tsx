import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Image, { StaticImageData } from 'next/image'

type ActivityItemProps = {
  title: string
  description: string
  image: StaticImageData
  imageOnTheRight?: boolean
}

const ActivityItem = ({
  title,
  description,
  image,
  imageOnTheRight = true,
}: ActivityItemProps) => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletS'
  const theme = useTheme()
  const displayHorizontally = useMediaQuery(theme.breakpoints.up(breakpoint))
  const displayImageOnTheRight = !displayHorizontally || imageOnTheRight

  const textStack = (
    <Stack
      sx={{
        gap: 4,
        py: { mobile: 0, [breakpoint]: 8 },
        pb: { mobile: 5, [breakpoint]: 0 },
        pl: displayImageOnTheRight ? 0 : 17,
        textAlign: { mobile: 'center', [breakpoint]: 'start' },
      }}
      height="100%"
      justifyContent="center"
    >
      <Typography variant="h1" component="h2">
        {title}
      </Typography>
      <Typography>{description}</Typography>
      <Box>
        <Button color="black" variant="outlined">
          {translate('readMore')}
        </Button>
      </Box>
    </Stack>
  )

  const imageBox = (
    <Box sx={{ position: 'relative' }} width="100%" height="100%">
      {displayHorizontally ? (
        <Image src={image} alt={title} fill style={{ objectFit: 'contain' }} />
      ) : (
        <Image
          src={image}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </Box>
  )

  return (
    <Grid container sx={{ my: { mobile: 5, [breakpoint]: 17 } }}>
      <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
        {displayImageOnTheRight ? textStack : imageBox}
      </Grid>
      <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
        {displayImageOnTheRight ? imageBox : textStack}
      </Grid>
    </Grid>
  )
}
export default ActivityItem
