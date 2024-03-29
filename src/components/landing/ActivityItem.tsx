import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import AppearingComponent from '../AppearingComponent'
import Button from '../Button'
import CloseIcon from '../icons/CloseIcon'

type ActivityItemProps = {
  title: string
  description: string
  imageElement: JSX.Element
  mobileImage: StaticImageData
  imageOnTheRight?: boolean
  drawerContent: React.ReactNode
}

const ActivityItem = ({
  title,
  description,
  imageElement,
  mobileImage,
  imageOnTheRight = true,
  drawerContent,
}: ActivityItemProps) => {
  const [drawerOpened, setDrawerOpened] = useState(false)
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
        textAlign: { mobile: 'center', [breakpoint]: 'start' },
      }}
      height="100%"
      justifyContent="center"
    >
      <Typography variant="display" component="h2">
        {title}
      </Typography>
      <Typography variant={displayHorizontally ? 'body1' : 'body2'}>
        {description}
      </Typography>
      <Box>
        <Button variant="outlined" onClick={() => setDrawerOpened(true)}>
          {translate('readMore')}
        </Button>
      </Box>
    </Stack>
  )

  const imageBox = (
    <Box
      sx={{ position: 'relative', display: 'grid', alignItems: 'center' }}
      width="100%"
      height="100%"
    >
      {displayHorizontally ? (
        imageElement
      ) : (
        <Image
          src={mobileImage}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </Box>
  )

  return (
    <AppearingComponent>
      <Grid container sx={{ py: { mobile: 5, [breakpoint]: 10 } }}>
        <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
          {displayImageOnTheRight ? textStack : imageBox}
        </Grid>
        {!imageOnTheRight && <Grid item mobile={12} {...{ [breakpoint]: 1 }} />}
        <Grid
          item
          mobile={12}
          {...{ [breakpoint]: displayImageOnTheRight ? 6 : 5 }}
        >
          {displayImageOnTheRight ? imageBox : textStack}
        </Grid>
      </Grid>
      <Drawer
        anchor="right"
        open={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        PaperProps={{
          sx: (theme) => ({
            overflowY: 'hidden',
            backgroundColor: theme.palette.neutral[400],
            width: {
              mobile: 'inherit',
              desktopS: '50%',
            },
          }),
        }}
      >
        <Stack direction="column" sx={{ overflowY: 'auto' }}>
          <Box
            position="absolute"
            left={0}
            right={0}
            bgcolor="neutral.400"
            p={2}
            zIndex={1}
          >
            <Stack justifyContent="end" direction="row">
              <IconButton onClick={() => setDrawerOpened(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>
          <Stack py={10} px={{ mobile: 3, [breakpoint]: 10 }}>
            <Typography variant="caption" pb={3}>
              {title}
            </Typography>
            <Typography variant="body1" pb={5} pr={4}>
              {description}
            </Typography>
            {drawerContent}
          </Stack>
        </Stack>
      </Drawer>
    </AppearingComponent>
  )
}
export default ActivityItem
