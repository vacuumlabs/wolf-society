import { Box, BreakpointOverrides } from '@mui/material'
import TitleSectionText from './TitleSectionText'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { forwardRef } from 'react'

const Manifesto = forwardRef<HTMLElement>((_props, ref) => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const titles = [
    translate('manifestTitle1'),
    translate('manifestTitle2'),
    translate('manifestTitle3'),
    translate('manifestTitle4'),
  ]
  const texts = [
    translate('manifestContent1'),
    translate('manifestContent2'),
    translate('manifestContent3'),
    translate('manifestContent4'),
  ]
  return (
    <Box
      pt={{ mobile: 10, [breakpoint]: 15 }}
      pb={{ mobile: 10, [breakpoint]: 20 }}
      ref={ref}
      sx={{ backgroundColor: 'secondary.main', textAlign: 'center' }}
    >
      <TitleSectionText titles={titles} texts={texts} isDark showButton />
    </Box>
  )
})
Manifesto.displayName = 'Manifesto'

export default Manifesto
