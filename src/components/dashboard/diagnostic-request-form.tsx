import { useEffect, useRef, useState, type FormEvent } from 'react'

import { DIAGNOSTICS_CONTENT } from '../../content/diagnostics'
import { FormAlert } from '../ui/form-alert'
import { Button } from '../ui/button'
import { Loader2, Search } from '../ui/icons'

type RequestStatus = 'idle' | 'running' | 'success'

function validateUrl(value: string): string | null {
  if (!value.trim()) {
    return 'Informe a URL do site.'
  }

  try {
    const url = new URL(value)

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return 'Informe um endereço iniciado por http:// ou https://.'
    }
  } catch {
    return 'Informe um endereço completo, incluindo https://.'
  }

  return null
}

interface DiagnosticRequestFormProps {
  onUpdated: (url: string) => void
}

export function DiagnosticRequestForm({ onUpdated }: DiagnosticRequestFormProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<RequestStatus>('idle')
  const timerRef = useRef<number | null>(null)
  const {
    updateTitle,
    updateDescription,
    label,
    placeholder,
    helpText,
    updateSubmitLabel,
    submittingLabel,
    successTitle,
    successDescription,
  } = DIAGNOSTICS_CONTENT.request

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextError = validateUrl(url)

    setError(nextError)

    if (nextError) {
      setStatus('idle')
      return
    }

    setStatus('running')
    timerRef.current = window.setTimeout(() => {
      setStatus('success')
      onUpdated(url.trim())
    }, 800)
  }

  const isRunning = status === 'running'

  return (
    <section
      id="novo-diagnostico"
      aria-labelledby="diagnostic-request-title"
      className="scroll-mt-24 rounded-xl bg-card p-6 ring-1 ring-border"
    >
      <h2 id="diagnostic-request-title" className="text-lg font-semibold text-foreground">
        {updateTitle}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{updateDescription}</p>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isRunning}
        aria-labelledby="diagnostic-request-title"
        className="mt-5 space-y-4"
      >
        <div>
          <label htmlFor="diagnostic-url" className="text-sm font-medium text-foreground">
            {label} <span className="text-blue-600 dark:text-blue-400">*</span>
          </label>
          <input
            id="diagnostic-url"
            type="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value)
              if (error) {
                setError(null)
              }
            }}
            placeholder={placeholder}
            autoComplete="url"
            inputMode="url"
            spellCheck={false}
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'diagnostic-url-error' : 'diagnostic-url-help'}
            className="mt-1.5 h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/30 focus-visible:outline-none"
          />
          {error ? (
            <p id="diagnostic-url-error" role="alert" className="mt-1 text-xs text-destructive">
              {error}
            </p>
          ) : (
            <p id="diagnostic-url-help" className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {helpText}
            </p>
          )}
        </div>

        <Button type="submit" size="xl" className="w-full sm:w-auto" disabled={isRunning}>
          {isRunning ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
          ) : (
            <Search aria-hidden="true" className="size-4" />
          )}
          {isRunning ? submittingLabel : updateSubmitLabel}
        </Button>
      </form>

      {status === 'success' ? (
        <FormAlert tone="success" title={successTitle} description={successDescription} />
      ) : null}
    </section>
  )
}
