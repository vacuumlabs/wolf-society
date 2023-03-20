import React from 'react'
import { GetServerSidePropsContext } from 'next'
import { Link, Stack, Typography } from '@mui/material'
import Post, { TPost } from '@/components/Post'
import {
  injectTranslations,
  useTranslations,
} from '@/utils/hooks/useTranslations'

type TBlog = {
  posts: TPost[]
  errorMessage: string
}

const Blog = ({ posts }: TBlog) => {
  const t = useTranslations()
  return (
    <Stack padding={4} spacing={8} width="fit-content" alignItems="center">
      <Typography variant="h3">{t('updates')}</Typography>
      <Stack sx={{ width: '60%' }}>
        {posts.map((post) => (
          <Post key={post.title} {...post} />
        ))}
      </Stack>
      <Link
        variant="h3"
        href={`https://medium.com/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`}
        target="_blank"
      >
        Read more
      </Link>
    </Stack>
  )
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`
  )

  const data = await response.json()

  return {
    props: {
      // Will be passed to the page component as props
      translations: await injectTranslations(locale),
      posts: data.items ?? [],
      errorMessage: data.message ?? '',
    },
  }
}

export default Blog
