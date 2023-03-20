import { Box, Container, Stack, Typography } from '@mui/material'

const Manifest = () => {
  return (
    <Box sx={{ bgcolor: 'secondary.main', textAlign: 'center' }}>
      <Container>
        <Stack sx={{ gap: 4, my: { mobile: 10, desktopM: 20 } }}>
          <Typography
            variant="h3"
            color="neutral.main"
            sx={{ textAlign: 'center' }}
          >
            Manifesto
          </Typography>
          <Box>
            <Typography
              sx={{ textAlign: 'center' }}
              color="neutral.main"
              display="inline"
            >
              At Wolf society we build products that empower creators in the
              evolving world of Web3. We believe creators should not only own
              their work but they should have access to the tools to create new
              experiences for their audiences. Since our inception, we push the
              technical boundaries of what NFTs can do and harness those
              advancements into products for artists.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
export default Manifest
