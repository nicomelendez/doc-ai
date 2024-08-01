import React from 'react'
import useStore from '@/lib/useStore.ts'
import Loading from './utils/Loading'

export default function Preview() {
  const getAnalysis = useStore((state) => state.getAnalysis)

  const data = getAnalysis()
  console.log(data)
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
  return (
    <button
      onClick={downloadWord}
      className='text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
    >
      Descargar
    </button>
  )
}
