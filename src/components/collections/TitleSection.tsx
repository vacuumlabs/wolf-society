import { SUBPAGES } from '@/consts'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography } from '@mui/material'
import TitleSectionText from '../landing/TitleSectionText'
import Button from '../Button'
import AppearingComponent from '../AppearingComponent'
import Image from 'next/image'
import makeImpactTitle from 'public/images/makeImpactTitle.png'

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
            <Box
              sx={{
                alignItems: 'center',
              }}
            >
              <Image
                src={makeImpactTitle}
                alt={'The Earth Is What We All Have in Common'}
                style={{
                  alignItems: 'center',
                  width: '80vw',
                  height: 'auto',
                }}
              />
            </Box>
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
