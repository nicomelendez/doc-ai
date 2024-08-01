import OpenAI from 'openai'
import {
  getPromptAnalyze,
  getPromptContext,
  refineContextPrompt,
  expandPoint,
} from './const'
import type { AnalysisResponse, Ask, Pointer, Config } from './types'
import { OpenAIStream, StreamingTextResponse } from 'ai' // Vercel AI SDK ***

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

/* export async function refineContext(originalContext: String, responses: Ask[]) {
  let refinedContext = originalContext

  try {
    for (const item of responses) {

      const { ask, response } = item

      if(!ask || !response){
        return 
      }
      const prompt = refineContextPrompt(refinedContext, ask, response || '')

      const query = {
        model: 'llama-3-sonar-large-32k-chat',
        messages: buildPrompt(prompt),
        max_tokens: 8000,
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
        return
      }
    }

    return refinedContext
  } catch (error) {
    console.error('Error refining context:', error)
    return null
  }
} */
export async function refineContext(originalContext: String, responses: Ask[]) {
  let refinedContext = originalContext

  try {
    for (const item of responses) {
      const { ask, response } = item

      if (!ask || !response) {
        console.error('Invalid ask or response:', item)
        continue // Saltar este elemento y continuar con el siguiente
      }

      const prompt = refineContextPrompt(refinedContext, ask, response || '')

      const query = {
        model: 'llama-3-sonar-large-32k-chat',
        messages: buildPrompt(prompt),
        max_tokens: 8000,
        temperature: 0.75,
        frequency_penalty: 1,
      } as const

      try {
        const responseAPI = await perplexity.chat.completions.create(query)
        const textResponse = responseAPI.choices[0].message.content

        if (!textResponse || textResponse.trim() === '') {
          console.error(
            'No response or empty response received for query:',
            query
          )
          continue // Saltar este elemento y continuar con el siguiente
        }

        try {
          const jsonResponse = JSON.parse(textResponse)
          refinedContext = jsonResponse.context
        } catch (jsonError) {
          console.error('Error parsing JSON response:', textResponse, jsonError)
          continue // Saltar este elemento y continuar con el siguiente
        }
      } catch (apiError) {
        console.error('Error in API request:', apiError)
        continue // Saltar este elemento y continuar con el siguiente
      }
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
    console.log('----TextResponse')
    console.log(textResponse)
    console.log('--------------')
    if (textResponse == null || textResponse.trim() === '') {
      console.error('No response or empty response received.')
      return
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
  console.log(initialPoints)
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
  /* const markdown = await jsonToMarkdown(expandedPoints)
  console.log(markdown) */
  return expandedPoints
}
async function jsonToMarkdown(jsonData: any) {
  const prompt = `Genera un documento en Markdown utilizando la siguiente información estructurada en JSON:
  ${JSON.stringify(jsonData, null, 2)}
  
  Instrucciones detalladas:
  - **Evitar Redundancias en Títulos**: Utiliza títulos únicos para cada sección. Si un subtítulo repite información del título principal, intégralo en la descripción en lugar de listar como subtítulo separado.
  - **Consistencia Idiomática**: Mantén la coherencia en el uso del idioma, asegurándote de utilizar una ortografía y gramática correctas en español. Corrige términos incorrectos como "various" a "varios".
  - **Optimización de Longitud**: Condensa la información para mantener las secciones informativas y concisas, evitando redundancias. Céntrate en mantener la claridad y eliminar duplicaciones innecesarias.
  - **Inclusión de URLs en Bibliografía**: Asegúrate de que todas las URLs en la bibliografía estén en formato de enlace clicable, usando Markdown.
  
  Explicación del formato Markdown deseado:
  - **'#' para títulos de secciones**: Usa un solo hash '#' para títulos principales de cada sección, lo cual los convierte en encabezados de nivel uno en Markdown, destacándolos como los más importantes.
  - **'##' para subsecciones**: Usa dos hashes '##' para subsecciones dentro de cada sección principal, creando así encabezados de nivel dos, que son subordinados a los títulos principales.
  - **Descripciones largas**: Estas deben seguir directamente a cada título o subtítulo y estar formateadas como texto normal sin marcadores adicionales.
  - **Listas y puntos**: Utiliza guiones '-' para listas no ordenadas donde sea relevante, para organizar la información de forma que sea fácilmente digestible.
  - **Enlaces clicable en la bibliografía**: Formatea los enlaces como [Nombre del Sitio](URL) para asegurar que sean interactivos y accesibles.
  
  Por favor, sigue estas instrucciones para crear un documento estructurado, informativo y fácil de navegar. 
  
  Recuerda que solo quiero un documento markdown sin nada más adicional`

  const query = {
    model: 'llama-3.1-70b-instruct',
    messages: buildPrompt(prompt),
    max_tokens: 10000,
    temperature: 0.75,
    frequency_penalty: 1,
  }

  try {
    const response = await perplexity.chat.completions.create(query)
    const markdownResponse = response.choices[0].message.content
    if (!markdownResponse) throw new Error('No Markdown response received.')
    return markdownResponse
  } catch (error) {
    console.error('Failed to generate Markdown:', error)
    return null
  }
}
