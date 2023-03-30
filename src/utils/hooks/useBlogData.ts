import { ArticleCardProps } from '@/components/blog/ArticleCard'
import { useEffect, useState } from 'react'
import { BlogData } from '../blog'
import { formatDate, formatCategories } from '../helpers'

export const useBlogData = (blogData: BlogData, locale: string) => {
  const [formattedPosts, setFormattedPosts] = useState<ArticleCardProps[]>([])
  useEffect(() => {
    if (blogData.errorMessage) return
    setFormattedPosts(
      blogData.posts.map((post) => ({
        ...post,
        pubDate: formatDate(post.pubDate, locale),
        categories: formatCategories(post.categories),
      }))
    )
  }, [])
  return formattedPosts
}
