import React, { useEffect, useState } from 'react'
import { GetStaticPropsContext } from 'next'
import { Box, Container, Stack, Typography } from '@mui/material'
import { ContentTypes, getTranslations } from '@/utils/hooks/useContentful'
import HeaderArticle from '@/components/blog/HeaderArticle'
import Articles from '@/components/blog/Articles'
import { formatCategories, formatDate } from '@/utils/helpers'
import { ArticleCardProps } from '@/components/blog/ArticleCard'
import CTA from '@/components/landing/CTA'
import { BlogData, getBlogData } from '@/utils/blog'
import { useBlogData } from '@/utils/hooks/useBlogData'
import AppearingComponent from '@/components/AppearingComponent'

export type ArticleProps = {
  title: string
  content: string
  pubDate: string
  thumbnail: string
  link: string
  author: string
  categories: string[]
}

type Props = {
  blogData: BlogData
  locale: string
}

const Blog = ({ blogData, locale }: Props) => {
  const formattedPosts = useBlogData(blogData, locale)
  const { errorMessage, image } = blogData

  return (
    <Stack mt={10}>
      {errorMessage ? (
        <Box sx={{ bgcolor: 'neutral.400' }}>
          <Container>
            <Typography>{errorMessage}</Typography>
          </Container>
        </Box>
      ) : (
        <Stack>
          <HeaderArticle post={formattedPosts[0]} image={image} />
          <Articles posts={formattedPosts.slice(1)} />
        </Stack>
      )}
      <AppearingComponent>
        <CTA />
      </AppearingComponent>
    </Stack>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      // Will be passed to the page component as props
      translations: await getTranslations(ContentTypes.articlesPage, locale),
      blogData: await getBlogData(),
    },
    revalidate: 60, // In seconds
  }
}

export default Blog
