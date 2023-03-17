import { Box, Button, Container, Stack, Typography } from '@mui/material'

const Projects = () => {
  return (
    <Box sx={{ bgcolor: 'dkGreen.main', textAlign: 'center' }}>
      <Container>
        <Stack sx={{ gap: 4, py: '160px' }}>
          <Typography
            variant="h1"
            color="secondary"
            sx={{ textAlign: 'center' }}
          >
            🌐
          </Typography>
          <Typography
            variant="h1"
            color="secondary"
            sx={{ textAlign: 'center' }}
          >
            Supported
            <br /> Projects
          </Typography>
          <Stack sx={{ alignItems: 'center' }}>
            <Button
              color="secondary"
              variant="outlined"
              sx={{ borderRadius: 0 }}
            >
              All Projects
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
export default Projects
