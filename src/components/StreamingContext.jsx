import React, { useState } from 'react'

export default function StreamingContext() {
  const [responseText, setResponseText] = useState('')
  const [loading, setLoading] = useState(false)
  function showModal() {
    const modal = $('#modal') 
    if (modal?.style == null) return
    modal.style.display = 'block'
  }
  async function get() {
    setLoading(true)
    setResponseText('')
    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ info: 'Marketing' }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunk = decoder.decode(value, { stream: true })

        // Remover formato no deseado y concatenar texto
        setResponseText((prev) => prev + chunk.replace(/(\d+:"|")/g, ''))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='text-white flex flex-col items-center py-10'>
      <h3 className='font-semibold pb-5 text-center'>
        ¿No tienes un texto que explaye tu tema?
      </h3>
      <button
        className='inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-blue-500'
        onClick={showModal}
      >
        Genera uno
      </button>
      {/* <button onClick={get} disabled={loading}>
        {loading ? 'Cargando...' : 'Enviar'}
      </button>
      {responseText && <div className='response text-sm'>{responseText}</div>} */}
    </div>
  )
}
