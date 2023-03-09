import React from 'react'
import { GetStaticPropsContext } from 'next'
import contentful from '@/utils/configs/contentful'
import { Stack, Typography } from '@mui/material'
import Post, { TPost } from '@/components/Post'
import {
  injectTranslations,
  useTranslations,
} from '@/utils/hooks/useTranslations'

type TBlog = {
  posts: TPost[]
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
    </Stack>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const entries = await contentful.getEntries({ content_type: 'post' })
  const posts = await entries.items.map((item: any) => {
    return item.fields
  })

  return {
    props: {
      // Will be passed to the page component as props
      translations: await injectTranslations(locale),
      posts,
    },
  }
}

export default Blog
