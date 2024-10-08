import { type APIRoute } from 'astro'
import { getBibliografia } from '@/lib/ai-summary.ts'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text()
    if (!body) return new Response('No body data', { status: 400 })

    const jsonBody = JSON.parse(body)

    const objeto = JSON.stringify(jsonBody.info)

    const bibliography = await getBibliografia(objeto)

    return new Response(JSON.stringify(bibliography), { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
