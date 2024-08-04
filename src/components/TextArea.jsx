import React, { useState } from 'react'
import BtnConfig from './utils/BtnConfig'

export default function TextArea() {
  const [countCaracter, setCoountCarater] = useState(0)

  function count(event) {
    event.preventDefault()
    setCoountCarater(event.target.value.length)
  }
  return (
    <div className='w-full'>
      <div className='overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
        <textarea
          name='info'
          onChange={count}
          className='w-full resize-none border-none align-top focus:ring-0 sm:text-sm p-2'
          rows='4'
          placeholder='La importancia de la inteligencia artificial en la educación y como ...'
        ></textarea>

        <div className='bg-white flex flex-col xs:flex-row items-center justify-between p-4'>
          <label className='text-xs sm:text-sm text-gray-800'>
            {countCaracter < 200
              ? `Minimo de caracteres ${countCaracter} / 200`
              : ''}
          </label>

          <div className='flex items-center justify-end gap-2 bg-white'>
            <BtnConfig />

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
      </div>
    </div>
  )
}