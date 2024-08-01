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
  setAnalysisResponse: (response: AnalysisResponse) => void
  contextResponse: ContextResponse | null
  setContextResponse: (response: ContextResponse) => void
  getContext: () => ContextResponse | null
  getAnalysis: () => AnalysisResponse | null
  config: Config | null
  setConfig: (config: Partial<Config>) => void
  getConfig: () => Config | null
}
