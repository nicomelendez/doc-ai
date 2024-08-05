import { $ } from '@/lib/dom-selector'
import React from 'react'

export default function BtnConfig() {
  function showModal() {
    const modal = $('#modal') 
    if (modal?.style == null) return
    modal.style.display = 'block'
  }

  return (
    <button
      type='button'
      onClick={showModal}
      className='rounded  px-3 py-1.5 text-sm font-medium  focus:outline-none border  focus:ring-4  focus:ring-gray-700 bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='size-5'
      >
        <path d='M0 0h24v24H0z' stroke='none'></path>
        <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z'></path>
        <path d='M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0'></path>
      </svg>
    </button>
  )
}
