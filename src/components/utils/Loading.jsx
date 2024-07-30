import React from 'react'

export default function Loading() {
  return (
    <section className='w-full max-w-[630px] flex items-center justify-center h-full text-white py-10'>
      <div className='flex items-center gap-x-4 text-lg'>
        <span className='loader'></span>Analizando...
      </div>
    </section>
  )
}
