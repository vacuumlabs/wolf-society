import { Box, Container, Stack, Typography } from '@mui/material'

const Manifest = () => {
  return (
    <Box sx={{ bgcolor: 'dkGreen.main', textAlign: 'center' }}>
      <Container>
        <Stack sx={{ gap: 4, py: '160px' }}>
          <Typography
            variant="h2"
            color="secondary"
            sx={{ textAlign: 'center' }}
          >
            MANIFEST
          </Typography>
          <Box>
            <Typography
              sx={{ textAlign: 'center' }}
              color="secondary.light"
              display="inline"
            >
              At Wolf society we build products that empower creators in the
              evolving world of Web3. We believe creators should not only own
              their work but they should have access
            </Typography>
            <Typography
              sx={{ textAlign: 'center' }}
              color="secondary"
              display="inline"
            >
              {} to the tools to create new experiences for their audiences.
              Since our inception, we push the technical boundaries of what NFTs
              can do and harness those advancements into products for artists.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
export default Manifest
