import { SUBPAGES } from '@/consts'
import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Container, Icon, Stack, Typography } from '@mui/material'
import AppearingComponent from '../AppearingComponent'
import Button from '../Button'
import WSFSymbol from '../icons/WSFSymbol'
import Link from 'next/link'

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
      <AppearingComponent>
        <Container>
          <Link href={SUBPAGES['collections'] || ''} passHref>
            <Button
              sx={{
                borderRadius: '170px',
                width: '100%',
                height: { mobile: '112px', desktopM: '256px' },
              }}
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
          </Link>
        </Container>
      </AppearingComponent>
    </Box>
  )
}
export default CTA
