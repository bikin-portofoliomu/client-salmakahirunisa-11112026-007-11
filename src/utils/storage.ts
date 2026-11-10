/**
 * Utilitas Penyimpanan Lokal & Sinkronisasi Portofolio
 * Sesuai pola referensi template-portofolio10 & template-portofolio9.
 */

import type { PortfolioContent, TemplateConfig } from '../types/content'
import { defaultPortfolioData, defaultTemplateConfig } from '../data/default-portfolio'

export const PORTFOLIO_STORAGE_KEY = 'bikin_portofoliomu_np11_data'
export const CONFIG_STORAGE_KEY = 'bikin_portofoliomu_np11_config'

/**
 * Membaca data portofolio dari localStorage dengan fallback ke data default.
 */
export function getStoredPortfolio(): PortfolioContent {
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.personal?.name === defaultPortfolioData.personal.name) {
        return {
          ...defaultPortfolioData,
          ...parsed,
          personal: { ...defaultPortfolioData.personal, ...(parsed.personal || {}) },
          metrics: { ...defaultPortfolioData.metrics, ...(parsed.metrics || {}) },
          contact: { ...defaultPortfolioData.contact, ...(parsed.contact || {}) },
        }
      } else {
        localStorage.removeItem(PORTFOLIO_STORAGE_KEY)
      }
    }
  } catch (err) {
    console.warn('Gagal membaca data portofolio dari localStorage, menggunakan default:', err)
  }
  return defaultPortfolioData
}

/**
 * Menyimpan data portofolio ke localStorage.
 */
export function saveStoredPortfolio(data: PortfolioContent): void {
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data))
  } catch (err) {
    console.error('Gagal menyimpan data portofolio ke localStorage:', err)
  }
}

/**
 * Membaca konfigurasi template dari localStorage dengan fallback ke config default.
 */
export function getStoredConfig(): TemplateConfig {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { ...defaultTemplateConfig, ...parsed }
    }
  } catch (err) {
    console.warn('Gagal membaca config dari localStorage, menggunakan default:', err)
  }
  return defaultTemplateConfig
}

/**
 * Menyimpan konfigurasi template ke localStorage.
 */
export function saveStoredConfig(config: TemplateConfig): void {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config))
  } catch (err) {
    console.error('Gagal menyimpan config ke localStorage:', err)
  }
}

/**
 * Reset data kembali ke data bawaan (Ahmad Furguso).
 */
export function resetPortfolioToDefault(): {
  content: PortfolioContent
  config: TemplateConfig
} {
  try {
    localStorage.removeItem(PORTFOLIO_STORAGE_KEY)
    localStorage.removeItem(CONFIG_STORAGE_KEY)
  } catch (err) {
    console.error('Gagal mereset localStorage:', err)
  }
  return {
    content: defaultPortfolioData,
    config: defaultTemplateConfig,
  }
}

/**
 * Mengunduh data portofolio sebagai berkas JSON cadangan.
 */
export function exportPortfolioJSON(content: PortfolioContent, config: TemplateConfig): void {
  const exportPayload = {
    template: 'template-portofolio11',
    edition: 'Neue Grid Vanguard',
    exportedAt: new Date().toISOString(),
    content,
    config,
  }
  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const safeName = (content.personal.name || 'portofolio').toLowerCase().replace(/\s+/g, '-')
  a.href = url
  a.download = `portofolio-${safeName}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
