import Collections from '@/components/landing/Collections'
import Hero from '@/components/landing/Hero'
import Manifest from '@/components/landing/Manifest'
import Projects from '@/components/landing/Projects'
import { ContentTypes, injectCMSContent } from '@/utils/hooks/useContentful'
import { Stack } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import MakeImpact from '@/components/landing/MakeImpact'
import Roadmap from '@/components/landing/Roadmap'
import Questions from '@/components/landing/Questions'
import Topics from '@/components/landing/Topics'
import CTA from '@/components/landing/CTA'
import { useRef } from 'react'

const Home = () => {
  const manifestRef = useRef(null)
  return (
    <Stack>
      <Hero manifestRef={manifestRef} />
      <Manifest manifestRef={manifestRef} />
      <Projects />
      <MakeImpact />
      <Collections />
      <Roadmap />
      <Questions />
      <Topics />
      <CTA />
    </Stack>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    // Will be passed to the page component as props
    props: {
      translations: await injectCMSContent(ContentTypes.landingPage, locale),
    },
  }
}

export default Home
