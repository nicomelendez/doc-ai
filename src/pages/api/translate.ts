import { type APIRoute } from 'astro'
import { traducirAIngles } from '@/lib/ai-summary.ts'

export const POST: APIRoute = async ({ request }) => {
  try {
    const jsonBody = await request.json()
    if (!jsonBody) return new Response('No body data', { status: 400 })

    const { pointers } = await traducirAIngles(JSON.stringify(jsonBody.info))
 
    return new Response(JSON.stringify({ pointers, status: 'Completo' }), {
      status: 200,
    })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
