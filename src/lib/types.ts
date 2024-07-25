export enum Lenguaje {
  Formal = 'Formal',
  SemiFormal = 'SemiFormal',
  Informal = 'Informal',
}

export enum Idioma {
  Espanol = 'Español',
  Ingles = 'Inglés',
  Frances = 'Francés',
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
  ask: string
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
  asks: Ask[]
}

export interface StoreState {
  analysisResponse: AnalysisResponse | null
  setAnalysisResponse: (response: AnalysisResponse) => void
  contextResponse: ContextResponse | null
  setContextResponse: (response: ContextResponse) => void
  getContext: () => ContextResponse | null
  config: Config
  setConfig: (config: Partial<Config>) => void
  getConfig: () => Config | null
}
