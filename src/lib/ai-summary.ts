import OpenAI from 'openai'
import { getPromptAnalyze } from './const'

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
      max_tokens: 1000,
      temperature: 0.75,
      frequency_penalty: 1,
    } as const

    const response = await perplexity.chat.completions.create(query)

    const textResponse = response.choices[0].message.content
    
    if (textResponse == null) return null
    // Intenta convertir el texto de respuesta en un objeto JSON
    const jsonResponse = JSON.parse(textResponse)

    return jsonResponse
  } catch (error) {
    return null
  }
}
