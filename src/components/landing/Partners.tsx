import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import VacuumlabsIcon from '../icons/VacuumlabsIcon'
import AppearingComponent from '../AppearingComponent'

const Partners = () => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'

  return (
    <Box sx={{ bgcolor: 'neutral.400', textAlign: 'center' }}>
      <AppearingComponent>
        <Container>
          <Stack
            sx={{
              gap: { mobile: 5, [breakpoint]: 20 },
              my: { mobile: 10, [breakpoint]: 20 },
              mx: 10,
              color: 'neutral.600',
            }}
            direction={{ mobile: 'column', [breakpoint]: 'row' }}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="title">{translate('partners')}</Typography>
            <Stack
              gap={{ mobile: 5, [breakpoint]: 10 }}
              direction={{ mobile: 'column', [breakpoint]: 'row' }}
              alignItems="center"
            >
              <VacuumlabsIcon />
            </Stack>
          </Stack>
        </Container>
      </AppearingComponent>
    </Box>
  )
}
export default Partners
