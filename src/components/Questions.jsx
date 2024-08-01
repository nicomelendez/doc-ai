import React, { useState } from 'react'
import useStore from '@/lib/useStore.ts'
import Loading from './utils/Loading'
import { getRequestBody } from '@/lib/scripts.js'
import { refine } from '@/services/refine.js'
import { analyze } from '@/services/analyze.js'

export default function Questions() {
  const { contextResponse, setContextResponse, setAnalysisResponse } = useStore(
    (state) => state
  )
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(false)
    const fields = Object.fromEntries(new FormData(e.target))

    const requestBody = getRequestBody(fields, contextResponse)

    try {
      setLoading(true)
      const refinedContext = await refine(requestBody)
      if (refinedContext == null) {
        setLoading(false)
        alert('Algo fallo en analizar en el refinado')
        return
      }
      const responseAnalized = await analyze(refinedContext)
      console.log(responseAnalized)
      localStorage.setItem(
        'context',
        JSON.stringify({ context: refinedContext, asks: contextResponse.asks })
      )
      setContextResponse({
        contextResponse: refinedContext,
        asks: contextResponse.asks,
      })
      localStorage.setItem('analyze', JSON.stringify(responseAnalized))
      setAnalysisResponse({ analysisResponse: responseAnalized })

      setLoading(false)
      window.location.href = '/preview'
    } catch (error) {
      console.error('Error posting to API:', error)
      alert('Algo fallo la api')
    }
  }

  if (contextResponse == null) {
    return (
      <div className='text-white text-2xl font-bold text-center py-10'>
        <Loading />
      </div>
    )
  }

  return (
    <section className='max-w-[700px] space-y-10 pb-20 md:pb-10'>
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-[1000px] space-y-10 '
        >
          {contextResponse.asks.map((item) => {
            if (item.ask !== '') {
              return (
                <div className='text-white' key={item.id}>
                  <label className='font-medium flex flex-col gap-y-3'>
                    {item.ask}
                    <input
                      name={`response-${item.id}`}
                      className='p-2 rounded-md w-full font-normal text-gray-900'
                      type='text'
                      placeholder='Ingrese la respuesta...'
                    />
                  </label>
                </div>
              )
            }
          })}
          <div className='text-white flex items-center justify-end'>
            <button
              type='submit'
              className='text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
            >
              Enviar respuestas
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
