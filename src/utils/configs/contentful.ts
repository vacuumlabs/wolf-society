const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_CDN_TOKEN

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

export default client
