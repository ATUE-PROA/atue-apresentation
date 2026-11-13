import { AlertTriangle, Check, Info } from './icons'

type AlertTone = 'success' | 'error' | 'info'

interface FormAlertProps {
  tone: AlertTone
  title: string
  description?: string
}

const TONE_STYLES: Record<AlertTone, { box: string; icon: string }> = {
  success: {
    box: 'border-green-600/30 bg-green-600/10 text-green-800 dark:text-green-300',
    icon: 'text-green-700 dark:text-green-400',
  },
  error: {
    box: 'border-red-600/30 bg-red-600/10 text-red-800 dark:text-red-300',
    icon: 'text-red-700 dark:text-red-400',
  },
  info: {
    box: 'border-blue-600/30 bg-blue-600/10 text-blue-900 dark:text-blue-200',
    icon: 'text-blue-700 dark:text-blue-300',
  },
}

export function FormAlert({ tone, title, description }: FormAlertProps) {
  const style = TONE_STYLES[tone]
  const Icon = tone === 'success' ? Check : tone === 'error' ? AlertTriangle : Info

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`mt-4 flex gap-2 rounded-lg border p-3 text-sm ${style.box}`}
    >
      <Icon aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${style.icon}`} />
      <div>
        <p className="font-medium">{title}</p>
        {description ? <p className="mt-1 leading-relaxed">{description}</p> : null}
      </div>
    </div>
  )
}
