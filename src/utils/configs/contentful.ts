import { createClient } from 'contentful'
import { strict as assert } from 'assert'

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_CDN_TOKEN

const handleCreateClient = () => {
  assert(space, 'CONTENTFUL_SPACE_ID is not set')
  assert(accessToken, 'CONTENTFUL_CDN_TOKEN is not set')

  return createClient({
    space,
    accessToken,
  })
}

const client = typeof window === 'undefined' ? handleCreateClient() : undefined

export default client
