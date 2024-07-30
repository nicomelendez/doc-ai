import { buildPrompt } from '@/lib/ai-summary'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { type APIRoute } from 'astro'
import OpenAI from 'openai'

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  if (!body || !body.info) return new Response('No body data', { status: 400 })
  const { info } = body

  const perplexity = new OpenAI({
    apiKey: import.meta.env.PERPLEXITY_API_KEY || '',
    baseURL: 'https://api.perplexity.ai',
  })

  try {
    const prompt = `
    Estás siendo utilizado para generar un informe de al menos 500 caracteres sobre el siguiente tema. Devuelve exclusivamente un texto informativo sobre este contexto. Que sea un texto sin salto de lineas y ni punteos. Solo puntos y seguido.

    Tema: ${info}

    Recuerda que exlusivamente debes devolver un texto sin salto de lineas y ni punteos. Solo puntos y seguido.
    `

    const query = {
      model: 'llama-3-sonar-large-32k-chat',
      stream: true,
      messages: buildPrompt(prompt),
      max_tokens: 1000,
      temperature: 0.75,
      frequency_penalty: 1,
    } as const

    const response = await perplexity.chat.completions.create(query)
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream, {
      headers: { 'Content-Type': 'text/plain' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
