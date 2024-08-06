import OpenAI from 'openai'
import {
  getPromptAnalyze,
  getPromptContext,
  refineContextPrompt,
  expandPoint,
  getPromptBibliografia,
  expandPointAll,
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

export async function analyzeUserInfo(info: string) {
  const prompt = `
  Genera un texto coherente de entre 200 y 250 caracteres que brinde un contexto inicial basado en la siguiente información:
    
  ${info}


  Recuerda que no tiene que ser menor a 200 ni mayor a 250 caracteres. Asegúrate de que el texto sea claro, conciso y relevante para el tema proporcionado.
  `;

  const query = {
    model: 'llama-3.1-70b-instruct',
    stream: true,
    messages: buildPrompt(prompt),
    max_tokens: 2000,
    temperature: 0.75,
    frequency_penalty: 1,
  } as const

  const response = await perplexity.chat.completions.create(query)

  const stream = OpenAIStream(response)

  return stream
}

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

export async function getBibliografia(info: String) {
  try {
    const prompt = getPromptBibliografia(info)

    const query = {
      model: 'llama-3.1-70b-instruct',
      messages: buildPrompt(prompt),
      max_tokens: 7000,
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
  try {
    const prompt = getPromptContext(info, config.lenguaje.toString())

    const query = {
      model: 'llama-3.1-70b-instruct',
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

export async function analyzeAndExpandInfo(pointers: Pointer[]) {
  const expandedPoints = await Promise.all(
    pointers.map(async (point) => {
      if (point == null) return
      return await expandPointDetails(
        point.title,
        point.descripcion,
        point.id.toString()
      )
    })
  )
  return expandedPoints
}

export async function expandPointDetailsAll(initialPoints: AnalysisResponse) {
  const prompt = expandPointAll(JSON.stringify(initialPoints.pointers))

  const query = {
    model: 'llama-3.1-70b-instruct',
    messages: buildPrompt(prompt),
    max_tokens: 10000,
    temperature: 1,
    frequency_penalty: 1,
  }

  try {
    const response = await perplexity.chat.completions.create(query)
    const textResponse = response.choices[0].message.content

    if (textResponse == null || textResponse.trim() === '') {
      return null
    }

    const objeto = JSON.parse(textResponse)

    return objeto
  } catch (error) {
    console.error('Failed to expand point details:', error)
    return null
  }
}
