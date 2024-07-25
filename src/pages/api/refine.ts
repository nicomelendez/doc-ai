import { type APIRoute } from 'astro'
import { refineContext } from '@/lib/ai-summary.ts'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text()
    if (!body) return new Response('No body data', { status: 400 })

    const { contextInfo, responses } = JSON.parse(body)

    const context = await refineContext(contextInfo, responses)
    console.log(context)

    return new Response(JSON.stringify(context), { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
