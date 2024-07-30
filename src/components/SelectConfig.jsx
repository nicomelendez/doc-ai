import React from 'react'
import { Lenguaje, Idioma } from '@/lib/types.ts'
import { SelectComponent } from './SelectComponent'
import useStore from '@/lib/useStore'

export default function SelectConfig() {
  const setConfig = useStore((state) => state.setConfig)

  function hideModal() {
    const modal = document.getElementById('modal')
    if (modal?.style == null) return
    modal.style.display = 'none'
  }

  function handlerSubmit(e) {
    e.preventDefault()
    const fields = Object.fromEntries(new window.FormData(e.target))
    localStorage.setItem('config', JSON.stringify(fields))
    setConfig(fields)
    hideModal()
  }

  function handlerReset() {
    const defaultConfig = {
      lenguaje: Lenguaje.SemiFormal,
      idioma: Idioma.Espanol,
      bibliografia: true,
    }
    localStorage.setItem('config', JSON.stringify(defaultConfig))
    setConfig(defaultConfig)
    hideModal()
  }

  return (
    <div>
      <form
        id='select-config-form'
        onSubmit={handlerSubmit}
        className='p-4 md:p-5 space-y-4 flex flex-col gap-y-5 max-w-[300px]'
      >
        <SelectComponent label='Lenguaje' options={Lenguaje} />
        <SelectComponent label='Idioma' options={Idioma} />
        <label className='flex w-full'>
          <span className='w-[120px] text-white font-medium'>Bibliografia</span>
          <select name='bibliografia' className='flex-1'>
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </select>
        </label>
      </form>
      <div className='flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600'>
        <button
          form='select-config-form'
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Guardar
        </button>
        <button
          type='button'
          onClick={handlerReset}
          className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
        >
          Por defecto
        </button>
      </div>
    </div>
  )
}
