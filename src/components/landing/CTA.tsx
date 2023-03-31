import { SUBPAGES } from '@/consts'
import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Container, Icon, Stack, Typography } from '@mui/material'
import Button from '../Button'
import WSFSymbol from '../icons/WSFSymbol'

const CTA = () => {
  const translate = useContentful(ContentTypes.common)
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
      }}
    >
      <Container>
        <Button
          sx={{
            borderRadius: '170px',
            width: '100%',
            height: { mobile: '112px', desktopM: '256px' },
          }}
          href={SUBPAGES['collections']}
        >
          <Stack direction="row" alignItems="center" gap={4}>
            {wsfSymbol}
            <Typography
              variant="headline"
              sx={(theme) => ({
                // Headline L for M breakpoint
                [theme.breakpoints.up('desktopM')]: {
                  fontSize: '100px',
                  lineHeight: '96px',
                },
              })}
            >
              {translate('makeImpactButton')}
            </Typography>
            {wsfSymbol}
          </Stack>
        </Button>
      </Container>
    </Box>
  )
}
export default CTA
