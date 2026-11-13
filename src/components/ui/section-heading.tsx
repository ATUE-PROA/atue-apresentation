interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header>
      {eyebrow ? (
        <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase dark:text-blue-400">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 text-display text-foreground">{title}</h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </header>
  )
}
