import {
  useContentful,
  ContentTypes,
  Content,
} from '@/utils/hooks/useContentful'
import { Box, Container } from '@mui/material'
import { MakeItHappenImage } from './activitiesImages/MakeItHappenImage'
import makeItHappenMobileImage from 'public/images/makeItHappen.png'
import haveFunMobileImage from 'public/images/haveFun.png'
import breadAndButterMobileImage from 'public/images/breadAndButter.png'
import ActivityItem from './ActivityItem'
import { StaticImageData } from 'next/image'
import Collections from './Collections'
import DrawerTextList from './DrawerTextList'
import DrawerAllocationInfo from './DrawerAllocationInfo'
import { HaveFunImage } from './activitiesImages/HaveFunImage'
import { BreadAndButterImage } from './activitiesImages/BreadAndButterImage'

const Activities = () => {
  const translate = useContentful(ContentTypes.landingPage)
  const ACTIVITIES_ITEMS: {
    title: keyof Content[ContentTypes.landingPage]
    description: keyof Content[ContentTypes.landingPage]
    imageElemnt: JSX.Element
    mobileImage: StaticImageData
    drawerContent: React.ReactNode
  }[] = [
    {
      title: 'makeItHappen',
      description: 'makeItHappenText',
      imageElemnt: <MakeItHappenImage />,
      mobileImage: makeItHappenMobileImage,
      drawerContent: <DrawerAllocationInfo />,
    },
    {
      title: 'haveFun',
      description: 'haveFunText',
      imageElemnt: <HaveFunImage />,
      mobileImage: haveFunMobileImage,
      drawerContent: (
        <DrawerTextList texts={translate('haveFunDrawerContent').split('\n')} />
      ),
    },
    {
      title: 'breadAndButter',
      description: 'breadAndButterText',
      imageElemnt: <BreadAndButterImage />,
      mobileImage: breadAndButterMobileImage,
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
      <Container sx={{ mb: { mobile: 0, tabletM: '-80px' } }}>
        {ACTIVITIES_ITEMS.map((activityItem, index) => (
          <ActivityItem
            key={activityItem.title}
            title={translate(activityItem.title)}
            description={translate(activityItem.description)}
            imageElement={activityItem.imageElemnt}
            mobileImage={activityItem.mobileImage}
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
