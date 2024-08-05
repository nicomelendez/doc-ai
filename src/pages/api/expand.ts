import { type APIRoute } from 'astro'
import {
  analyzeAndExpandInfo,
  expandPointDetailsAll,
} from '@/lib/ai-summary.ts'

export const POST: APIRoute = async ({ request }) => {
  try {
    const jsonBody = await request.json()
    if (!jsonBody) return new Response('No body data', { status: 400 })
    console.log('Desde expand')
    console.log('--------------')
    console.log(jsonBody)
    console.log('--------------')
    const context = await expandPointDetailsAll(jsonBody.info)

    const nuevoContext = await analyzeAndExpandInfo(context)

    return new Response(
      JSON.stringify({ pointers: nuevoContext, status: 'Completo' }),
      {
        status: 200,
      }
    )
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
