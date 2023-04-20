import { Box } from '@mui/material'
import TitleSectionText from './TitleSectionText'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'

type ManifestoProps = {
  ref: React.RefObject<HTMLElement>
}

export const Manifesto = ({ ref }: ManifestoProps) => {
  const translate = useContentful(ContentTypes.landingPage)
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
      pt={{ mobile: 13, tabletM: 15 }}
      pb={{ mobile: 5, tabletM: 20 }}
      ref={ref}
      sx={{ backgroundColor: 'secondary.main', textAlign: 'center' }}
    >
      <TitleSectionText titles={titles} texts={texts} isDark showButton />
    </Box>
  )
}
