import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@hubspot/api-client'
import { SimplePublicObjectInput } from '@hubspot/api-client/lib/codegen/crm/contacts'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    res.status(200).json({})
  } catch (err: any) {
    let errorMessage = 'Unexpected error occured.'
    switch (err.code) {
      case 409:
        errorMessage = 'E-mail already registered!'
        break
    }
    res.status(err.code).json({ error: errorMessage })
  }
}
