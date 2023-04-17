import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  Button,
  Container,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import AppearingComponent from '../AppearingComponent'
import { useEffect, useRef } from 'react'
import MuiMarkdown from 'mui-markdown'
import { SUBPAGES } from '@/consts'

type Props = {
  manifestRef: React.RefObject<HTMLElement>
}
type ManifestTitleOptions =
  | 'manifestTitle1'
  | 'manifestTitle2'
  | 'manifestTitle3'
  | 'manifestTitle4'
type ManifestContentOptions =
  | 'manifestContent1'
  | 'manifestContent2'
  | 'manifestContent3'
  | 'manifestContent4'

const Manifest = ({ manifestRef }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  const titles: ManifestTitleOptions[] = [
    'manifestTitle1',
    'manifestTitle2',
    'manifestTitle3',
    'manifestTitle4',
  ]
  const texts: ManifestContentOptions[] = [
    'manifestContent1',
    'manifestContent2',
    'manifestContent3',
    'manifestContent4',
  ]
  const component = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  if (!isMobile) gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    if (isMobile) return
    let ctx = gsap.context(() => {
      const pixelsPause = 0
      let panels = gsap.utils.toArray('.manifest-panel')
      if (panels.length) {
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: slider.current,
            scrub: 0,
            start: `top+=${pixelsPause} top`,
            end: () => '+=' + window.innerWidth * panels.length,
          },
        })
        ScrollTrigger.create({
          trigger: slider.current,
          end: () => '+=' + (window.innerWidth * panels.length + pixelsPause),
          pin: true,
        })
      }
    }, component)
    return () => ctx.revert()
  })

  const content = (
    <>
      {texts.map((text, index) => (
        <Box
          pt={4}
          key={`ManifestText${index}`}
          className="manifest-panel"
          sx={{ width: '100vw' }}
        >
          <Container>
            <Typography
              variant="caption"
              color="neutral.main"
              sx={{ textAlign: 'center', mb: 4 }}
            >
              {translate(titles[index])}
            </Typography>
            <Typography
              sx={{ textAlign: 'center' }}
              color="neutral.main"
              display="inline"
            >
              <MuiMarkdown>{translate(text)}</MuiMarkdown>
            </Typography>

            {index === texts.length - 1 && (
              <Stack sx={{ alignItems: 'center', mt: '32px' }}>
                <Button variant="contained" href={SUBPAGES['collections']}>
                  {translate('makeImpact')}
                </Button>
              </Stack>
            )}
          </Container>
        </Box>
      ))}
    </>
  )

  return (
    <Box
      ref={manifestRef}
      sx={{ bgcolor: 'secondary.main', textAlign: 'center' }}
    >
      <AppearingComponent>
        {isMobile ? (
          <>{content.props.children}</>
        ) : (
          <Stack>
            <Box>
              <Stack
                ref={component}
                sx={{
                  overflow: 'hidden',
                }}
              >
                <Box
                  ref={slider}
                  sx={
                    isMobile
                      ? {}
                      : {
                          pt: '80px',
                          width: `${100 * texts.length}vw`,
                          height: `calc(${100 * texts.length}vw + 100vh)`,
                          display: 'flex',
                          flexWrap: 'wrap',
                        }
                  }
                  className="container"
                >
                  {content.props.children}
                </Box>
              </Stack>
            </Box>
          </Stack>
        )}
      </AppearingComponent>
    </Box>
  )
}
export default Manifest
