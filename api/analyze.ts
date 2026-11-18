/**
 * Server-side proxy for the demo. The browser posts here; only this function knows
 * ATUE_AI_URL/ATUE_API_KEY. The NVIDIA key stays in the AI service, never here.
 * Nothing is logged: no payload, no key, no upstream response.
 */

const MAX_BODY_BYTES = 16_000
const UPSTREAM_TIMEOUT_MS = 25_000
const MAX_FINDINGS = 50
const MAX_CODE_LENGTH = 64
const MAX_EVIDENCE_LENGTH = 300

interface AnalysisFinding {
  code: string
  evidence?: string
  url?: string
}

interface AnalysisRequest {
  organization_id: string
  site_url: string
  findings: AnalysisFinding[]
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function isFinding(value: unknown): value is AnalysisFinding {
  if (typeof value !== 'object' || value === null) return false
  const finding = value as Record<string, unknown>
  return (
    typeof finding.code === 'string' &&
    (finding.evidence === undefined || typeof finding.evidence === 'string') &&
    (finding.url === undefined || typeof finding.url === 'string')
  )
}

function isAnalysisRequest(value: unknown): value is AnalysisRequest {
  if (typeof value !== 'object' || value === null) return false
  const body = value as Record<string, unknown>
  if (typeof body.organization_id !== 'string' || typeof body.site_url !== 'string') return false
  if (!Array.isArray(body.findings)) return false
  if (body.findings.length === 0 || body.findings.length > MAX_FINDINGS) return false
  return body.findings.every(isFinding)
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json(405, { error: 'method_not_allowed' })

  const aiUrl = process.env.ATUE_AI_URL
  const apiKey = process.env.ATUE_API_KEY
  if (!aiUrl || !apiKey) return json(503, { error: 'analysis_unavailable' })

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: 'payload_too_large' })

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return json(400, { error: 'invalid_json' })
  }
  if (!isAnalysisRequest(body)) return json(400, { error: 'invalid_payload' })

  // the AI service contract caps code and evidence length
  const findings = body.findings.map((finding) => ({
    code: finding.code.slice(0, MAX_CODE_LENGTH),
    evidence: (finding.evidence ?? '').slice(0, MAX_EVIDENCE_LENGTH),
    url: finding.url,
  }))

  try {
    const upstream = await fetch(`${aiUrl.replace(/\/+$/, '')}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': apiKey },
      body: JSON.stringify({ ...body, findings }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })
    if (!upstream.ok) return json(502, { error: 'analysis_failed' })

    return json(200, await upstream.json())
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'TimeoutError'
    return json(timedOut ? 504 : 502, { error: timedOut ? 'analysis_timeout' : 'analysis_failed' })
  }
}
