import {
  useContentful,
  ContentTypes,
  Content,
} from '@/utils/hooks/useContentful'
import { Box, BreakpointOverrides, Container } from '@mui/material'
import makeItHappenImage from 'public/images/makeItHappen.png'
import haveFunImage from 'public/images/haveFun.png'
import breadAndButterImage from 'public/images/breadAndButter.png'
import ActivityItem from './ActivityItem'
import { StaticImageData } from 'next/image'
import Collections from './Collections'

const ACTIVITIES_ITEMS: {
  title: keyof Content[ContentTypes.landingPage]
  description: keyof Content[ContentTypes.landingPage]
  image: StaticImageData
}[] = [
  {
    title: 'makeItHappen',
    description: 'makeItHappenText',
    image: makeItHappenImage,
  },
  {
    title: 'haveFun',
    description: 'haveFunText',
    image: haveFunImage,
  },
  {
    title: 'breadAndButter',
    description: 'breadAndButterText',
    image: breadAndButterImage,
  },
]

const Activities = () => {
  const translate = useContentful(ContentTypes.landingPage)
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
          />
        ))}
      </Container>
      <Collections />
    </Box>
  )
}
export default Activities
