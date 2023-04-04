import Hero from '@/components/landing/Hero'
import Manifest from '@/components/landing/Manifest'
import Projects from '@/components/landing/Projects'
import {
  Content,
  ContentTypes,
  getProjects,
  getRoadmap,
  injectCMSContent,
  ProjectData,
  RoadmapData,
} from '@/utils/hooks/useContentful'
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
import Partners from '@/components/landing/Partners'

type Props = {
  blogData: BlogData
  translations: Partial<Content>
  locale: string | undefined
  projectsData: ProjectData[] | null
  roadmapData: RoadmapData[] | null
}

const Home = ({ blogData, locale, projectsData, roadmapData }: Props) => {
  const manifestRef = useRef(null)
  const formattedPosts = useBlogData(
    { ...blogData, posts: blogData.posts.slice(0, 3) },
    locale
  )
  return (
    <Stack>
      <Hero manifestRef={manifestRef} />
      <Manifest manifestRef={manifestRef} />
      <Projects projectsData={projectsData} />
      <MakeImpact />
      <Activities />
      <Roadmap roadmapData={roadmapData} />
      <Questions />
      <Topics posts={formattedPosts} />
      <Partners />
      <CTA />
    </Stack>
  )
}

export async function getStaticProps({
  locale,
}: GetStaticPropsContext): Promise<{ props: Props }> {
  return {
    // Will be passed to the page component as props
    props: {
      blogData: await getBlogData(),
      translations: await injectCMSContent(ContentTypes.landingPage, locale),
      projectsData: await getProjects(locale),
      roadmapData: await getRoadmap(locale),
      locale,
    },
  }
}

export default Home
