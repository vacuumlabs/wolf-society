import Hero from '@/components/landing/Hero'
import Manifest from '@/components/landing/Manifest'
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
} from '@/utils/hooks/useContentful'
import { Stack } from '@mui/material'
import {
  GetStaticPropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
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
import Collections from '@/components/landing/Collections'
import dynamic from 'next/dynamic'

type Props = {
  blogData: BlogData
  translations: Partial<Content>
  locale: string | undefined
  projectsData: ProjectData[] | null
  roadmapData: RoadmapData[] | null
  questionsAndAnswersData: QuestionAndAnswerData[] | null
  collectionsData: CollectionData[] | null
}

const DynamicManifest = dynamic(
  () => import('../components/landing/Manifest'),
  {
    ssr: false,
  }
)

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
    <Stack>
      <Hero manifestRef={manifestRef} />
      <DynamicManifest manifestRef={manifestRef} />
      <Projects projectsData={projectsData} />
      <MakeImpact />
      <Activities />
      <Collections collectionsData={collectionsData} />
      <Roadmap roadmapData={roadmapData} />
      <Questions questionsAndAnswersData={questionsAndAnswersData} />
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
