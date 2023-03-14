const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_CDN_TOKEN

const client =
  typeof window === 'undefined'
    ? require('contentful').createClient({
        space: space,
        accessToken: accessToken,
      })
    : undefined

export default client
