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
import Activities from '@/components/landing/Activities'
import { BlogData, getBlogData } from '@/utils/blog'
import { useBlogData } from '@/utils/hooks/useBlogData'

type Props = {
  blogData: BlogData
  locale: string
}

const Home = ({ blogData, locale }: Props) => {
  const manifestRef = useRef(null)
  const formattedPosts = useBlogData(blogData, locale)
  return (
    <Stack>
      <Hero manifestRef={manifestRef} />
      <Manifest manifestRef={manifestRef} />
      <Projects />
      <MakeImpact />
      <Activities />
      <Roadmap />
      <Questions />
      <Topics posts={formattedPosts} />
      <CTA />
    </Stack>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    // Will be passed to the page component as props
    props: {
      blogData: await getBlogData(),
      translations: await injectCMSContent(ContentTypes.landingPage, locale),
      locale,
    },
  }
}

export default Home
