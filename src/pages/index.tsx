import {
  injectTranslations,
  useTranslations,
} from '@/utils/hooks/useTranslations'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import React from 'react'
import Image from 'next/image'
import heroImage from 'public/images/hero.png'

const Home = () => {
  const t = useTranslations()
  return (
    <Stack>
      <Box sx={{ bgcolor: '#F2F2E7' }}>
        <Container>
          <Stack sx={{ gap: 4, mt: '222px', textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{ fontWeight: 600, textTransform: 'uppercase' }}
            >
              The Earth Is What We ALL Have In Common
            </Typography>
            <Box>
              <Typography variant="h2" display="inline">
                Together we are supporting projects that matters to the Earth.
              </Typography>
              <Typography variant="h2" display="inline" color="primary">
                {} You are Wolf Society
              </Typography>
            </Box>
            <Stack sx={{ alignItems: 'center' }}>
              <Button variant="contained" sx={{ borderRadius: 0 }}>
                Make Impact
              </Button>
            </Stack>
          </Stack>
        </Container>
        <Box
          sx={{ height: { xs: '365px', sm: '730px' }, position: 'relative' }}
        >
          <Image
            src={heroImage}
            alt="Hero image"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#2B4B2A' }}>
        <Container>
          <Stack sx={{ gap: 4, py: '160px' }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              MANIFEST
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
              At Wolf society we build products that empower creators in the
              evolving world of Web3. We believe creators should not only own
              their work but they should have access to the tools to create new
              experiences for their audiences. Since our inception, we push the
              technical boundaries of what NFTs can do and harness those
              advancements into products for artists.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Stack>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    // Will be passed to the page component as props
    props: {
      translations: await injectTranslations(locale),
    },
  }
}

export default Home
