export type CompanyId = 'ecommerce' | 'clinica' | 'agencia'

export type RiskLevel = 'alto' | 'medio' | 'baixo'

export type LogLevel = 'success' | 'warning' | 'info'

export interface AnalysisLog {
  level: LogLevel
  message: string
}

export interface Finding {
  id: string
  name: string
  category: string
  risk: RiskLevel
  technicalDescription: string
  businessImpact: string
  recommendation: string
}

export interface CompanyProfile {
  id: CompanyId
  name: string
  segment: string
  description: string
  website: string
  score: number
  summary: string
  findings: Finding[]
  analysisLogs: AnalysisLog[]
}
