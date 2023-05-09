import Hero from '@/components/landing/Hero'
import TitleSectionText from '@/components/landing/TitleSectionText'
import Projects from '@/components/landing/Projects'
import {
  CollectionData,
  Content,
  ContentTypes,
  getCollections,
  getProjects,
  getRoadmap,
  getTranslations,
  ProjectData,
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
import Topics from '@/components/landing/Topics'
import CTA from '@/components/landing/CTA'
import { useRef } from 'react'
import Activities from '@/components/landing/Activities'
import { BlogData, getBlogData } from '@/utils/blog'
import { useBlogData } from '@/utils/hooks/useBlogData'
import Partners from '@/components/landing/Partners'
import Collections from '@/components/landing/Collections'
import Manifesto from '@/components/landing/Manifesto'
import ScrollingVideo from '@/components/ScrollingVideo'
import PollutionText from 'public/images/Pollution-text-en-US.png'
import PollutionTextMobile from 'public/images/Pollution-text-S-en-US.png'
import GlacierText from 'public/images/Glacier-text-en-US.png'
import GlacierTextMobile from 'public/images/Glacier-text-S-en-US.png'
import DeforestationText from 'public/images/Deforestation-text-en-US.png'
import DeforestationTextMobile from 'public/images/Deforestation-text-S-en-US.png'

type Props = {
  blogData: BlogData
  translations: Partial<Content>
  locale: string | undefined
  projectsData: ProjectData[] | null
  roadmapData: RoadmapData[] | null
  collectionsData: CollectionData[] | null
}

const Home = ({
  blogData,
  locale,
  projectsData,
  roadmapData,
  collectionsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const manifestoRef = useRef(null)
  const formattedPosts = useBlogData(
    { ...blogData, posts: blogData.posts.slice(0, 3) },
    locale
  )
  return (
    <Stack mt={10}>
      <Hero manifestoRef={manifestoRef} />
      <Manifesto ref={manifestoRef} />
      <Projects projectsData={projectsData} />
      <ScrollingVideo
        textImage={PollutionText}
        textImageMobile={PollutionTextMobile}
        id="Pollution"
        topColor="secondary.main"
        bottomColor="neutral.400"
      />
      <MakeImpact />
      <Activities />
      <Collections collectionsData={collectionsData} />
      <ScrollingVideo
        textImage={GlacierText}
        textImageMobile={GlacierTextMobile}
        id="Glacier"
        topColor="neutral.400"
        bottomColor="neutral.main"
      />
      <Roadmap roadmapData={roadmapData} />
      <ScrollingVideo
        textImage={DeforestationText}
        textImageMobile={DeforestationTextMobile}
        id="Deforestation"
        topColor="neutral.main"
        bottomColor="neutral.400"
      />
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
      collectionsData: await getCollections(locale),
      locale,
    },
    revalidate: 60, // In seconds
  }
}

export default Home
