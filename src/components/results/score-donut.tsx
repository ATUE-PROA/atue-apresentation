import { getScoreLevel } from '../../lib/score'

interface ScoreDonutProps {
  score: number
}

export function ScoreDonut({ score }: ScoreDonutProps) {
  const clampedScore = Math.min(100, Math.max(0, Math.round(score)))
  const level = getScoreLevel(clampedScore)
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const dash = (clampedScore / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative size-44">
        <svg
          viewBox="0 0 140 140"
          className="size-full -rotate-90"
          role="img"
          aria-label={`Score de conformidade ${clampedScore} de 100. Classificação ${level.label}.`}
        >
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#27272a" strokeWidth="12" />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={level.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference - dash}`}
            className="transition-[stroke-dasharray] duration-700 motion-reduce:transition-none"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold tabular-nums tracking-tight text-zinc-100">
            {clampedScore}
          </span>
          <span className="text-xs text-zinc-500">de 100</span>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm">
        <span aria-hidden="true" className={`size-2.5 rounded-full ${level.dotClass}`} />
        <span className="text-zinc-400">Classificação:</span>
        <span className={`font-medium ${level.textClass}`}>{level.label}</span>
      </p>
      <p className="mt-1 max-w-xs text-center text-xs leading-relaxed text-zinc-500">
        {level.description}
      </p>
    </div>
  )
}
