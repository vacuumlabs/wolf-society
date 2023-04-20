import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
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
import { TitleSectionAccordion } from './TitleSectionAccordion'
import Button from '../Button'

type Props = {
  ref?: React.RefObject<HTMLElement>
  titles: string[]
  texts: string[]
  isDark?: boolean
  showButton?: boolean
}

export type Colors = {
  type: 'dark' | 'light'
  main: string
  secondary: string
  bgcolor: string
}

const TitleSectionText = ({
  ref,
  titles,
  texts,
  isDark,
  showButton,
}: Props) => {
  const translate = useContentful(ContentTypes.landingPage)

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )

  const [activeTab, setActiveTab] = useState<number>(0)
  const [isExpanded, setIsExpanded] = useState<number | null>(0)

  const handleSetIsExpanded = (id: number) => {
    if (isExpanded === id) setIsExpanded(null)
    else setIsExpanded(id)
  }

  const colors: Colors = isDark
    ? {
        type: 'dark',
        main: 'neutral.600',
        secondary: 'secondary.300',
        bgcolor: 'secondary.main',
      }
    : {
        type: 'light',
        main: '#000',
        secondary: 'neutral.600',
        bgcolor: 'neutral.400',
      }

  const desktopView = (
    <>
      <Tabs
        value={activeTab}
        variant="fullWidth"
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {titles.map((title, index) => (
          <Tab
            wrapped
            key={`tab-${index}`}
            sx={{
              py: 5,
              root: { width: '100px' },
              '&.Mui-selected': {
                color: '#1890ff',
              },
              borderBottom: '3px solid',
              borderColor: activeTab === index ? colors.main : colors.secondary,
            }}
            label={
              <Typography
                variant="caption"
                color={activeTab === index ? colors.main : colors.secondary}
                sx={{ '&:hover': { color: colors.main } }}
              >
                {title}
              </Typography>
            }
            onClick={() => setActiveTab(index)}
          />
        ))}
      </Tabs>
      {texts.map((text, index) =>
        index === activeTab ? (
          <Box key={index} mt={10}>
            <AppearingComponent>
              <Typography
                sx={{ textAlign: 'center' }}
                color={colors.main}
                display="inline"
              >
                <MuiMarkdown>{text}</MuiMarkdown>
              </Typography>

              {showButton && index === texts.length - 1 && (
                <Stack sx={{ alignItems: 'center', mt: 5 }}>
                  <Button href={SUBPAGES['collections']}>
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
        <TitleSectionAccordion
          expanded={isExpanded === index}
          onClick={() => handleSetIsExpanded(index)}
          key={index}
          title={titles[index]}
          text={text}
          colors={colors}
        />
      ))}
    </>
  )

  return (
    <Box
      pt={{ mobile: 13, tabletM: 15 }}
      pb={{ mobile: 5, tabletM: 20 }}
      ref={ref}
      sx={{ backgroundColor: colors.bgcolor, textAlign: 'center' }}
    >
      <Container>{isMobile ? mobileView : desktopView}</Container>
    </Box>
  )
}
export default TitleSectionText
