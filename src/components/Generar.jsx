import React, { useState } from 'react'
import useStore from '@/lib/useStore.ts'
import Questions from './Questions'
import { getToastifyError } from '@/lib/scripts'
import { doc } from '@/services/doc.js'

export default function Generar() {
  const {
    contextResponse,
    setContextResponse,
    setAnalysisResponse,
    getConfig,
    getFinish,
    setFinish,
    getAnalysis,
  } = useStore((state) => state)

  const [loading, setLoading] = useState(false)
  const [loadingDownload, setLoadingDownload] = useState(false)

  async function downloadWord() {
    setLoadingDownload(true)
    try {
      const blob = await doc(getAnalysis())
      const url = URL.createObjectURL(blob)

      setLoadingDownload(false)
      const a = document.createElement('a')
      a.href = url
      a.download = 'documento.docx'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      getToastifyError(
        'Hubo un error al crear el documento. Recarge la página y intente de nuevo.'
      )
    }
  }

  if (getFinish()) {
    return (
      <div className='text-center pt-10'>
        <h2 className='text-3xl text-white font-bold sm:text-4xl leading-relaxed pb-3 mx-auto text-center max-w-[630px] lg:max-w-[800px]'>
          Listo ya puedes descargar tu documento
        </h2>
        <p className='text-gray-300 pb-10 text-pretty'>
          Recuerda que es una plantilla inicial, revisa la información y las
          fuentes.
        </p>
        <button
          onClick={downloadWord}
          disabled={loadingDownload}
          className='text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
        >
          {loadingDownload ? 'Creando...' : 'Descargar'}
        </button>
      </div>
    )
  }

  return (
    <>
      {contextResponse != null ? (
        <>
          <h2 className='text-3xl text-white font-bold sm:text-4xl leading-relaxed pb-3 mx-auto text-center max-w-[630px] lg:max-w-[800px]'>
            {loading
              ? 'En un momento tendras tu documento'
              : 'Completa las siguientes preguntas'}
          </h2>
          <p className='text-gray-300 pb-10'>
            {loading
              ? 'Estamos analizando tus respuestas y buscando información'
              : 'Para poder obtener un informe de mejor calidad y más ajustado a tus necesidades'}
          </p>
        </>
      ) : (
        <></>
      )}

      <section className='max-w-[700px] space-y-10 pb-20 md:pb-10'>
        <Questions
          contextResponse={contextResponse}
          setContextResponse={setContextResponse}
          setAnalysisResponse={setAnalysisResponse}
          setLoading={setLoading}
          setFinish={setFinish}
          getConfig={getConfig}
        />
      </section>
    </>
  )
}
