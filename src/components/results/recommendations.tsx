import { collectRecommendations } from '../../lib/score'
import type { Finding } from '../../types/company'

interface RecommendationsProps {
  findings: readonly Finding[]
}

export function Recommendations({ findings }: RecommendationsProps) {
  const recommendations = collectRecommendations(findings)

  return (
    <ol className="space-y-3">
      {recommendations.map((recommendation, index) => (
        <li
          key={recommendation}
          className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
            {index + 1}
          </span>
          <p className="text-sm leading-relaxed text-zinc-300">{recommendation}</p>
        </li>
      ))}
    </ol>
  )
}
