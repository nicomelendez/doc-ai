import React, { useState } from 'react'
import useStore from '@/lib/useStore.ts'
import Loading from './utils/Loading'
import { getRequestBody } from '@/lib/scripts.js'
import { refine } from '@/services/refine.js'
import { analyze } from '@/services/analyze.js'
import Questions from './Questions'

export default function Generar() {
  const { contextResponse, setContextResponse, setAnalysisResponse } = useStore(
    (state) => state
  )
  const getAnalysis = useStore((state) => state.getAnalysis)
  const [loading, setLoading] = useState(false)
  const [finish, setFinish] = useState(false)

  async function downloadWord() {
    try {
      const response = await fetch('/api/expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ info: getAnalysis() }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'documento.docx'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download the document:', error)
    }
  }

  if (finish) {
    return (
      <button
        onClick={downloadWord}
        className='text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
      >
        Descargar
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
