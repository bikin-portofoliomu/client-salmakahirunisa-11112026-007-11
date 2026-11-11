import { useState, useEffect } from 'react'
import { PortfolioRenderer } from './components/PortfolioRenderer'
import { getStoredPortfolio, getStoredConfig } from './utils/storage'
import type { PortfolioContent, TemplateConfig } from './types/content'
import './styles/swiss-theme.css'
import './styles/swiss-grid.css'

export default function App() {
  const [content] = useState<PortfolioContent>(() => getStoredPortfolio())
  const [config] = useState<TemplateConfig>(() => getStoredConfig())
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('np_theme')
    if (saved === 'light' || saved === 'dark') return saved
    return config.theme || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('np_theme', theme)
  }, [theme])

  useEffect(() => {
    document.title = 'Salma Khairunisa'
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <PortfolioRenderer
      content={content}
      config={config}
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  )
}
