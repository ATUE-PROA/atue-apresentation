import type { Finding, RiskLevel } from '../types/company'

export type ScoreLabel = 'Crítico' | 'Atenção' | 'Conforme'

export interface ScoreLevel {
  label: ScoreLabel
  description: string
  color: string
  textClass: string
  dotClass: string
}

export function getScoreLevel(score: number): ScoreLevel {
  if (score < 25) {
    return {
      label: 'Crítico',
      description: 'A operação precisa de correções prioritárias antes de avançar.',
      color: '#ef4444',
      textClass: 'text-red-600 dark:text-red-400',
      dotClass: 'bg-red-500',
    }
  }

  if (score < 50) {
    return {
      label: 'Atenção',
      description: 'Existem lacunas relevantes que exigem um plano de adequação.',
      color: '#f97316',
      textClass: 'text-orange-700 dark:text-orange-400',
      dotClass: 'bg-orange-500',
    }
  }

  if (score < 75) {
    return {
      label: 'Atenção',
      description: 'A base está organizada, mas ainda há pontos a evoluir.',
      color: '#eab308',
      textClass: 'text-yellow-700 dark:text-yellow-400',
      dotClass: 'bg-yellow-500',
    }
  }

  return {
    label: 'Conforme',
    description: 'Os controles avaliados estão em um patamar satisfatório.',
    color: '#22c55e',
    textClass: 'text-green-700 dark:text-green-400',
    dotClass: 'bg-green-500',
  }
}

export interface RiskMeta {
  label: string
  description: string
  textClass: string
  badgeClass: string
  dotClass: string
}

export const RISK_META: Record<RiskLevel, RiskMeta> = {
  alto: {
    label: 'Risco alto',
    description: 'Corrigir com prioridade. Há exposição direta de dados ou obrigações não atendidas.',
    textClass: 'text-red-700 dark:text-red-300',
    badgeClass: 'border-red-600/30 bg-red-600/10 text-red-700 dark:text-red-300',
    dotClass: 'bg-red-500',
  },
  medio: {
    label: 'Risco médio',
    description: 'Tratar no curto prazo. O controle existe, mas está incompleto ou pouco transparente.',
    textClass: 'text-yellow-700 dark:text-yellow-200',
    badgeClass: 'border-yellow-600/30 bg-yellow-600/10 text-yellow-700 dark:text-yellow-200',
    dotClass: 'bg-yellow-500',
  },
  baixo: {
    label: 'Risco baixo',
    description: 'Evoluir de forma planejada. O impacto é limitado, mas a melhoria é recomendada.',
    textClass: 'text-blue-700 dark:text-blue-200',
    badgeClass: 'border-blue-600/30 bg-blue-600/10 text-blue-700 dark:text-blue-200',
    dotClass: 'bg-blue-500',
  },
}

const RISK_WEIGHT: Record<RiskLevel, number> = {
  alto: 0,
  medio: 1,
  baixo: 2,
}

export function sortFindingsByRisk(findings: readonly Finding[]): Finding[] {
  return [...findings].sort((first, second) => RISK_WEIGHT[first.risk] - RISK_WEIGHT[second.risk])
}

export interface FindingSummary {
  total: number
  high: number
  medium: number
  low: number
}

export function summarizeFindings(findings: readonly Finding[]): FindingSummary {
  return findings.reduce<FindingSummary>(
    (summary, finding) => {
      summary.total += 1

      if (finding.risk === 'alto') {
        summary.high += 1
      } else if (finding.risk === 'medio') {
        summary.medium += 1
      } else {
        summary.low += 1
      }

      return summary
    },
    { total: 0, high: 0, medium: 0, low: 0 },
  )
}
