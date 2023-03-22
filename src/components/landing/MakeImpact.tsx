import { Box, Button, Container, Stack, Typography } from '@mui/material'

const MakeImpact = () => {
  return (
    <Box sx={{ bgcolor: 'neutral.400', textAlign: 'center' }}>
      <Container>
        <Stack sx={{ gap: 4, my: { mobile: 10, desktopM: 20 } }}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Make Impact
          </Typography>
          <Box>
            <Typography sx={{ textAlign: 'center' }} display="inline">
              Philanthropy doesn&apos;t have to be just about giving. Collect
              these limited edition NFT artworks and get rewarded. Explore our
              current collections of NFT artwork and find out how Wolf Society
              will reward you for your kind contribution.
            </Typography>
          </Box>
          <Stack sx={{ alignItems: 'center' }}>
            <Button color="black" variant="outlined">
              Read more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
export default MakeImpact
