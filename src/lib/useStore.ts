import { create } from 'zustand'
import type { StoreState, AnalysisResponse, ContextResponse } from '@/lib/types'
import { Lenguaje, Idioma } from '@/lib/types'

const useStore = create<StoreState>((set: any) => ({
  analysisResponse: null,
  setAnalysisResponse: (response: AnalysisResponse) =>
    set({ analysisResponse: response }),
  contextResponse: null,
  setContextResponse: (response: ContextResponse) =>
    set({ contextResponse: response }),
  config: {
    lenguaje: Lenguaje.SemiFormal,
    idioma: Idioma.Espanol,
    bibliografia: true,
  },
  getContext: () => {
    const state: StoreState = useStore.getState()
    if (state.contextResponse) {
      return state.contextResponse
    }
    return null
  },
  setConfig: (newConfig: any) =>
    set((state: any) => ({
      config: { ...state.config, ...newConfig },
    })),
  getConfig: () => {
    const state: StoreState = useStore.getState()
    return state.config
  },
}))

export default useStore
