import React, { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react'
import type { PersonalInfo } from '../../types/content'
import './Navbar.css'

interface NavbarProps {
  personal: PersonalInfo
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  showPhoto?: boolean
  navbarStatus?: string
  navbarCtaText?: string
}

export const Navbar: React.FC<NavbarProps> = ({
  personal,
  theme,
  onToggleTheme,
  showPhoto = true,
  navbarStatus,
  navbarCtaText,
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tutup menu mobile dengan tombol Escape (Aksesibilitas Keyboard R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Nav links bersih tanpa nomor prefix berlebih
  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Pengalaman', href: '#pengalaman' },
    { label: 'Keahlian', href: '#keahlian' },
    { label: 'Kontak', href: '#kontak' },
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={`swiss-navbar ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="swiss-container">
        <div className="navbar-grid-wrapper">
          {/* SISI KIRI: IDENTITAS BERSIH & MINIMALIS */}
          <a href="#beranda" className="navbar-brand-link" aria-label={`Beranda ${personal.name}`}>
            {showPhoto ? (
              <span className="brand-avatar-box">
                <img
                  src={personal.avatarUrl}
                  alt={personal.name}
                  className="brand-avatar-img"
                  onError={(e) => {
                    ;(e.target as HTMLElement).style.display = 'none'
                  }}
                />
              </span>
            ) : (
              <span className="brand-monogram-box">
                {personal.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase() || 'AF'}
              </span>
            )}

            <div className="brand-text-column">
              <span className="brand-title-name">{personal.name}</span>
              <span className="brand-meta-status">
                <span className="live-status-indicator" />
                <span className="brand-status-label">{navbarStatus || personal.role}</span>
              </span>
            </div>
          </a>

          {/* SISI TENGAH: Menu Navigasi Bersih & Simple (Tanpa Angka Berlebih) */}
          <nav className="navbar-nav-menu" aria-label="Navigasi Utama">
            <ul className="nav-items-row">
              {navLinks.map((item) => (
                <li key={item.label} className="nav-list-cell">
                  <a href={item.href} className="nav-action-link">
                    <span className="nav-text-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* SISI KANAN: Theme Toggle + CTA Minimalis + Mobile Toggle */}
          <div className="navbar-control-cluster">
            <button
              type="button"
              className="theme-switch-btn"
              onClick={onToggleTheme}
              aria-label={`Ganti ke mode ${theme === 'light' ? 'gelap' : 'terang'}`}
              title={`Ganti ke mode ${theme === 'light' ? 'gelap' : 'terang'}`}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            <a href="#kontak" className="navbar-quick-cta">
              <span>{navbarCtaText || 'Hubungi'}</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* DRAWER RESPONSIVE UNTUK MOBILE & TABLET */}
      <div
        className={`mobile-nav-panel ${mobileMenuOpen ? 'panel-visible' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="swiss-container mobile-panel-body">
          <div className="mobile-status-strip">
            <span className="live-status-indicator" />
            <span className="strip-text-info">{personal.statusText || 'Tersedia untuk Komunikasi Korporat'}</span>
          </div>

          <ul className="mobile-links-stack">
            {navLinks.map((item) => (
              <li key={item.label} className="mobile-link-entry">
                <a href={item.href} className="mobile-drawer-anchor" onClick={handleLinkClick}>
                  <span className="drawer-item-title">{item.label}</span>
                  <ArrowUpRight size={16} className="drawer-arrow" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-panel-actions">
            <a
              href={`https://wa.me/62${personal.whatsapp.replace(/^0/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-full-cta"
              onClick={handleLinkClick}
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
