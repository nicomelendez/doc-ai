import React from 'react'
import useStore from '@/lib/useStore.js'

export default function Questions() {
  const apiResponse = useStore((state) => state.apiResponse)
  if (apiResponse == null || !apiResponse.data) {
    return <>Algo malo salio</>
  }

  console.log(apiResponse)
  const data = JSON.parse(apiResponse.data)

  if (data.status === 'analizando') {
    return (
      <section className='space-y-10'>
        {data.pointers.map((item) => {
          if (item.ask !== '') {
            return (
              <div className='text-white' key={item.id}>
                <label className='font-medium flex flex-col gap-y-3'>
                  {item.ask}
                  <input
                    className='p-2 rounded-md w-full font-normal'
                    type='text'
                    placeholder='Ingrese la respuesta...'
                  />
                </label>
              </div>
            )
          }
        })}
        <div className='text-white'>
          <button
            type='button'
            class='text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
          >
            Enviar respuestas
          </button>
          <button
            type='button'
            class='py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700'
          >
            Omitir paso
          </button>
        </div>
        <div className='border-t-2 border-white'></div>

        {data.pointers.map((item) => {
          if (item.ask !== '') {
            return (
              <div className='text-white' key={item.id + 10}>
                <p className='pb-3 font-medium'>{item.title}</p>
                <p>{item.descripcion}</p>
              </div>
            )
          }
        })}
      </section>
    )
  }
  return <div className='text-white'>{data.status}</div>
}
