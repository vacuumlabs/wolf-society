import React from 'react'
import AppearingComponent from '../AppearingComponent'
import { Box, Container, Stack } from '@mui/material'
import { QuestionAndAnswerData } from '@/utils/hooks/useContentful'
import QuestionAccordion from './QuestionAccordion'

type Props = {
  questionsAndAnswersData: QuestionAndAnswerData[]
}

const QuestionGroup = ({ questionsAndAnswersData }: Props) => (
  <AppearingComponent>
    <Container>
      <Stack
        sx={{ width: '100%', my: { mobile: 10, desktopM: 20 } }}
        spacing={4}
        textAlign="left"
      >
        <Box>
          {questionsAndAnswersData
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .map((questionData) => (
              <QuestionAccordion
                question={questionData.question}
                answer={questionData.answer}
                id={questionData.id}
                key={questionData.id}
              />
            ))}
        </Box>
      </Stack>
    </Container>
  </AppearingComponent>
)

export default QuestionGroup
