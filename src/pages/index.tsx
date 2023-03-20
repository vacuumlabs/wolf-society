import Collections from '@/components/landing/Collections'
import Hero from '@/components/landing/Hero'
import Manifest from '@/components/landing/Manifest'
import Projects from '@/components/landing/Projects'
import {
  injectTranslations,
  useTranslations,
} from '@/utils/hooks/useTranslations'
import { Stack } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useAccount } from 'wagmi'
import { useGetNfts } from '@/utils/hooks/useGetNfts'
import { NftCard } from '@/components/NftCard'

const Home = () => {
  const t = useTranslations()
  return (
    <Stack>
      <Hero />
      <Manifest />
      <Projects />
      <Collections />
    </Stack>
  )
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
