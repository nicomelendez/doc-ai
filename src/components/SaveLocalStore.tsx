import React, { useEffect } from 'react'
import useStore from '@/lib/useStore.ts'

export default function SaveLocalStore() {
  const { setAnalysisResponse, setContextResponse, setConfig, setFinish } = useStore(
    (state: any) => state
  )

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'context') {
        const newState = JSON.parse(event.newValue || '[]')
        setContextResponse(newState)
      }
      if (event.key === 'config') {
        const newState = JSON.parse(event.newValue || '[]')
        setConfig(newState)
      }
      if (event.key === 'analyze') {
        const newState = JSON.parse(event.newValue || '[]')
        setAnalysisResponse(newState)
      }
      if (event.key === 'finish') {
        const newState = JSON.parse(event.newValue || '[]')
        setFinish(newState)
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
      setAnalysisResponse(JSON.parse(analyzeString))
    }
    const contextString = localStorage.getItem('context')
    if (contextString != null) {
      setContextResponse(JSON.parse(contextString))
    }
    const configString = localStorage.getItem('config')
    if (configString != null) {
      setConfig(JSON.parse(configString))
    }
    const finishString = localStorage.getItem('finish')
    if (finishString != null) {
      setFinish(JSON.parse(finishString))
    }
  }, [])

  return <></>
}
