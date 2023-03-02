import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetServerSidePropsContext } from 'next'

export default function Home() {
  const { t } = useTranslation()
  return <h1>{t('welcome')}</h1>
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en')),
      // Will be passed to the page component as props
    },
  }
}
