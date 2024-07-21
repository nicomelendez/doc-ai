// import { type APIRoute } from 'astro'
// import { summarizeReviews } from '@/lib/ai-summary.ts'

// export const POST: APIRoute = async ({ request }) => {
//   try {
//     const body = await request.json()
//     const data = await summarizeReviews('Holaaaa')
//     console.log(data)
//     return new Response(JSON.stringify({ data: null }), { status: 200 })
//   } catch (error) {
//     console.error('Error:', error)
//     return new Response('Internal Server Error', { status: 500 })
//   }
// }
