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
    bibliografia: false,
  },
  finish: null,
  getContext: () => {
    const state: StoreState = useStore.getState()
    if (state.contextResponse) {
      return state.contextResponse
    }
    return null
  },
  getAnalysis: () => {
    const state: StoreState = useStore.getState()
    if (state.analysisResponse) {
      return state.analysisResponse
    }
    return null
  },
  setConfig: (newConfig: any) => set({ config: newConfig }),
  getConfig: () => {
    const state: StoreState = useStore.getState()
    return state.config
  },
  getFinish: () => {
    const state: StoreState = useStore.getState()
    return state.finish
  },
  setFinish: (newConfig: any) => set({ finish: newConfig }),
}))

export default useStore
