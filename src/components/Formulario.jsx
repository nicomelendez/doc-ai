import React, { useState } from 'react'
import useStore from '@/lib/useStore.ts'
import Loading from './Loading'

export default function Formulario({ children }) {
  const setContextResponse = useStore((state) => state.setContextResponse)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  function showModal(modal) {
    if (modal?.style == null) return
    modal.style.display = 'block'
  }

  async function handlerSubmit(e) {
    e.preventDefault()
    setLoading(false)
    setError(false)
    const fields = Object.fromEntries(new window.FormData(e.target))

    if (fields.info.length < 500) {
      setError(true)
      return
    }
    try {
      setLoading(true)
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ info: fields.info }),
      })

      if (!response.ok) {
        setLoading(false)
        const modal = document.getElementById('modal')
        showModal(modal)
        return
      }

      const data = await response.json()

      setLoading(false)
      localStorage.setItem('context', JSON.stringify(data))
      setContextResponse({ contextResponse: data })
      window.location.href = '/personalizacion'
    } catch (error) {
      const modal = document.getElementById('modal')
      showModal(modal)
      return
    }
  }
  return (
    <div className='mx-auto mt-8 max-w-xl pb-10 md:pb-0'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <form
            onSubmit={handlerSubmit}
            className='flex flex-col md:flex-row gap-y-5 md:gap-y-0 justify-between items-center'
          >
            {children}
          </form>
          <p className='text-center text-red-600 text-sm pt-5'>
            {error ? 'Debes ingresar un texto de almenos 500 caracteres.' : ''}
          </p>
        </>
      )}
    </div>
  )
}
