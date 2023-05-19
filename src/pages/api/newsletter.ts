import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@hubspot/api-client'
import { SimplePublicObjectInput } from '@hubspot/api-client/lib/codegen/crm/contacts'

export type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST')
    res.status(400).json({ message: 'Invalid request method!' })
  try {
    const hubspotClient = new Client({
      accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
    })
    const body = JSON.parse(req.body)
    const contactObj: SimplePublicObjectInput = {
      properties: {
        email: body.email,
      },
    }
    await hubspotClient.crm.contacts.basicApi.create(contactObj)
    res.json({ message: 'E-mail successfully subscribed to the newsletter!' })
  } catch (err: any) {
    let errorMessage = 'Unexpected error occured!'
    switch (err.code) {
      case 409:
        errorMessage = 'E-mail already registered!'
        break
    }
    res.status(err.code).json({ message: errorMessage })
  }
}
