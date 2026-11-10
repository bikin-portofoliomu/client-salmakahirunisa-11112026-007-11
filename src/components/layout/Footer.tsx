import React from 'react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import type { PersonalInfo, ContactInfo } from '../../types/content'
import './Footer.css'

interface FooterProps {
  personal: PersonalInfo
  contact: ContactInfo
  copyright?: string
  summary?: string
}

const LinkedInIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 15,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 15,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const TikTokIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 15,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

export const Footer: React.FC<FooterProps> = ({
  personal,
  contact,
  copyright,
  summary,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Pendidikan', href: '#pendidikan' },
    { label: 'Pengalaman', href: '#pengalaman' },
    { label: 'Keahlian', href: '#keahlian' },
    { label: 'Sertifikat', href: '#sertifikat' },
    { label: 'Kontak', href: '#kontak' },
  ]

  const defaultCopyright = copyright || `© 2026 ${personal.name}. Seluruh Hak Cipta Dilindungi.`

  return (
    <footer className="editorial-footer" role="contentinfo">
      <div className="swiss-container">
        {/* GRID UTAMA FOOTER (3 PANE BERIMBANG) */}
        <div className="footer-main-grid">
          {/* PANE 1: IDENTITAS & PROFIL */}
          <div className="footer-pane-brand">
            <h3 className="footer-brand-title">{personal.name}</h3>
            <p className="footer-brand-role">{personal.role}</p>
            <p className="footer-brand-location">{personal.location}</p>
            <p className="footer-brand-summary">
              {summary || 'Fokus pada strategi komunikasi korporat, manajemen reputasi krisis, dan pengembangan kampanye digital berbasis riset data.'}
            </p>
          </div>

          {/* PANE 2: NAVIGASI TATA LETAK */}
          <div className="footer-pane-nav">
            <h4 className="footer-section-heading">Navigasi Halaman</h4>
            <nav className="footer-links-grid" aria-label="Navigasi Halaman">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href} className="footer-nav-anchor">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* PANE 3: KANAL MEDIA SOSIAL & KONEKSI */}
          <div className="footer-pane-connect">
            <h4 className="footer-section-heading">Jejaring Sosial</h4>
            <div className="footer-social-chips-wrap">
              {contact.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-chip-btn"
                  aria-label={`Buka media sosial ${s.label}`}
                >
                  {s.platform === 'linkedin' && <LinkedInIcon size={14} />}
                  {s.platform === 'instagram' && <InstagramIcon size={14} />}
                  {s.platform === 'tiktok' && <TikTokIcon size={14} />}
                  <span>{s.label}</span>
                  <ArrowUpRight size={13} className="chip-arrow-icon" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* GARIS PEMBATAS TIPIS */}
        <div className="footer-horizontal-divider" />

        {/* BOTTOM BAR: COPYRIGHT & ATRIBUSI */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright-note">
            {defaultCopyright}
            <span className="footer-atribusi-bikin">
              {' '}• Dikembangkan oleh <strong>bikin.portofoliomu</strong>
            </span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-scroll-top-btn"
            aria-label="Kembali ke atas halaman"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
