import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography } from '@mui/material'
import { HorizontalScrollText } from './HorizontalScrollText'
import QuestionAccordion from './QuestionAccordion'

const MockedQuestion = {
  question: 'How do i access my NFT lorem ipsum?',
  answer:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit, enim ut iaculis rhoncus, lacus metus malesuada quam, at aliquet dolor est ut neque. Proin gravida est sit amet eros blandit aliquet. Phasellus diam massa, elementum sit amet commodo non, rutrum eget enim. Sed sit amet facilisis orci, sit amet ullamcorper enim. Etiam varius, odio eu imperdiet sodales, magna lorem aliquam nulla, non cursus est lorem sit amet turpis. Pellentesque ac risus at velit mattis euismod pellentesque quis lorem. Curabitur sem elit, mollis vel urna vel, elementum tristique tortor. Phasellus nec purus sagittis, vulputate dolor vel, dignissim arcu. Sed tincidunt vitae lacus vitae luctus. Proin porta eros ac mi lacinia dictum.',
}

const MockedQuestions = new Array(4).fill(MockedQuestion)

const Questions = () => {
  const translate = useContentful(ContentTypes.landingPage)
  return (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <HorizontalScrollText
        text={translate('questions')}
        numberOfItems={10}
        offsetStep={10}
        color="neutral.600"
      />
      <Container>
        <Stack
          sx={{ width: '100%', my: { mobile: 10, desktopM: 20 } }}
          spacing={4}
        >
          <Typography variant="title">{translate('questions')}</Typography>
          <div>
            {MockedQuestions.map((questionData, index) => (
              <QuestionAccordion {...questionData} key={`Question${index}`} />
            ))}
          </div>
        </Stack>
      </Container>
    </Box>
  )
}
export default Questions
