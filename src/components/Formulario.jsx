import React, { useState } from 'react'
import useStore from '@/lib/useStore.ts'
import Loading from '@/components/utils/Loading'
import Toastify from 'toastify-js'

export default function Formulario({ children }) {
  const { setContextResponse, getConfig } = useStore((state) => state)
  const [loading, setLoading] = useState(false)

  function showModal(modal) {
    if (modal?.style == null) return
    modal.style.display = 'block'
  }

  async function handlerSubmit(e) {
    e.preventDefault()
    setLoading(false)
    const fields = Object.fromEntries(new window.FormData(e.target))

    if (fields.info.trim().length < 200) {
      Toastify({
        text: 'Debes ingresar un texto de almenos 200 caracteres',
        duration: 3000,
        destination: 'https://github.com/apvarun/toastify-js',
        newWindow: true,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'center', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #e3342f, #cc1f1a)',
        },
        onClick: function () {}, // Callback after click
      }).showToast()
      return
    }
    try {
      setLoading(true)
      const config = getConfig()
      const response = await fetch('/api/context', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ info: fields.info, config }),
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
    <div className='mx-auto mt-8 max-w-xl md:h-[175px]'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <form
            onSubmit={handlerSubmit}
            className='flex flex-col md:flex-row gap-y-5 md:gap-y-0 justify-between items-center pb-5'
          >
            {children}
          </form>

          <p className='text-center text-white italic text-sm'>
            Cuanta más información contenga tu texto, mejor será el resultado.
          </p>
        </>
      )}
    </div>
  )
}
