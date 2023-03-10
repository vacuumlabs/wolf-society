import {
  injectTranslations,
  useTranslations,
} from '@/utils/hooks/useTranslations'
import { GetStaticPropsContext } from 'next'
import React from 'react'

const Home = () => {
  const t = useTranslations()
  return <h1>{t('welcome')}</h1>
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    // Will be passed to the page component as props
    props: {
      translations: await injectTranslations(locale),
    },
  }
}

export default Home
