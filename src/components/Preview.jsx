import React from 'react'
import useStore from '@/lib/useStore.ts'

export default function Preview() {
  const apiResponse = useStore((state) => state.analysisResponse)
  if (apiResponse == null || !apiResponse.data) {
    return <>Algo malo salio</>
  }

  console.log(apiResponse)
  const data = JSON.parse(apiResponse.data)
  return (
    <section>
      <div className='border-t-2 border-white'></div>
      <h2 className='text-3xl text-white font-bold sm:text-4xl leading-relaxed py-8 text-center'>
        Preview del documento
      </h2>

      {data.pointers.map((item) => {
        if (item.ask !== '') {
          return (
            <div className='text-white mb-5' key={item.id + 10}>
              <p className='pb-1 font-medium'>{item.title}</p>
              <p>{item.descripcion}</p>
            </div>
          )
        }
      })}
    </section>
  )
}
