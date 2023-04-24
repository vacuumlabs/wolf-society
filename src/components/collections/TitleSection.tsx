import { SUBPAGES } from '@/consts'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { Stack, Typography } from '@mui/material'
import TitleSectionText from '../landing/TitleSectionText'
import Button from '../Button'

export const TitleSection = () => {
  const translate = useContentful(ContentTypes.collectionsPage)
  const translateCommon = useContentful(ContentTypes.common)
  const titles = [
    translate('artImpactSubtitle1'),
    translate('artImpactSubtitle2'),
  ]
  const texts = [translate('artImpactText1'), translate('artImpactText2')]
  return (
    <Stack
      gap={{ mobile: 4, tabletM: 10 }}
      sx={{
        pt: 5,
        pb: 17,
        px: { mobile: '16px', desktopM: '200px' },
        backgroundColor: 'neutral.400',
        textAlign: 'center',
      }}
    >
      <Typography variant="display">{translate('artImpactTitle')}</Typography>
      <TitleSectionText titles={titles} texts={texts} />
      <Stack gap={5}>
        <Typography variant="headline" color="neutral.600">
          {translate('artImpactHeadline')}
        </Typography>
        <Stack sx={{ alignItems: 'center' }}>
          <Button href={SUBPAGES['collections']}>
            {translateCommon('makeImpactButton')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
