import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import { Fragment, useRef, useState } from 'react'
import Button from '../Button'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import CloseIcon from '../icons/CloseIcon'
import MuiMarkdown from 'mui-markdown'
import { SUBPAGES } from '@/consts'

export type ProjectCardProps = {
  name: string
  imageUrl: string
  description: string
}

const ProjectCard = ({ name, imageUrl, description }: ProjectCardProps) => {
  const [drawerOpened, setDrawerOpened] = useState(false)
  const translate = useContentful(ContentTypes.landingPage)
  const translateCommon = useContentful(ContentTypes.common)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'
  const [scrollTarget, setScrollTarget] = useState<Node | Window | undefined>()
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    target: scrollTarget,
  })
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
  return (
    <>
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
        <CardActionArea onClick={toggleDrawer(true)}>
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
      <Drawer
        anchor="right"
        open={drawerOpened}
        onClose={toggleDrawer(false)}
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
        <Stack
          direction="column"
          sx={{ overflowY: 'auto' }}
          ref={(node) => {
            if (node) {
              setScrollTarget(node)
            }
          }}
        >
          <Box
            position="absolute"
            left={0}
            right={0}
            bgcolor={scrollTrigger ? 'neutral.400' : 'transparent'}
            p={2}
          >
            <Stack justifyContent="end" direction="row">
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>
          <Box width="100%" height="400px">
            <img
              src={imageUrl}
              alt={name}
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Stack
            pt={10}
            pb={{ mobile: 5, tabletS: 10 }}
            px={{ mobile: 3, tabletS: 10 }}
            gap={4}
            flexGrow={1}
          >
            <Typography variant="title">{name}</Typography>
            <Typography variant="body2" flexGrow={1}>
              {description}
            </Typography>
            <Button href={SUBPAGES['collections']}>
              {translateCommon('makeImpactButton')}
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </>
  )
}
export default ProjectCard
