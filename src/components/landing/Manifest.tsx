import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import MuiMarkdown from 'mui-markdown'
import AppearingComponent from '../AppearingComponent'
import { RandomReveal, useRandomReveal } from 'react-random-reveal'
import React, { useState } from 'react'

type Props = {
  manifestRef: React.RefObject<HTMLElement>
}

const Manifest = ({ manifestRef }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  const [isPlaying, setIsPalying] = useState(false)
  const characters = useRandomReveal({
    isPlaying: isPlaying,
    duration: 1,
    revealDuration: 1,
    characters: translate('manifestTitle'),
  })
  const text = useRandomReveal({
    isPlaying: isPlaying,
    duration: 1,
    revealDuration: 1,
    characters: translate('manifestContent'),
    ignoreCharacterSet: [' '],
  })
  return (
    <Box
      ref={manifestRef}
      sx={{ bgcolor: 'secondary.main', textAlign: 'center' }}
    >
      <AppearingComponent>
        <Container>
          <Stack sx={{ gap: 4, my: { mobile: 10, desktopM: 20 } }}>
            <Typography
              variant="caption"
              color="neutral.main"
              sx={{ textAlign: 'center' }}
            >
              {characters}
            </Typography>
            <Box>
              <Typography
                sx={{ textAlign: 'center' }}
                color="neutral.main"
                display="inline"
              >
                <MuiMarkdown>{text}</MuiMarkdown>
              </Typography>
            </Box>
            <Button onClick={() => setIsPalying(true)}>show</Button>
          </Stack>
        </Container>
      </AppearingComponent>
    </Box>
  )
}
export default Manifest
