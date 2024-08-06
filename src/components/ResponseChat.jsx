import React from 'react'
import { getToastifyError, getToastifySuccess } from '@/lib/scripts'

export default function ResponseChat({ responseText }) {
  const copyToClipboard = () => {
    const cleanedText = responseText.replace(/\n/g, ' ')
    if (cleanedText) {
      navigator.clipboard
        .writeText(cleanedText)
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
            <div className='flex items-center justify-between pt-5'>
              <span className='inline-flex items-center gap-x-1 justify-center rounded-full bg-amber-100 px-2.5 py-1 text-amber-700'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='size-4'
                >
                  <path d='M0 0h24v24H0z' stroke='none' />
                  <path d='M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M12 8v4M12 16h.01' />
                </svg>

                <p class='whitespace-nowrap text-xs'>
                  Puede que veas el texto con espacios entre palabras, pero no
                  afecta su uso.
                </p>
              </span>
              <button
                onClick={copyToClipboard}
                className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm max-w-[100px] flex items-center gap-x-2'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='size-5'
                >
                  <path d='M0 0h24v24H0z' stroke='none' />
                  <path d='M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z' />
                  <path d='M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1' />
                </svg>
                Copiar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
