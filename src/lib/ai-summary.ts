import OpenAI from 'openai'
import {
  getPromptAnalyze,
  getPromptContext,
  refineContextPrompt,
} from './const'
import type { Ask } from './types'

const perplexity = new OpenAI({
  apiKey: import.meta.env.PERPLEXITY_API_KEY || '',
  baseURL: 'https://api.perplexity.ai',
})

function buildPrompt(prompt: string): [{ role: 'user'; content: string }] {
  return [
    {
      role: 'user',
      content: prompt,
    },
  ]
}

export async function analyzeInfo(info: String) {
  try {
    const prompt = getPromptAnalyze(info)

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

export async function contextInfo(info: String) {
  try {
    const prompt = getPromptContext(
      info,
      'Un reporte para la universidad',
      'Semiformal'
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
    console.log(textResponse)
    if (textResponse == null) return null

    const jsonResponse = JSON.parse(textResponse)

    return jsonResponse
  } catch (error) {
    return null
  }
}

export async function refineContext(originalContext: String, responses: Ask[]) {
  let refinedContext = originalContext

  try {
    for (const { ask, response } of responses) {
      const prompt = refineContextPrompt(refinedContext, ask, response || '')

      const query = {
        model: 'llama-3-sonar-large-32k-chat',
        messages: buildPrompt(prompt),
        max_tokens: 5000,
        temperature: 0.75,
        frequency_penalty: 1,
      } as const

      const responseAPI = await perplexity.chat.completions.create(query)
      const textResponse = responseAPI.choices[0].message.content

      if (textResponse == null || textResponse.trim() === '') {
        console.error('No response or empty response received.')
        return
      }

      try {
        const jsonResponse = JSON.parse(textResponse)

        refinedContext = jsonResponse.context
      } catch (error) {
        return // Exit if JSON parsing fails
      }
    }

    return refinedContext // Retorna el contexto completamente refinado
  } catch (error) {
    console.error('Error refining context:', error)
    return null
  }
}
