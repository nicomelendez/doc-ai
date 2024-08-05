import React, { useState } from 'react'
import Loading from './utils/Loading'
import { getRequestBody, getToastifyError } from '@/lib/scripts.js'
import { refine } from '@/services/refine.js'
import { analyze } from '@/services/analyze.js'
import { bibliography } from '@/services/bibliography.js'
import Process from '@/components/utils/Process'

export default function Questions({
  contextResponse,
  setContextResponse,
  setAnalysisResponse,
  setLoading,
  setFinish,
}) {
  const [process, setProcess] = useState(-1)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(false)
    const fields = Object.fromEntries(new FormData(e.target))

    const requestBody = getRequestBody(fields, contextResponse)
    console.log(requestBody)
    try {
      setLoading(true)
      setProcess(0)
      const refinedContext = await refine(requestBody)

      setProcess(1)
      const responseAnalized = await analyze(refinedContext)

      setProcess(2)
      const bibliographyNew = await bibliography(responseAnalized)

      // Encuentra el índice del objeto con el título 'Bibliografía'
      const index = responseAnalized.pointers.findIndex(
        (item) => item.title === 'Bibliografía'
      )

      // Actualiza directamente el objeto en esa posición
      responseAnalized.pointers[index] = bibliographyNew

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
      setFinish(true)
    } catch (error) {
      getToastifyError('Algo ha salido mal')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-[1000px] space-y-5 '>
      {process === -1 ? (
        contextResponse == null ? (
          <div className='text-white text-2xl font-bold text-center py-10'>
            <Loading />
          </div>
        ) : (
          <>
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
            <div className='text-white flex items-center justify-end pt-5'>
              <button
                type='submit'
                className='text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
              >
                Enviar respuestas
              </button>
            </div>
          </>
        )
      ) : (
        <div className='w-[300px] xs:w-[340px] sm:w-[520px] md:w-[600px]'>
          <Process process={process} />
        </div>
      )}
    </form>
  )
}
