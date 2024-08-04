import React, { useState } from 'react'
import useStore from '@/lib/useStore.ts'
import Loading from '@/components/utils/Loading'
import { context } from '@/services/context'
import { getToastify } from '@/lib/scripts'

export default function Formulario({ children }) {
  const { setContextResponse, getConfig } = useStore((state) => state)
  const [loading, setLoading] = useState(false)

  async function handlerSubmit(e) {
    e.preventDefault()
    setLoading(false)
    const fields = Object.fromEntries(new window.FormData(e.target))

    if (fields.info.trim().length < 200) {
      getToastify('Debes ingresar un texto de almenos 200 caracteres')
      return
    }
    try {
      setLoading(true)
      const config = getConfig()

      const data = await context(fields.info, config)

      if (!data) {
        setLoading(false)
        getToastify('No pudimos procesar tu texto, vuelve a intentar')
        return
      }

      setLoading(false)
      localStorage.setItem('context', JSON.stringify(data))
      setContextResponse({ contextResponse: data })
      window.location.href = '/analisis'
    } catch (error) {
      getToastify('Algo ha salido mal')
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
