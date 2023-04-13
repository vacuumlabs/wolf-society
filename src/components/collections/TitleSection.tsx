import { SUBPAGES } from '@/consts'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { Button, Stack, Typography } from '@mui/material'

export const TitleSection = () => {
  const translate = useContentful(ContentTypes.collectionsPage)
  const translateLanding = useContentful(ContentTypes.landingPage)
  return (
    <Stack
      gap={20}
      sx={{
        pt: 10,
        pb: 40,
        px: 4,
        backgroundColor: 'neutral.400',
        textAlign: 'center',
      }}
    >
      <Typography variant="display">{translate('artImpactTitle')}</Typography>
      <Typography variant="body1">{translate('artImpactSubtitle')}</Typography>
      <Stack gap={8}>
        <Typography variant="headline" color="neutral.600">
          {translate('artImpactHeadline')}
        </Typography>
        <Stack sx={{ alignItems: 'center' }}>
          <Button variant="contained" href={SUBPAGES['collections']}>
            {translateLanding('makeImpact')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
