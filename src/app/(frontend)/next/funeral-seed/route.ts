import { createLocalReq, getPayload } from 'payload'
import { funeralHomeSeed } from '@/endpoints/funeral-seed'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden. Please log in to the admin panel first.', { status: 403 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    const payloadReq = await createLocalReq({ user }, payload)

    await funeralHomeSeed({ payload, req: payloadReq })

    return Response.json({ 
      success: true,
      message: 'Funeral home content seeded successfully!'
    })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding funeral home data' })
    return new Response('Error seeding funeral home data.', { status: 500 })
  }
}