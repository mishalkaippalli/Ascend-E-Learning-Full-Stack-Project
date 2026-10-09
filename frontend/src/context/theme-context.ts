
import { createContext } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: ThemePreference
  setTheme: (theme: ThemePreference) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)
