import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import GediIcon from '../icons/GediIcon'
import globaia from 'public/images/Globaia.png'
import VacuumlabsIcon from '../icons/VacuumlabsIcon'

const Partners = () => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'

  return (
    <Box sx={{ bgcolor: 'neutral.400', textAlign: 'center' }}>
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
            <GediIcon />
            <Image src={globaia} alt="Globaia logo" height={42} />
            <VacuumlabsIcon />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
export default Partners
