import { useRef, useState, type ChangeEvent } from 'react'

import {
  DOCUMENTS_CONTENT,
  EXAMPLE_DOCUMENTS,
  type ExampleDocument,
} from '../../content/documents'
import { Button } from '../ui/button'
import { FormAlert } from '../ui/form-alert'
import {
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Info,
  Loader2,
  Paperclip,
  Sparkles,
} from '../ui/icons'

type DocumentsTab = 'analyze' | 'downloads'
type AnalysisStatus = 'idle' | 'running' | 'success'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt']

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  return `${Math.round(bytes / 1024)} KB`
}

function hasAcceptedExtension(name: string): boolean {
  const lower = name.toLowerCase()
  return ACCEPTED_EXTENSIONS.some((extension) => lower.endsWith(extension))
}

interface DocumentsScreenProps {
  onAnalyzed: (seed: string) => void
}

export function DocumentsScreen({ onAnalyzed }: DocumentsScreenProps) {
  const [tab, setTab] = useState<DocumentsTab>('analyze')
  const [selectedExampleId, setSelectedExampleId] = useState<string | null>(null)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle')
  const [showFullSendNote, setShowFullSendNote] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectedExample = EXAMPLE_DOCUMENTS.find((doc) => doc.id === selectedExampleId)

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    if (!hasAcceptedExtension(file.name)) {
      setFileError('Anexe um arquivo PDF, DOC, DOCX ou TXT.')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('O arquivo precisa ter até 10 MB.')
      return
    }

    setFileError(null)
    setAttachedFile(file)
    setSelectedExampleId(null)
    setAnalysisStatus('idle')
  }

  const handleSelectExample = (document: ExampleDocument) => {
    setSelectedExampleId(document.id)
    setAttachedFile(null)
    setFileError(null)
    setAnalysisStatus('idle')
  }

  const canAnalyze = Boolean(attachedFile || selectedExample) && analysisStatus !== 'running'

  const handleSimulate = () => {
    if (!canAnalyze) {
      return
    }

    const seed = attachedFile
      ? `${attachedFile.name}:${attachedFile.size}`
      : selectedExample
        ? `${selectedExample.id}:${selectedExample.title}`
        : ''

    setAnalysisStatus('running')
    window.setTimeout(() => {
      setAnalysisStatus('success')
      onAnalyzed(seed)
    }, 1400)
  }

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase dark:text-blue-400">
        {DOCUMENTS_CONTENT.page.eyebrow}
      </p>
      <h1 className="mt-3 text-display text-foreground">{DOCUMENTS_CONTENT.page.title}</h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
        {DOCUMENTS_CONTENT.page.description}
      </p>

      <div
        role="tablist"
        aria-label="Áreas da Central de Documentos"
        className="mt-8 inline-flex rounded-lg border border-border bg-muted p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'analyze'}
          aria-controls="documents-analyze-panel"
          id="documents-analyze-tab"
          onClick={() => setTab('analyze')}
          className={`inline-flex h-auto min-h-9 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            tab === 'analyze'
              ? 'border border-border bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {DOCUMENTS_CONTENT.tabs.analyze}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'downloads'}
          aria-controls="documents-downloads-panel"
          id="documents-downloads-tab"
          onClick={() => setTab('downloads')}
          className={`inline-flex h-auto min-h-9 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            tab === 'downloads'
              ? 'border border-border bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {DOCUMENTS_CONTENT.tabs.downloads}
        </button>
      </div>

      {tab === 'analyze' ? (
        <div
          id="documents-analyze-panel"
          role="tabpanel"
          aria-labelledby="documents-analyze-tab"
          className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        >
          <section className="rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {DOCUMENTS_CONTENT.analyze.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {DOCUMENTS_CONTENT.analyze.description}
            </p>

            <div className="mt-5 rounded-lg border border-dashed border-border p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <FileText aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {attachedFile ? attachedFile.name : DOCUMENTS_CONTENT.analyze.emptyFileTitle}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {attachedFile
                        ? `${formatFileSize(attachedFile.size)} · arquivo local`
                        : DOCUMENTS_CONTENT.analyze.emptyFileDescription}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {attachedFile ? (
                    <button
                      type="button"
                      onClick={() => {
                        setAttachedFile(null)
                        setAnalysisStatus('idle')
                      }}
                      className="inline-flex h-9 items-center rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      Remover
                    </button>
                  ) : null}
                  <Button
                    type="button"
                    size="md"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip aria-hidden="true" className="size-4" />
                    {DOCUMENTS_CONTENT.analyze.attach}
                  </Button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFile}
                className="sr-only"
                aria-label="Anexar documento para análise"
              />

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {DOCUMENTS_CONTENT.analyze.fileHint}
              </p>
            </div>

            {fileError ? (
              <p role="alert" className="mt-2 text-xs text-destructive">
                {fileError}
              </p>
            ) : null}

            <div className="mt-5">
              <h3 className="text-sm font-medium text-foreground">
                {DOCUMENTS_CONTENT.analyze.exampleTitle}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {DOCUMENTS_CONTENT.analyze.exampleDescription}
              </p>
            </div>

            <div className="mt-4">
              <label htmlFor="example-document" className="text-sm font-medium text-foreground">
                {DOCUMENTS_CONTENT.analyze.exampleLabel}
              </label>
              <div className="relative mt-1.5">
                <select
                  id="example-document"
                  value={selectedExampleId ?? ''}
                  onChange={(event) => {
                    const value = event.target.value

                    if (!value) {
                      setSelectedExampleId(null)
                      setAnalysisStatus('idle')
                      return
                    }

                    const document = EXAMPLE_DOCUMENTS.find((item) => item.id === value)
                    if (document) {
                      handleSelectExample(document)
                    }
                  }}
                  disabled={Boolean(attachedFile)}
                  className="h-11 w-full appearance-none rounded-lg border border-input bg-transparent px-3 pr-9 text-sm text-foreground focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">{DOCUMENTS_CONTENT.analyze.exampleEmpty}</option>
                  {EXAMPLE_DOCUMENTS.map((document) => (
                    <option key={document.id} value={document.id}>
                      {document.title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
                />
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {DOCUMENTS_CONTENT.analyze.exampleHint}
              </p>
            </div>

            <Button
              type="button"
              size="xl"
              onClick={handleSimulate}
              disabled={!canAnalyze}
              className="mt-5 w-full"
            >
              {analysisStatus === 'running' ? (
                <Loader2
                  aria-hidden="true"
                  className="size-4 animate-spin motion-reduce:animate-none"
                />
              ) : (
                <Sparkles aria-hidden="true" className="size-4" />
              )}
              {analysisStatus === 'running'
                ? DOCUMENTS_CONTENT.analyze.analyzing
                : DOCUMENTS_CONTENT.analyze.analyze}
            </Button>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {DOCUMENTS_CONTENT.analyze.analyzeDisabledHint}
            </p>

            {analysisStatus === 'success' ? (
              <FormAlert
                tone="success"
                title={DOCUMENTS_CONTENT.analyze.analysisSuccessTitle}
                description={DOCUMENTS_CONTENT.analyze.analysisSuccessDescription}
              />
            ) : null}

            <div className="mt-5 rounded-lg border border-blue-600/30 bg-blue-600/10 p-4">
              <div className="flex gap-2">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-blue-700 dark:text-blue-300"
                />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {DOCUMENTS_CONTENT.analyze.infoTitle}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-blue-800/80 dark:text-blue-200/80">
                    {DOCUMENTS_CONTENT.analyze.infoDescription}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {DOCUMENTS_CONTENT.analyze.fileStays}
            </p>

            <button
              type="button"
              onClick={() => setShowFullSendNote((current) => !current)}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {DOCUMENTS_CONTENT.analyze.fullSend}
              <ExternalLink aria-hidden="true" className="size-4" />
            </button>
            {showFullSendNote ? (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {DOCUMENTS_CONTENT.analyze.fullSendNote}
              </p>
            ) : null}
          </section>

          <section className="rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {DOCUMENTS_CONTENT.examples.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {DOCUMENTS_CONTENT.examples.description}
            </p>

            <ul className="mt-4 space-y-2">
              {EXAMPLE_DOCUMENTS.map((document) => {
                const isSelected = selectedExampleId === document.id

                return (
                  <li key={document.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectExample(document)}
                      aria-pressed={isSelected}
                      className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        isSelected
                          ? 'border-primary/40 bg-primary/5'
                          : 'border-border bg-background hover:bg-muted/50'
                      }`}
                    >
                      <FileText
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">
                          {document.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {document.type} · {document.size} · {document.updatedAt}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {DOCUMENTS_CONTENT.examples.hint}
            </p>
          </section>
        </div>
      ) : (
        <div
          id="documents-downloads-panel"
          role="tabpanel"
          aria-labelledby="documents-downloads-tab"
          className="mt-6"
        >
          <section className="rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {DOCUMENTS_CONTENT.downloads.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {DOCUMENTS_CONTENT.downloads.description}
            </p>

            <div className="mt-5 flex flex-col gap-4 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <FileText
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-primary dark:text-blue-400"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {DOCUMENTS_CONTENT.downloads.reportTitle}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {DOCUMENTS_CONTENT.downloads.reportDescription}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {DOCUMENTS_CONTENT.downloads.reportMeta}
                  </p>
                </div>
              </div>

              <a
                href="/atue-compliance-report.pdf"
                download
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:w-auto"
              >
                <Download aria-hidden="true" className="size-4" />
                {DOCUMENTS_CONTENT.downloads.download}
              </a>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {DOCUMENTS_CONTENT.downloads.note}
            </p>
          </section>
        </div>
      )}
    </div>
  )
}
