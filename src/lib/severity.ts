import type { RiskLevel } from '../types/company'

export interface SeverityContent {
  label: string
  description: string
  dotClass: string
  badgeClass: string
}

export const SEVERITY_CONTENT: Record<RiskLevel, SeverityContent> = {
  alto: {
    label: 'Alta',
    description: 'Pode comprometer obrigações centrais da LGPD e deve ser tratada primeiro.',
    dotClass: 'bg-red-500',
    badgeClass: 'border-red-600/30 bg-red-600/10 text-red-700 dark:text-red-300',
  },
  medio: {
    label: 'Média',
    description: 'Exige correção planejada e pode gerar dúvidas em uma revisão.',
    dotClass: 'bg-yellow-500',
    badgeClass: 'border-yellow-600/30 bg-yellow-600/10 text-yellow-700 dark:text-yellow-200',
  },
  baixo: {
    label: 'Baixa',
    description: 'Ajuste de clareza ou de documentação, com impacto limitado.',
    dotClass: 'bg-blue-500',
    badgeClass: 'border-blue-600/30 bg-blue-600/10 text-blue-700 dark:text-blue-200',
  },
}

export const SEVERITY_ORDER: readonly RiskLevel[] = ['alto', 'medio', 'baixo']

export function groupBySeverity<T extends { risk: RiskLevel }>(
  findings: readonly T[],
): { risk: RiskLevel; findings: T[] }[] {
  return SEVERITY_ORDER.map((risk) => ({
    risk,
    findings: findings.filter((finding) => finding.risk === risk),
  })).filter((group) => group.findings.length > 0)
}
