import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

const MakeImpact = () => {
  const translate = useContentful(ContentTypes.landingPage)
  const bannerRef = useRef<null | HTMLDivElement>(null)
  console.log(bannerRef?.current?.getBoundingClientRect())

  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const top = bannerRef?.current?.getBoundingClientRect().top
      if (top)
        if (
          top > window.screenTop + window.innerHeight ||
          top + 300 < window.screenTop
        )
          setScrollPosition(0)
        else setScrollPosition(scrollPosition - 1)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollPosition])

  console.log(scrollPosition)

  return (
    <Box
      sx={{ bgcolor: 'neutral.400', textAlign: 'center', overflow: 'hidden' }}
    >
      <Typography
        display="inline-block"
        ref={bannerRef}
        variant="overline"
        sx={{
          textAlign: 'left',
          width: '100000vw',
          ml: scrollPosition,
          transition: 'all 1s ease-out',
          color: 'secondary.500',
        }}
      >
        {`${(translate('makeImpact') + ' ').repeat(100)}`}
      </Typography>
      <Container>
        <Stack sx={{ gap: 4, my: { mobile: 10, desktopM: 20 } }}>
          <Typography variant="title" sx={{ textAlign: 'center' }}>
            {translate('makeImpact')}
          </Typography>
          <Box>
            <Typography sx={{ textAlign: 'center' }} display="inline">
              {translate('makeImpactText')}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
export default MakeImpact
