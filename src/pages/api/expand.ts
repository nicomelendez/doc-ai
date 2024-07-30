import { type APIRoute } from 'astro'
import { analyzeAndExpandInfo } from '@/lib/ai-summary.ts'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text()
    if (!body) return new Response('No body data', { status: 400 })

    const jsonBody = JSON.parse(body)

    const context = await analyzeAndExpandInfo(jsonBody.info)

    return new Response(JSON.stringify(context), { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
