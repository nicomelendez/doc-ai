import React from 'react'

export default function Chat() {
  //Necesito usar la store para almacenar el contexto de la conversación

  async function handlerSumbit(event) {
    // Logica para hacer la llamada a la api y obtener una respuesta
  }

  return (
    <section className='w-full'>
      {/* Poner el streaming  de respuesta de la api para usar el SDK de vercel */}
      <div className='w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
        <textarea
          name='info'
          className='w-full resize-none border-none align-top focus:ring-0 sm:text-sm p-2'
          rows='4'
          placeholder='La importancia de la inteligencia artificial en la educación y como ...'
        ></textarea>

        <div className='bg-white flex items-center justify-end p-2'>
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
    </section>
  )
}
