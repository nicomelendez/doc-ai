import React, { useState } from 'react'
import ResponseChat from './ResponseChat'
import { consult } from '@/services/consult'
import { getToastifyError } from '@/lib/scripts'

export default function Chat() {
  const [responseText, setResponseText] = useState('')
  const [loading, setLoading] = useState(false)

  async function handlerSumbit(event) {
    event.preventDefault()
    setLoading(false)
    const { info } = Object.fromEntries(new window.FormData(event.target))

    setResponseText('')
    try {
      setLoading(true)
      const reader = await consult(info)

      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunk = decoder.decode(value, { stream: true })

        setResponseText((prev) => prev + chunk.replace(/(\d+:"|")/g, ''))
      }

      setLoading(false)
    } catch (error) {
      getToastifyError('Algo ha salio mal')
    }
  }

  return (
    <>
      {responseText.trim() === '' ? (
        <div className='text-center'>
          <h2 className='text-3xl text-white font-bold sm:text-4xl leading-relaxed pb-3'>
            Genera un contexto para poder crear tu plantilla
          </h2>
          <p className='text-gray-300 pb-10'>
            Describe un poco la idea de la cual necesitas realizar un informe.
          </p>
        </div>
      ) : (
        <ResponseChat
          loading={loading}
          setLoading={setLoading}
          responseText={responseText}
          setResponseText={setResponseText}
        />
      )}

      <form onSubmit={handlerSumbit} className='w-full max-w-[720px]'>
        <div className='w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
          <textarea
            name='info'
            className='w-full resize-none border-none align-top focus:ring-0 sm:text-sm p-2'
            rows='4'
            placeholder='La importancia de la inteligencia artificial en la educación y como ...'
          ></textarea>

          <div className='bg-slate-200 border border-slate-200 flex items-center justify-end p-3'>
            <button
              type='submit'
              className='rounded px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='size-5'
              >
                <path d='M0 0h24v24H0z' stroke='none'></path>
                <path d='M10 14 21 3M21 3l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3'></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
