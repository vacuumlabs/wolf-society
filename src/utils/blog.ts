import { MEDIUM_DOMAIN } from '@/consts'
import { ArticleProps } from '@/pages/blog'

export type BlogData = {
  posts: ArticleProps[]
  errorMessage: string
  image: string
}

export const getBlogData = async (): Promise<BlogData> => {
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${MEDIUM_DOMAIN}/feed/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`
  )

  const data = await response.json()
  ;(data.items as ArticleProps[] | undefined)?.forEach((post) => {
    post.title = post.title.replace(/&amp;/g, '&')
  })

  return {
    posts: data.items ?? [],
    image: data.feed?.image ?? '',
    errorMessage: data.message ?? '',
  }
}
