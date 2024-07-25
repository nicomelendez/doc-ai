import React, { useState } from 'react'
import useStore from '@/lib/useStore.ts'

export default function Questions() {
  const { contextResponse, setContextResponse, getContext } = useStore(
    (state) => state
  )

  if (contextResponse == null) {
    return <>Algo malo salio</>
  }

  const data = JSON.parse(contextResponse.contextResponse)
  console.log(data)
  
  async function handleSubmit(e) {
    e.preventDefault()
    const fields = Object.fromEntries(new FormData(e.target))
    const responsesArray = []

    data.asks.forEach((item) => {
      const responseKey = `response-${item.id}`
      if (fields[responseKey]) {
        responsesArray.push({
          id: item.id,
          ask: item.ask,
          response: fields[responseKey],
        })
      }
    })

    // Preparar el cuerpo de la solicitud
    const requestBody = {
      contextInfo: data.context, // Asegúrate de que 'data.context' exista y tenga el contexto inicial
      responses: responsesArray,
    }

    // Llamada a la API
    try {
      const response = await fetch('/api/refine', {
        // Ajusta la URL según la ruta de tu API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const refinedContext = await response.json()
      console.log('Refined context:', refinedContext)

      localStorage.setItem('context', JSON.stringify(refinedContext))
      setContextResponse({ contextResponse: refinedContext })

      const responseAnalized = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ info: refinedContext.context }),
      })

      if (!responseAnalized.ok) {
        setLoading(false)
        const modal = document.getElementById('modal')
        showModal(modal)
        return
      }

      const data = await responseAnalized.json()
      console.log(data)
      // window.location.href = '/generar'
    } catch (error) {
      console.error('Error posting to API:', error)
    }
  }

  return (
    <section className='max-w-[1200px] space-y-10 '>
      <form onSubmit={handleSubmit} className='w-[1000px] space-y-10 '>
        {data.asks.map((item) => {
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
          <button
            type='button'
            className='py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700'
          >
            Omitir paso
          </button>
        </div>
      </form>
    </section>
  )
}
