import React from 'react'
import useStore from '@/lib/useStore.ts'

export default function Process({ process }) {
  const { getConfig } = useStore((state) => state)

  const getProcessText = (process) => {
    const config = getConfig()

    const { idioma, bibliografia } = config
    const isBibliografia = bibliografia === 'true'
    if (idioma === 'Español' && isBibliografia) {
      switch (process) {
        case 0:
          return '1/4 - Ajustando el contexto'
        case 1:
          return '2/4 - Buscando información'
        case 2:
          return '3/4 - Procesando la información'
        case 3:
          return '4/4 - Analizando bibliografías'
        default:
          return ''
      }
    } else if (idioma === 'Español' && !isBibliografia) {
      switch (process) {
        case 0:
          return '1/3 - Ajustando el contexto'
        case 1:
          return '2/3 - Buscando información'
        case 2:
          return '3/3 - Procesando la información'
        default:
          return ''
      }
    } else if (idioma === 'Inglés' && isBibliografia) {
      switch (process) {
        case 0:
          return '1/5 - Ajustando el contexto'
        case 1:
          return '2/5 - Buscando información'
        case 2:
          return '3/5 - Procesando la información'
        case 3:
          return '4/5 - Analizando bibliografías'
        case 4:
          return '5/5 - Traducciendo a inglés'
        default:
          return ''
      }
    } else if (idioma === 'Inglés' && !isBibliografia) {
      switch (process) {
        case 0:
          return '1/4 - Ajustando el contexto'
        case 1:
          return '2/4 - Buscando información'
        case 2:
          return '3/4 - Procesando la información'
        case 3:
          return '4/4 - Traducciendo a inglés'
        default:
          return ''
      }
    }
  }

  const getMaxSteps = () => {
    const config = getConfig()
    const { idioma, bibliografia } = config
    const isBibliografia = bibliografia === 'true'
    if (
      (idioma === 'Español' && isBibliografia) ||
      (idioma === 'Inglés' && !isBibliografia)
    ) {
      return 4
    } else if (idioma === 'Inglés' && isBibliografia) {
      return 5
    } else if (idioma === 'Español' && !isBibliografia) {
      return 3
    }
  }

  const getProcessWidth = (process) => {
    const maxSteps = getMaxSteps()
    const percentage = (process / maxSteps) * 100
    return `w-[${percentage}%]`
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
