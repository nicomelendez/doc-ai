import OpenAI from 'openai'
import {
  getPromptAnalyze,
  getPromptContext,
  refineContextPrompt,
  expandPoint,
} from './const'
import type { AnalysisResponse, Ask, Pointer, Config } from './types'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const perplexity = new OpenAI({
  apiKey: import.meta.env.PERPLEXITY_API_KEY || '',
  baseURL: 'https://api.perplexity.ai',
})

export function buildPrompt(
  prompt: string
): [{ role: 'user'; content: string }] {
  return [
    {
      role: 'user',
      content: prompt,
    },
  ]
}

/* export async function analyzeUserInfo(info: string) {
  const prompt = `
    Generame un texto de almenos 100 caracteres sobre esto:
    ${info}
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

  const streamingResponse = new StreamingTextResponse(stream)
  return await streamingResponse.text()
} */

export async function analyzeInfo(info: String) {
  try {
    const prompt = getPromptAnalyze(info)

    const query = {
      model: 'llama-3.1-70b-instruct',
      messages: buildPrompt(prompt),
      max_tokens: 10000,
      temperature: 0.75,
      frequency_penalty: 1,
    } as const

    const response = await perplexity.chat.completions.create(query)

    const textResponse = response.choices[0].message.content

    if (textResponse == null) return null

    const jsonResponse = JSON.parse(textResponse)
    return jsonResponse
  } catch (error) {
    return null
  }
}

export async function contextInfo(info: String, config: Config) {
  console.log(config)
  try {
    const prompt = getPromptContext(
      info,
      'Un reporte para la universidad',
      config.lenguaje.toString()
    )

    const query = {
      model: 'llama-3-sonar-large-32k-chat',
      messages: buildPrompt(prompt),
      max_tokens: 5000,
      temperature: 0.75,
      frequency_penalty: 1,
    } as const

    const response = await perplexity.chat.completions.create(query)

    const textResponse = response.choices[0].message.content

    if (textResponse == null) return null

    const jsonResponse = JSON.parse(textResponse)

    return jsonResponse
  } catch (error) {
    return null
  }
}

export async function refineContext(originalContext: String, responses: Ask[]) {
  let refinedContext = originalContext

  const prompt = refineContextPrompt(refinedContext, responses)

  const query = {
    model: 'llama-3.1-70b-instruct',
    messages: buildPrompt(prompt),
    max_tokens: 5000,
    temperature: 0.75,
    frequency_penalty: 1,
  } as const

  try {
    const responseAPI = await perplexity.chat.completions.create(query)
    const textResponse = responseAPI.choices[0].message.content

    if (!textResponse || textResponse.trim() === '') {
      return refinedContext
    }

    try {
      const jsonResponse = JSON.parse(textResponse)
      refinedContext = jsonResponse.context
    } catch (jsonError) {
      return null
    }

    return refinedContext
  } catch (error) {
    console.error('Error refining context:', error)
    return null
  }
}

export async function expandPointDetails(
  title: String,
  descripcion: String,
  id: String
) {
  const prompt = expandPoint(title, descripcion, 'Español', id)

  const query = {
    model: 'llama-3.1-70b-instruct',
    messages: buildPrompt(prompt),
    max_tokens: 10000,
    temperature: 0.75,
    frequency_penalty: 1,
  }

  try {
    const response = await perplexity.chat.completions.create(query)
    const textResponse = response.choices[0].message.content

    if (textResponse == null || textResponse.trim() === '') {
      return null
    }
    let objeto
    try {
      objeto = JSON.parse(textResponse)
    } catch (error) {
      console.log('No se parseo bien')
      objeto = { title, descripcion }
    }

    return objeto
  } catch (error) {
    console.error('Failed to expand point details:', error)
    return null
  }
}

export async function analyzeAndExpandInfo(initialPoints: AnalysisResponse) {
  const expandedPoints = await Promise.all(
    initialPoints.pointers.map(async (point) => {
      if (point == null) return
      return await expandPointDetails(
        point.title,
        point.descripcion,
        point.id.toString()
      )
    })
  )
  console.log(expandedPoints)
  return expandedPoints
}

