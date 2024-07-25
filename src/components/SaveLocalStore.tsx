import React, { useEffect } from 'react'
import useStore from '@/lib/useStore.ts'

export default function SaveLocalStore() {
  const { setAnalysisResponse, setContextResponse } = useStore(
    (state: any) => state
  )

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'analyze') {
        const newState = JSON.parse(event.newValue || '[]')
        setAnalysisResponse(newState)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    const analyzeString = localStorage.getItem('analyze')
    if (analyzeString != null) {
      setAnalysisResponse({ analysisResponse: analyzeString })
    }
    const contextString = localStorage.getItem('context')
    if (contextString != null) {
      setContextResponse({ contextResponse: contextString })
    }
  }, [])

  return <></>
}
