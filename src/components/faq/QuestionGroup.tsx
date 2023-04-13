import React from 'react'
import AppearingComponent from '../AppearingComponent'
import { Container, Stack } from '@mui/material'
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
      >
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
)

export default QuestionGroup
