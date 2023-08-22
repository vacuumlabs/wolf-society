import { useMemo } from 'react'
import { BlogData } from '../blog'
import { formatDate, formatCategories } from '../helpers'

export const useFormattedBlogData = (blogData: BlogData, locale = 'en-US') =>
  useMemo(() => {
    if (blogData.errorMessage) {
      return []
    }

    return blogData.posts.map((post) => ({
      ...post,
      pubDate: formatDate(post.pubDate, locale),
      categories: formatCategories(post.categories),
    }))
  }, [blogData, locale])
