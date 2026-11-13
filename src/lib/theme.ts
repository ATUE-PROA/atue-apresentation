export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'atue-theme'

export function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  document.documentElement.classList.toggle('dark', next === 'dark')

  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute('content', next === 'dark' ? '#0A0A0A' : '#FFFFFF')

  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // shortcut: sem localStorage a escolha vale só nesta sessão
  }

  return next
}
