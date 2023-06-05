import {
  ContentTypes,
  useContentful,
  QuestionAndAnswerData,
} from '@/utils/hooks/useContentful'
import { Box, Stack, Typography } from '@mui/material'
import QuestionGroup from './QuestionGroup'
import AppearingComponent from '../AppearingComponent'

type Props = {
  questionsAndAnswersData: QuestionAndAnswerData[] | null
}

const Questions = ({ questionsAndAnswersData }: Props) => {
  const translate = useContentful(ContentTypes.landingPage)
  return !questionsAndAnswersData ? (
    <></>
  ) : (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <Stack
        sx={{
          textAlign: 'center',
          mt: 5,
        }}
      >
        <AppearingComponent>
          {translate('questions')
            .trim()
            .split(' ')
            .map((word) => (
              <Typography variant="display" fontWeight={600} key={word}>
                {word}
              </Typography>
            ))}
        </AppearingComponent>
        <QuestionGroup {...{ questionsAndAnswersData }} />
      </Stack>
    </Box>
  )
}
export default Questions
