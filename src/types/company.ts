export type CompanyId = 'demo' | 'ecommerce' | 'clinica' | 'agencia'

export type RiskLevel = 'alto' | 'medio' | 'baixo'

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
  lastAnalysisAt: string
  score: number
  summary: string
  findings: Finding[]
}
