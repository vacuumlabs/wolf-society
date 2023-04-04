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

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setDrawerOpened(open)
    }

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
      <Typography variant="display" component="h2">
        {title}
      </Typography>
      <Typography>{description}</Typography>
      <Box>
        <Button variant="outlined" onClick={toggleDrawer(true)}>
          {translate('readMore')}
        </Button>
      </Box>
    </Stack>
  )

  const imageBox = (
    <Box sx={{ position: 'relative' }} width="100%" height="100%">
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
      <Grid container sx={{ my: { mobile: 5, [breakpoint]: 17 } }}>
        <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
          {displayImageOnTheRight ? textStack : imageBox}
        </Grid>
        <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
          {displayImageOnTheRight ? imageBox : textStack}
        </Grid>
      </Grid>
      <Drawer
        anchor="right"
        open={drawerOpened}
        onClose={toggleDrawer(false)}
        sx={(theme) => ({
          '& .MuiPaper-root': {
            width: {
              mobile: 'inherit',
              desktopS: '50%',
              backgroundColor: theme.palette.neutral[400],
            },
          },
        })}
      >
        <Stack>
          <Stack sx={{ alignSelf: 'end' }} p={2}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Stack px={10}>
          <Typography variant="caption" pb={3}>
            {title}
          </Typography>
          <Typography variant="body1" pb={5} pr={4}>
            {description}
          </Typography>
          {drawerContent}
        </Stack>
      </Drawer>
    </AppearingComponent>
  )
}
export default ActivityItem
