import { Box, Container, Stack, Typography, Button } from '@mui/material'
import Image from 'next/image'
import heroImage from 'public/images/hero.png'

const Hero = () => {
  return (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <Container>
        <Stack sx={{ gap: 4, mt: '222px', textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontWeight: 600 }}>
            The Earth Is What We ALL Have In Common
          </Typography>
          <Box>
            <Typography variant="body1" display="inline">
              Together we are supporting projects that matter to the Earth.
            </Typography>
            <Typography variant="body1" display="inline" color="primary">
              {} You are Wolf Society
            </Typography>
          </Box>
          <Stack sx={{ alignItems: 'center' }}>
            <Button variant="contained">Make Impact</Button>
          </Stack>
        </Stack>
      </Container>
      <Box
        sx={{
          height: { mobile: '365px', tabletM: '730px' },
          position: 'relative',
        }}
      >
        <Image
          src={heroImage}
          alt="Hero image"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </Box>
    </Box>
  )
}

export default Hero
