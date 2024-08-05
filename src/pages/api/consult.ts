import { type APIRoute } from 'astro'
import { analyzeUserInfo } from '@/lib/ai-summary'
import { StreamingTextResponse } from 'ai'
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  if (!body || !body.info) return new Response('No body data', { status: 400 })
  const { info } = body

  try {
    // Create a stream from the response
    const stream = await analyzeUserInfo(info)

    if (stream == null) {
      return new Response('Internal Server Error', { status: 500 })
    }

    // Return the streaming response
    return new StreamingTextResponse(stream, {
      headers: { 'Content-Type': 'text/plain' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
