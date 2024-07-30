import React, { useState } from 'react'

export default function StreamingContext() {
  const [responseText, setResponseText] = useState('')
  const [loading, setLoading] = useState(false)

  async function get() {
    setLoading(true)
    setResponseText('') // Limpiar el texto anterior
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
        setResponseText(prev => prev + chunk.replace(/(\d+:"|")/g, ''))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='text-white'>
      <button onClick={get} disabled={loading}>
        {loading ? 'Cargando...' : 'Enviar'}
      </button>
      {responseText && <div className='response text-sm'>{responseText}</div>}
    </div>
  )
}
