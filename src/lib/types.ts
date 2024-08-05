export enum Lenguaje {
  Formal = 'Formal',
  SemiFormal = 'SemiFormal',
  Informal = 'Informal',
}

export enum Idioma {
  Espanol = 'Español',
  Ingles = 'Inglés',
}

export interface SelectProps {
  label: string
  options: Record<string, string>
}

export interface Config {
  lenguaje: Lenguaje
  idioma: Idioma
  bibliografia: boolean
}

export interface Pointer {
  id: number
  title: string
  descripcion: string
}

export interface Ask {
  id: number
  ask: string
  response: string | null
}

export interface AnalysisResponse {
  status: 'analizando' | 'completado' | 'error'
  pointers: Pointer[]
}

export interface ContextResponse {
  context: String | ''
  asks: Ask[]
}

export interface StoreState {
  analysisResponse: AnalysisResponse | null
  contextResponse: ContextResponse | null
  config: Config | null
  finish: Boolean | null
  setAnalysisResponse: (response: AnalysisResponse) => void
  setContextResponse: (response: ContextResponse) => void
  setConfig: (config: Partial<Config>) => void
  setFinish: (finish: Partial<Boolean>) => void
  getAnalysis: () => AnalysisResponse | null
  getContext: () => ContextResponse | null
  getConfig: () => Config | null
  getFinish: () => Boolean | null
}
