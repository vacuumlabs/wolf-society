import CTA from '@/components/landing/CTA'
import Partners from '@/components/landing/Partners'
import Questions from '@/components/faq/Questions'
import {
  ContentTypes,
  QuestionAndAnswerData,
  getQuestionsAndAnswers,
  getTranslations,
} from '@/utils/hooks/useContentful'
import { Stack } from '@mui/material'
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import React from 'react'

type Props = {
  questionsAndAnswersData: QuestionAndAnswerData[] | null
}

const Faq = ({
  questionsAndAnswersData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Stack>
      <Questions questionsAndAnswersData={questionsAndAnswersData} />
      <CTA />
      <Partners />
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: GetStaticPropsContext) => ({
  props: {
    questionsAndAnswersData: await getQuestionsAndAnswers(locale),
    translations: await getTranslations(ContentTypes.landingPage, locale),
  },
  revalidate: 60,
})

export default Faq
