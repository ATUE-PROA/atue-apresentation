import type { CompanyProfile } from '../types/company'

export interface ExecutiveSummary {
  summary: string
  degraded: boolean
}

/**
 * UI finding id -> catalog code of the AI service. Single source of truth: ids without
 * a catalog equivalent fall through as-is and the AI service applies its Art. 46 fallback.
 */
const AI_CODES: Record<string, string> = {
  'ecommerce-https': 'no_https',
  'ecommerce-csp': 'missing_csp',
  'ecommerce-cookies': 'no_cookie_notice',
  'ecommerce-policy': 'form_without_privacy_policy',
  'clinic-dpo': 'no_dpo_contact',
  'clinic-consent': 'form_without_privacy_policy',
  'agency-cookie-details': 'no_cookie_notice',
  'demo-privacy-policy': 'form_without_privacy_policy',
  'demo-cookie-banner': 'no_cookie_notice',
}

const EVIDENCE_MAX = 300
const TIMEOUT_MS = 8000

export function localSummary(company: CompanyProfile): ExecutiveSummary {
  return { summary: company.summary, degraded: true }
}

export function buildAnalysisRequest(company: CompanyProfile) {
  return {
    organization_id: `demo-${company.id}`,
    site_url: company.website,
    findings: company.findings.map((finding) => ({
      code: AI_CODES[finding.id] ?? finding.id,
      evidence: finding.technicalDescription.slice(0, EVIDENCE_MAX),
      url: company.website,
    })),
  }
}

/**
 * Asks the server-side proxy for the executive summary. Never throws: any network error,
 * timeout, 4xx or 5xx resolves to the local summary with degraded: true.
 */
export async function requestExecutiveSummary(company: CompanyProfile): Promise<ExecutiveSummary> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildAnalysisRequest(company)),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!response.ok) return localSummary(company)

    const body = (await response.json()) as Partial<ExecutiveSummary>
    if (typeof body.summary !== 'string' || body.summary.trim() === '') return localSummary(company)

    return { summary: body.summary, degraded: body.degraded !== false }
  } catch {
    return localSummary(company)
  }
}
