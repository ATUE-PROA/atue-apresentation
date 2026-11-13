import { DIAGNOSTICS_CONTENT } from '../../content/diagnostics'
import { getScoreLevel } from '../../lib/score'

interface ScoreGaugeProps {
  score: number
  className?: string
}

export function ScoreGauge({ score, className }: ScoreGaugeProps) {
  const clampedScore = Math.min(100, Math.max(0, Math.round(score)))
  const level = getScoreLevel(clampedScore)
  const radius = 86
  const circumference = 2 * Math.PI * radius
  const dash = (clampedScore / 100) * circumference

  return (
    <div className={`flex flex-col items-center ${className ?? ''}`}>
      <div className="relative h-48 w-48">
        <svg
          viewBox="0 0 192 192"
          className="size-full -rotate-90"
          role="img"
          aria-label={`${DIAGNOSTICS_CONTENT.score.ariaLabel}: ${clampedScore} de 100. Nível ${level.label}.`}
        >
          <circle
            cx="96"
            cy="96"
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth="10"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            fill="none"
            stroke={level.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference - dash}`}
            className="transition-[stroke-dasharray] duration-700 motion-reduce:transition-none"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold tracking-tight tabular-nums text-foreground">
            {clampedScore}
          </span>
          <span className="text-sm text-muted-foreground">
            {DIAGNOSTICS_CONTENT.score.caption}
          </span>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-2 text-sm">
        <span aria-hidden="true" className={`size-2.5 rounded-full ${level.dotClass}`} />
        <span className="text-muted-foreground">Nível:</span>
        <span className={`font-medium ${level.textClass}`}>{level.label}</span>
      </p>
    </div>
  )
}
