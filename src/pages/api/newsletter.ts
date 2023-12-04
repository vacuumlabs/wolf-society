import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@hubspot/api-client'
import { getErrorCode } from '@/utils/api'

const HUBSPOT_NEWSLETTER_TYPE = 'Wolf Society'

export type NewsletterSubscriptionRequestData = {
  email: string
}

export type NewsletterSubscriptionResponseData = {
  message: string
}

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
})

const getErrorMessage = (errorCode: number) => {
  switch (errorCode) {
    case 409:
      return 'E-mail already registered!'
    default:
      return 'Unexpected error occured!'
  }
}

const findContactByEmail = async (email: string) => {
  try {
    return await hubspotClient.crm.contacts.basicApi.getById(
      email,
      ['newsletter_subscription_type'],
      undefined,
      undefined,
      false,
      'email'
    )
  } catch {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsletterSubscriptionResponseData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Invalid request method!' })
    return
  }

  try {
    const { email } = req.body as NewsletterSubscriptionRequestData

    const existingContact = await findContactByEmail(email)

    const existingSubscriptions =
      existingContact?.properties.newsletter_subscription_type?.split(';') ?? []

    const isAlreadySubscribed = existingSubscriptions.includes(
      HUBSPOT_NEWSLETTER_TYPE
    )

    if (isAlreadySubscribed) {
      res.status(409).json({
        message: 'E-mail is already subscribed to the newsletter!',
      })
      return
    }

    if (existingContact) {
      const updatedSubscriptions = [
        ...existingSubscriptions,
        HUBSPOT_NEWSLETTER_TYPE,
      ].join(';')

      await hubspotClient.crm.contacts.basicApi.update(existingContact.id, {
        properties: {
          newsletter_subscription_type: updatedSubscriptions,
        },
      })
    } else {
      await hubspotClient.crm.contacts.basicApi.create({
        properties: {
          email,
          newsletter_subscription_type: HUBSPOT_NEWSLETTER_TYPE,
        },
        associations: [],
      })
    }

    res.json({ message: 'E-mail successfully subscribed to the newsletter!' })
  } catch (error) {
    const errorCode = getErrorCode(error)
    res.status(errorCode).json({ message: getErrorMessage(errorCode) })
  }
}
