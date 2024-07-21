import React from 'react'
import useStore from '@/lib/useStore.js'

export default function Formulario({ children }) {
  const setApiResponse = useStore((state) => state.setApiResponse)

  function showModal(modal) {
    if (modal?.style == null) return
    modal.style.display = 'block'
  }

  async function handlerSubmit(e) {
    e.preventDefault()

    const fields = Object.fromEntries(new window.FormData(e.target))

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ info: fields.info }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }

      const data = await response.json()

      localStorage.setItem('analyze', JSON.stringify(data))
      setApiResponse(data)
      window.location.href = '/personalizacion'
    } catch (error) {
      const modal = document.getElementById('modal')
      console.log('algo salio mal')
      showModal(modal)
      return
    }
  }

  return (
    <div className='mx-auto mt-8 max-w-xl'>
      <form
        onSubmit={handlerSubmit}
        className='flex justify-between items-center'
      >
        {children}
      </form>
    </div>
  )
}
