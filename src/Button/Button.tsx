import type { ReactElement, ReactNode } from 'react'

export function Button ({ children }: { children: ReactNode }): ReactElement {
  return (
    <button>{children}</button>
  )
}
