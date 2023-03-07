import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetStaticPropsContext } from 'next'
import React from 'react'

export default function Blog() {
  const { t } = useTranslation()
  return <h1>{t('blog')}</h1>
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      // Will be passed to the page component as props
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  }
}
