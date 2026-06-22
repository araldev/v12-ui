import { useEffect, useState } from 'react'

const validThemes = ['dark', 'light', 'transparent'] as const
type ValidThemes = typeof validThemes[number]

export function useDataTheme (themeParam?: ValidThemes): { theme: ValidThemes } {
  const [theme, setTheme] = useState<ValidThemes>(() => {
    if (themeParam) return themeParam

    if (typeof window === 'undefined') return 'dark'

    const rootTheme = document.documentElement.getAttribute('data-theme') as ValidThemes | null

    if (rootTheme && validThemes.includes(rootTheme)) return rootTheme

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    if (themeParam) setTheme(themeParam)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const eventHandler = (e: MediaQueryListEvent): void => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', eventHandler)

    return () => {
      mediaQuery.removeEventListener('change', eventHandler)
    }
  }, [themeParam])

  useEffect(() => {
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (
          mutation.type !== 'attributes' || mutation.attributeName !== 'data-theme'
        ) return

        const rootTheme = document.documentElement.getAttribute('data-theme') as ValidThemes | null

        if (rootTheme && validThemes.includes(rootTheme)) setTheme(rootTheme)
      }
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  return { theme }
}
