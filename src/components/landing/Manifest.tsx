import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import AppearingComponent from '../AppearingComponent'
import { useState } from 'react'
import MuiMarkdown from 'mui-markdown'
import { SUBPAGES } from '@/consts'
import { ManifestAccordion } from './ManifestAccordion'

type Props = {
  manifestRef: React.RefObject<HTMLElement>
}
type ManifestTitleOptions =
  | 'manifestTitle1'
  | 'manifestTitle2'
  | 'manifestTitle3'
  | 'manifestTitle4'
type ManifestContentOptions =
  | 'manifestContent1'
  | 'manifestContent2'
  | 'manifestContent3'
  | 'manifestContent4'

const Manifest = ({ manifestRef }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  const titles: ManifestTitleOptions[] = [
    'manifestTitle1',
    'manifestTitle2',
    'manifestTitle3',
    'manifestTitle4',
  ]
  const texts: ManifestContentOptions[] = [
    'manifestContent1',
    'manifestContent2',
    'manifestContent3',
    'manifestContent4',
  ]

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )

  const [activeTab, setActiveTab] = useState<number>(0)

  const desktopView = (
    <>
      <Tabs
        value={activeTab}
        variant="fullWidth"
        sx={{}}
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {titles.map((title, index) => (
          <Tab
            wrapped={true}
            key={`tab-${index}`}
            sx={{
              '&.Mui-selected': {
                color: '#1890ff',
              },
              borderBottom: '3px solid',
              borderColor:
                activeTab === index ? 'neutral.600' : 'secondary.300',
            }}
            label={
              <Typography
                variant="caption"
                color={activeTab === index ? 'neutral.600' : 'secondary.300'}
              >
                {translate(title)}
              </Typography>
            }
            onClick={() => setActiveTab(index)}
          />
        ))}
      </Tabs>
      {texts.map((text, index) =>
        index === activeTab ? (
          <Box key={index} mt={20}>
            <AppearingComponent>
              <Typography
                sx={{ textAlign: 'center' }}
                color="neutral.main"
                display="inline"
              >
                <MuiMarkdown>{translate(text)}</MuiMarkdown>
              </Typography>

              {index === texts.length - 1 && (
                <Stack sx={{ alignItems: 'center', mt: '32px' }}>
                  <Button variant="contained" href={SUBPAGES['collections']}>
                    {translate('makeImpact')}
                  </Button>
                </Stack>
              )}
            </AppearingComponent>
          </Box>
        ) : null
      )}
    </>
  )

  const mobileView = (
    <>
      {texts.map((text, index) => (
        <ManifestAccordion
          key={index}
          title={translate(titles[index])}
          text={translate(text)}
        />
      ))}
    </>
  )

  return (
    <Box
      pt={{ mobile: 20, tabletM: 30 }}
      ref={manifestRef}
      sx={{ bgcolor: 'secondary.main', textAlign: 'center' }}
    >
      <Container>{isMobile ? mobileView : desktopView}</Container>
    </Box>
  )
}
export default Manifest
