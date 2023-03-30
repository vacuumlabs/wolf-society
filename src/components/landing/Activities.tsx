import {
  useContentful,
  ContentTypes,
  Content,
} from '@/utils/hooks/useContentful'
import { Box, Container } from '@mui/material'
import makeItHappenImage from 'public/images/makeItHappen.png'
import haveFunImage from 'public/images/haveFun.png'
import breadAndButterImage from 'public/images/breadAndButter.png'
import ActivityItem from './ActivityItem'
import { StaticImageData } from 'next/image'
import Collections from './Collections'
import DrawerTextList from './DrawerTextList'
import DrawerAllocationInfo from './DrawerAllocationInfo'

const Activities = () => {
  const translate = useContentful(ContentTypes.landingPage)
  const ACTIVITIES_ITEMS: {
    title: keyof Content[ContentTypes.landingPage]
    description: keyof Content[ContentTypes.landingPage]
    image: StaticImageData
    drawerContent: React.ReactNode
  }[] = [
    {
      title: 'makeItHappen',
      description: 'makeItHappenText',
      image: makeItHappenImage,
      drawerContent: <DrawerAllocationInfo />,
    },
    {
      title: 'haveFun',
      description: 'haveFunText',
      image: haveFunImage,
      drawerContent: (
        <DrawerTextList texts={translate('haveFunDrawerContent').split('\n')} />
      ),
    },
    {
      title: 'breadAndButter',
      description: 'breadAndButterText',
      image: breadAndButterImage,
      drawerContent: (
        <DrawerTextList
          texts={translate('breadAndButterDrawerContent').split('\n')}
        />
      ),
    },
  ]
  return (
    <Box
      sx={{ bgcolor: 'neutral.400', pb: { mobile: '80px', desktopM: '160px' } }}
    >
      <Container>
        {ACTIVITIES_ITEMS.map((activityItem, index) => (
          <ActivityItem
            key={activityItem.title}
            title={translate(activityItem.title)}
            description={translate(activityItem.description)}
            image={activityItem.image}
            imageOnTheRight={index % 2 === 0}
            drawerContent={activityItem.drawerContent}
          />
        ))}
      </Container>
      <Collections />
    </Box>
  )
}
export default Activities
