import React from 'react'

export default function Loading({ estilos, estilosSpan }) {
  return (
    <section
      className={
        estilos != null
          ? estilos
          : 'w-full max-w-[630px] flex items-center justify-center h-full text-white py-10'
      }
    >
      <div
        className={
          estilosSpan != null
            ? estilosSpan
            : 'flex items-center gap-x-4 text-lg'
        }
      >
        <span className='loader'></span>Analizando...
      </div>
    </section>
  )
}
