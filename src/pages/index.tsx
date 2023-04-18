import Hero from '@/components/landing/Hero'
import TitleSectionText from '@/components/landing/TitleSectionText'
import Projects from '@/components/landing/Projects'
import {
  CollectionData,
  Content,
  ContentTypes,
  getCollections,
  getProjects,
  getQuestionsAndAnswers,
  getRoadmap,
  getTranslations,
  ProjectData,
  QuestionAndAnswerData,
  RoadmapData,
  useContentful,
} from '@/utils/hooks/useContentful'
import { Stack } from '@mui/material'
import {
  GetStaticPropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import MakeImpact from '@/components/landing/MakeImpact'
import Roadmap from '@/components/landing/Roadmap'
import Questions from '@/components/faq/Questions'
import Topics from '@/components/landing/Topics'
import CTA from '@/components/landing/CTA'
import { useRef } from 'react'
import Activities from '@/components/landing/Activities'
import { BlogData, getBlogData } from '@/utils/blog'
import { useBlogData } from '@/utils/hooks/useBlogData'
import Partners from '@/components/landing/Partners'
import Collections from '@/components/landing/Collections'
import { Manifesto } from '@/components/landing/Manifesto'

type Props = {
  blogData: BlogData
  translations: Partial<Content>
  locale: string | undefined
  projectsData: ProjectData[] | null
  roadmapData: RoadmapData[] | null
  questionsAndAnswersData: QuestionAndAnswerData[] | null
  collectionsData: CollectionData[] | null
}

const Home = ({
  blogData,
  locale,
  projectsData,
  roadmapData,
  questionsAndAnswersData,
  collectionsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const manifestRef = useRef(null)
  const formattedPosts = useBlogData(
    { ...blogData, posts: blogData.posts.slice(0, 3) },
    locale
  )
  return (
    <Stack mt={10}>
      <Hero manifestRef={manifestRef} />
      <Manifesto ref={manifestRef} />
      <Projects projectsData={projectsData} />
      <MakeImpact />
      <Activities />
      <Collections collectionsData={collectionsData} />
      <Roadmap roadmapData={roadmapData} />
      <Topics posts={formattedPosts} />
      <Partners />
      <CTA />
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    // Will be passed to the page component as props
    props: {
      blogData: await getBlogData(),
      translations: await getTranslations(ContentTypes.landingPage, locale),
      projectsData: await getProjects(locale),
      roadmapData: await getRoadmap(locale),
      questionsAndAnswersData: await getQuestionsAndAnswers(locale),
      collectionsData: await getCollections(locale),
      locale,
    },
    revalidate: 60, // In seconds
  }
}

export default Home
