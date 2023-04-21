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
    <Stack mt={10}>
      <Questions questionsAndAnswersData={questionsAndAnswersData} />
      <CTA />
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
