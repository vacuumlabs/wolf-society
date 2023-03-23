import { SUBPAGES } from '@/consts'
import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Button, Container, Icon, Stack, Typography } from '@mui/material'
import WSFSymbol from '../icons/WSFSymbol'

const CTA = () => {
  const translate = useContentful(ContentTypes.landingPage)
  const wsfSymbol = (
    <Icon
      sx={(theme) => ({
        fontSize: theme.typography.headline,
        display: {
          mobile: 'none',
          tabletS: 'inline-block',
        },
      })}
    >
      <Box color="neutral.400">
        <WSFSymbol
          sx={(theme) => ({
            fontSize: theme.typography.headline,
            color: 'primary.contrastText',
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
          sx={{
            borderRadius: '170px',
            width: '100%',
            height: { mobile: '112px', desktopM: '256px' },
          }}
          href={SUBPAGES['collections']}
        >
          <Stack direction="row" alignItems="center" gap={4}>
            {wsfSymbol}
            <Typography variant="headline">
              {translate('makeImpact')}
            </Typography>
            {wsfSymbol}
          </Stack>
        </Button>
      </Container>
    </Box>
  )
}
export default CTA
