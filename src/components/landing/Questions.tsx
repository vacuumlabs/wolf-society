import {
  useContentful,
  ContentTypes,
  QuestionAndAnswerData,
} from '@/utils/hooks/useContentful'
import { Box, Container, Stack, Typography } from '@mui/material'
import AppearingComponent from '../AppearingComponent'
import { HorizontalScrollText } from './HorizontalScrollText'
import QuestionAccordion from './QuestionAccordion'

type Props = {
  questionsAndAnswersData: QuestionAndAnswerData[] | null
}

const Questions = ({ questionsAndAnswersData }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  return !questionsAndAnswersData ? (
    <></>
  ) : (
    <Box sx={{ bgcolor: 'neutral.400', overflowX: 'hidden' }}>
      <HorizontalScrollText
        text={translate('questions')}
        numberOfItems={10}
        offsetStep={10}
        color="neutral.600"
      />
      <AppearingComponent>
        <Container>
          <Stack
            sx={{ width: '100%', my: { mobile: 10, desktopM: 20 } }}
            spacing={4}
          >
            <Typography variant="caption">{translate('questions')}</Typography>
            <div>
              {questionsAndAnswersData.map((questionData, index) => (
                <QuestionAccordion
                  question={questionData.question}
                  answer={questionData.answer}
                  key={`Question${index}`}
                />
              ))}
            </div>
          </Stack>
        </Container>
      </AppearingComponent>
    </Box>
  )
}
export default Questions
