import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetStaticPropsContext } from 'next'
import React from 'react'
import contentful from '@/utils/configs/contentful'
import { Stack, Typography } from '@mui/material'
import Post, { TPost } from '@/components/Post'

type TBlog = {
  posts: TPost[]
}

export default function Blog({ posts }: TBlog) {
  const { t } = useTranslation()
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
      ...(await serverSideTranslations(locale ?? 'en')),
      posts,
    },
  }
}
