import React from 'react'

export default function Process({ process }) {
  const getProcessText = (process) => {
    switch (process) {
      case 0:
        return '1/3 - Refinando el contexto'
      case 1:
        return '2/3 - Generando documento'
      case 2:
        return '3/3 - Buscando bibliografías'
      default:
        return ''
    }
  }

  const getProcessWidth = (process) => {
    switch (process) {
      case 0:
        return 'w-1/3'
      case 1:
        return 'w-2/3'
      case 2:
        return 'w-3/3'
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
