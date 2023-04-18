import {
  ContentTypes,
  useContentful,
  QuestionAndAnswerData,
} from '@/utils/hooks/useContentful'
import { Box, Stack, Typography } from '@mui/material'
import QuestionGroup from './QuestionGroup'

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
          textAlign: 'left',
          mt: 5,
        }}
      >
        {translate('questions')
          .trim()
          .split(' ')
          .map((word) => (
            <Typography m="auto" variant="display" fontWeight={600} key={word}>
              {word}
            </Typography>
          ))}
        <QuestionGroup {...{ questionsAndAnswersData }} />
      </Stack>
    </Box>
  )
}
export default Questions
