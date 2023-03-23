import React, { useEffect, useState } from 'react'
import { GetStaticPropsContext } from 'next'
import { Box, Container, Stack, Typography } from '@mui/material'
import { ContentTypes, injectCMSContent } from '@/utils/hooks/useContentful'
import HeaderArticle from '@/components/blog/HeaderArticle'
import Articles from '@/components/blog/Articles'
import { formatCategories, formatDate } from '@/utils/helpers'
import { ArticleCardProps } from '@/components/blog/ArticleCard'

export type ArticleProps = {
  title: string
  content: string
  pubDate: string
  thumbnail: string
  link: string
  author: string
  categories: string[]
}

type TBlog = {
  posts: ArticleProps[]
  errorMessage: string
  image: string
  locale: string
}

const Blog = ({ posts, errorMessage, locale, image }: TBlog) => {
  const [formattedPosts, setFormattedPosts] = useState<ArticleCardProps[]>([])
  useEffect(() => {
    setFormattedPosts(
      posts.map((post) => ({
        ...post,
        pubDate: formatDate(post.pubDate, locale),
        categories: formatCategories(post.categories),
      }))
    )
  }, [])

  return (
    <Box mt={11}>
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
    </Box>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`
  )

  const data = await response.json()

  return {
    props: {
      // Will be passed to the page component as props
      translations: await injectCMSContent(ContentTypes.articlesPage, locale),
      posts: data.items ?? [],
      image: data.feed?.image ?? '',
      errorMessage: data.message ?? '',
    },
    revalidate: 60, // In seconds
  }
}

export default Blog
