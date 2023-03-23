import React from 'react'
import { GetStaticPropsContext } from 'next'
import { Container, Link, Stack, Typography } from '@mui/material'
import Post, { TPost } from '@/components/Post'
import {
  ContentTypes,
  injectCMSContent,
  useContentful,
} from '@/utils/hooks/useContentful'

type TBlog = {
  posts: TPost[]
  errorMessage: string
}

const Blog = ({ posts }: TBlog) => {
  const translate = useContentful(ContentTypes.articlesPage)
  return (
    <Container sx={{ mt: 10 }}>
      <Stack padding={4} spacing={8} width="fit-content" alignItems="center">
        <Typography variant="title">{translate('articles')}</Typography>
        <Stack sx={{ width: '60%' }}>
          {posts.map((post) => (
            <Post key={post.title} {...post} />
          ))}
        </Stack>
        <Link
          variant="title"
          href={`https://medium.com/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`}
          target="_blank"
        >
          Read more
        </Link>
      </Stack>
    </Container>
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
      translations: await injectCMSContent(ContentTypes.landingPage, locale),
      posts: data.items ?? [],
      errorMessage: data.message ?? '',
    },
    revalidate: 60, // In seconds
  }
}

export default Blog
