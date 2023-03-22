import { Box, Button, Container, Icon, Stack, Typography } from '@mui/material'
import WSFSymbol from '../icons/WSFSymbol'

const CTA = () => {
  const wsfSymbol = (
    <Icon
      sx={(theme) => ({
        fontSize: theme.typography.h2,
        display: {
          mobile: 'none',
          tabletS: 'inline-block',
        },
      })}
    >
      <Box color="neutral.400">
        <WSFSymbol
          sx={(theme) => ({
            fontSize: theme.typography.h2,
          })}
        />
      </Box>
    </Icon>
  )
  return (
    <Box
      sx={{
        bgcolor: 'neutral.400',
        textAlign: 'center',
        pt: { mobile: 0, tabletS: 20 },
      }}
    >
      <Container>
        <Button
          color="primary"
          variant="contained"
          sx={(theme) => ({
            borderRadius: '170px',
            width: '100%',
            height: { mobile: '112px', desktopM: '256px' },
          })}
        >
          <Stack direction="row" alignItems="center" gap={4}>
            {wsfSymbol}
            <Typography variant="h2">Make Impact</Typography>
            {wsfSymbol}
          </Stack>
        </Button>
      </Container>
    </Box>
  )
}
export default CTA
