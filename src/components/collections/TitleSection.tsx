import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography } from '@mui/material'
import TitleSectionText from '../landing/TitleSectionText'
import Button from '../Button'
import AppearingComponent from '../AppearingComponent'

type Props = {
  firstCollection?: React.RefObject<HTMLElement>
}

export const TitleSection = ({ firstCollection }: Props) => {
  const translate = useContentful(ContentTypes.collectionsPage)
  const titles = [
    translate('artImpactSubtitle1'),
    translate('artImpactSubtitle2'),
  ]
  const texts = [translate('artImpactText1'), translate('artImpactText2')]

  return (
    <Box sx={{ backgroundColor: 'neutral.400' }}>
      <Container>
        <Stack
          gap={{ mobile: 4, tabletM: 10 }}
          sx={{
            pt: 5,
            pb: 17,
            textAlign: 'center',
          }}
        >
          <AppearingComponent>
            <Typography
              variant="display"
              sx={{ px: { mobile: 0, desktopM: '190px' } }}
            >
              {translate('artImpactTitle')}
            </Typography>
          </AppearingComponent>
          <TitleSectionText titles={titles} texts={texts} />
          <AppearingComponent>
            <Stack gap={5}>
              <Typography variant="headline" color="neutral.600">
                {translate('artImpactHeadline')}
              </Typography>
              <Stack sx={{ alignItems: 'center' }}>
                <Button
                  onClick={() => {
                    firstCollection?.current?.scrollIntoView({
                      behavior: 'smooth',
                    })
                  }}
                >
                  {translate('viewArtworks')}
                </Button>
              </Stack>
            </Stack>
          </AppearingComponent>
        </Stack>
      </Container>
    </Box>
  )
}
