import { SIMULATED_FINDINGS } from '../mocks/findings'
import type { Finding, RiskLevel } from '../types/company'

const RISK_WEIGHT: Record<RiskLevel, number> = {
  alto: 20,
  medio: 11,
  baixo: 6,
}

export interface SimulatedAnalysis {
  score: number
  findings: Finding[]
}

function hashSeed(seed: string): number {
  let hash = 2166136261

  for (let index = 0; index < seed.length; index += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(index), 16777619)
  }

  return Math.abs(hash)
}

function rank(seed: number, salt: string): number {
  let value = seed

  for (let index = 0; index < salt.length; index += 1) {
    value = Math.imul(value ^ salt.charCodeAt(index), 16777619)
  }

  return value >>> 0
}

/** Escolhe pendências e calcula o índice a partir de uma entrada determinística. */
export function createSimulatedAnalysis(seed: string): SimulatedAnalysis {
  const hash = hashSeed(seed)
  const count = 2 + (hash % 4)
  const findings = [...SIMULATED_FINDINGS]
    .map((finding) => ({ finding, order: rank(hash, finding.id) }))
    .sort((first, second) => first.order - second.order)
    .slice(0, count)
    .map(({ finding }) => finding)

  const score = Math.max(
    18,
    100 - findings.reduce((total, finding) => total + RISK_WEIGHT[finding.risk], 0),
  )

  return { score, findings }
}
