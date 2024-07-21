import React, { useEffect } from 'react'
import useStore from '@/lib/useStore.js'
export default function SaveLocalStore() {
  const { apiResponse, setApiResponse } = useStore((state: any) => state)

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'analyze') {
        const newState = JSON.parse(event.newValue || '[]')
        setApiResponse(newState)
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
    
      setApiResponse({ data: analyzeString })
    }
  }, [])

  return <></>
}
