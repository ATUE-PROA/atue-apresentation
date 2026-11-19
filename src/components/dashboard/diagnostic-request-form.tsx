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
  const { label, placeholder, helpText, updateSubmitLabel, submittingLabel, successTitle, successDescription } =
    DIAGNOSTICS_CONTENT.request

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
      className="mt-5 scroll-mt-24"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isRunning}
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="sm:max-w-sm sm:flex-1">
          <label
            id="diagnostic-request-title"
            htmlFor="diagnostic-url"
            className="text-label block text-muted-foreground"
          >
            {label}
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
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'diagnostic-url-error' : 'diagnostic-url-help'}
            className="mt-1.5 h-11 w-full rounded-[16px] border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/30 focus-visible:outline-none"
          />
        </div>

        <Button type="submit" size="xl" className="shrink-0" disabled={isRunning}>
          {isRunning ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
          ) : (
            <Search aria-hidden="true" className="size-4" />
          )}
          {isRunning ? submittingLabel : updateSubmitLabel}
        </Button>
      </form>

      {error ? (
        <p id="diagnostic-url-error" role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <p id="diagnostic-url-help" className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {helpText}
        </p>
      )}

      {status === 'success' ? (
        <div className="mt-3">
          <FormAlert tone="success" title={successTitle} description={successDescription} />
        </div>
      ) : null}
    </section>
  )
}
