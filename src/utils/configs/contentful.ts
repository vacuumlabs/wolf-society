import { createClient } from 'contentful'

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_CDN_TOKEN

const client =
  typeof window === 'undefined'
    ? createClient({
        space: space as string,
        accessToken: accessToken as string,
      })
    : undefined

export default client
