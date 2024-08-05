import React from 'react'
import { getToastifyError, getToastifySuccess } from '@/lib/scripts'

export default function ResponseChat({ responseText }) {
  const copyToClipboard = () => {
    if (responseText) {
      navigator.clipboard
        .writeText(responseText)
        .then(() => {
          getToastifySuccess('Texto copiado al portapapeles')
        })
        .catch((err) => {
          getToastifyError('Error al copiar el texto: ')
        })
    }
  }

  return (
    <div>
      {responseText && (
        <div className='flex items-start gap-2.5 w-full pb-10'>
          <div className='flex flex-col gap-1 w-full max-w-[720px] mx-auto'>
            <div className='flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
              <p className='text-sm font-normal text-gray-900 dark:text-white'>
                {responseText}
              </p>
            </div>
            <button
              onClick={copyToClipboard}
              className='mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm max-w-[100px]'
            >
              Copiar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
