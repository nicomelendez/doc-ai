import React from 'react'

export default function Process({ process }) {
  const getProcessText = (process) => {
    switch (process) {
      case 0:
        return '1/4 - Ajustando el contexto'
      case 1:
        return '2/4 - Buscando información'
      case 2:
        return '3/4 - Procesando la información'
      case 3:
        return '4/4 - Analizando bibliografías'
      default:
        return ''
    }
  }

  const getProcessWidth = (process) => {
    switch (process) {
      case 0:
        return 'w-1/4'
      case 1:
        return 'w-2/4'
      case 2:
        return 'w-3/4'
      case 3:
        return 'w-4/4'
      default:
        return 'w-0'
    }
  }

  return (
    <div className='py-2 max-w-[500px] mx-auto'>
      <h2 className='sr-only'>Steps</h2>
      <div>
        <p className='text-xs font-medium text-gray-500'>
          {getProcessText(process)}
        </p>
        <div
          className={`mt-4 overflow-hidden rounded-full ${
            process === -1 ? '' : 'bg-gray-200'
          }`}
        >
          <div
            className={`h-2 ${getProcessWidth(
              process
            )} rounded-full bg-blue-500 animate-pulse`}
          ></div>
        </div>
      </div>
    </div>
  )
}
