import React, { useState } from 'react'
import useStore from '@/lib/useStore.ts'
import Loading from './utils/Loading'
import Questions from './Questions'
import { expand } from '@/services/expand.js'
import Toastify from 'toastify-js'

export default function Generar() {
  const { contextResponse, setContextResponse, setAnalysisResponse } = useStore(
    (state) => state
  )
  const getAnalysis = useStore((state) => state.getAnalysis)
  const [loading, setLoading] = useState(false)
  const [finish, setFinish] = useState(false)
  const [loadingDownload, setLoadingDownload] = useState(false)

  async function downloadWord() {
    setLoadingDownload(true)
    try {
      const blob = await expand(getAnalysis())
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
      Toastify({
        text: 'Hubo un error al crear el documento.',
        duration: 3000,
        destination: 'https://github.com/apvarun/toastify-js',
        newWindow: true,
        close: true,
        gravity: 'top', 
        position: 'center',
        stopOnFocus: true, 
        style: {
          background: 'linear-gradient(to right, #e3342f, #cc1f1a)',
        },
        onClick: function () {}, 
      }).showToast()
      return
    }
  }

  if (finish) {
    return (
      <button
        onClick={downloadWord}
        disabled={loadingDownload}
        className='text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
      >
        {loadingDownload ? 'Creando...' : 'Descargar'}
      </button>
    )
  }

  return (
    <section className='max-w-[700px] space-y-10 pb-20 md:pb-10'>
      {loading ? (
        <Loading />
      ) : (
        <Questions
          contextResponse={contextResponse}
          setContextResponse={setContextResponse}
          setAnalysisResponse={setAnalysisResponse}
          setLoading={setLoading}
          setFinish={setFinish}
        />
      )}
    </section>
  )
}
