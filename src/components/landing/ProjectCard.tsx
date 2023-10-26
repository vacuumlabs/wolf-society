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
import { useState } from 'react'
import Button from '../Button'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import CloseIcon from '../icons/CloseIcon'
import { SUBPAGES } from '@/consts'
import TypographyWithTooltips from '../TypographyWithTooltips'
import Link from 'next/link'
import CardButton from '@/components/CardButton'
import Image from 'next/image'
import { addProtocolToUrl } from '@/utils/helpers'

export type ProjectCardProps = {
  name: string
  imageUrl: string
  description: string
  location: string
  project: string
  timeFrame: string
  partnerLogoImageUrl?: string
}

const ProjectCard = ({
  name,
  imageUrl,
  description,
  location,
  project,
  timeFrame,
  partnerLogoImageUrl,
}: ProjectCardProps) => {
  const [drawerOpened, setDrawerOpened] = useState(false)
  const translate = useContentful(ContentTypes.landingPage)
  const translateCommon = useContentful(ContentTypes.common)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'
  const [scrollTarget, setScrollTarget] = useState<Node | Window | undefined>()
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    target: scrollTarget,
  })

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
        <CardActionArea onClick={() => setDrawerOpened(true)}>
          <CardMedia
            component="img"
            height="300"
            image={imageUrl}
            alt="Project image"
          />
          <CardContent sx={{ p: 0, transition: 'translate 0.25s' }}>
            <Stack sx={{ p: 4, textAlign: 'start' }}>
              <Box>
                <Typography
                  variant="caption"
                  color="neutral.700"
                  display="inline"
                >
                  {translate('location')}
                  {`: `}
                </Typography>
                <Typography
                  variant="caption"
                  color="secondary"
                  display="inline"
                >
                  {location}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="neutral.700"
                  display="inline"
                >
                  {translate('project')}
                  {`: `}
                </Typography>
                <Typography
                  variant="caption"
                  color="secondary"
                  display="inline"
                >
                  {project}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="neutral.700"
                  display="inline"
                >
                  {translate('timeFrame')}
                  {`: `}
                </Typography>
                <Typography
                  variant="caption"
                  color="secondary"
                  display="inline"
                >
                  {timeFrame}
                </Typography>
              </Box>
            </Stack>
            <CardButton sx={{ width: '100%' }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="button">
                  {translate('readMore')}
                </Typography>
                <ArrowRightIcon />
              </Stack>
            </CardButton>
          </CardContent>
        </CardActionArea>
      </Card>
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
        <Stack
          direction="column"
          height="100%"
          sx={{ overflowY: 'auto' }}
          ref={(node) => {
            if (node) {
              setScrollTarget(node)
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              flexBasis: '400px',
              flexShrink: 0,
            }}
          >
            <Image
              src={addProtocolToUrl(imageUrl)}
              alt={name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box
            position="absolute"
            left={0}
            right={0}
            bgcolor={scrollTrigger ? 'neutral.400' : 'transparent'}
            p={2}
          >
            <Stack justifyContent="end" direction="row">
              <IconButton onClick={() => setDrawerOpened(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>
          <Stack
            pt={{ mobile: 5, tabletS: 10 }}
            pb={{ mobile: 5, tabletS: 10 }}
            px={{ mobile: 3, tabletS: 10 }}
            gap={4}
            flexGrow={1}
          >
            <Typography variant="title">{name}</Typography>
            <TypographyWithTooltips
              text={description}
              key={name}
              variant="body2"
              flexGrow={1}
            />
            {partnerLogoImageUrl != null && (
              <>
                <Typography variant="caption">
                  {translate('projectEndorsedBy')}
                </Typography>
                <Box position={'relative'} height={100}>
                  <Image fill src={partnerLogoImageUrl} alt={'Partner Logo'} />
                </Box>
              </>
            )}
            <Link href={SUBPAGES.collections} passHref>
              <Button fullWidth>{translateCommon('makeImpactButton')}</Button>
            </Link>
          </Stack>
        </Stack>
      </Drawer>
    </>
  )
}
export default ProjectCard
