import React from 'react'
import { motion, type Variants } from 'motion/react'
import { Globe, CheckCircle2, MessageSquareQuote } from 'lucide-react'
import type { LanguageItem } from '../../types/content'
import './Languages.css'

interface LanguagesProps {
  languages: LanguageItem[]
}

export const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const sortedLanguages = [...languages].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // Kualifikasi deskriptif tanpa persentase artifisial
  const getProficiencyBadge = (prof: string): string => {
    const lower = prof.toLowerCase()
    if (lower.includes('fasih') || lower.includes('asli')) return 'Penutur Asli'
    if (lower.includes('profesional') || lower.includes('mahir')) return 'Tingkat Mahir'
    if (lower.includes('aktif') || lower.includes('menengah')) return 'Tingkat Menengah'
    if (lower.includes('dasar') || lower.includes('elementer')) return 'Tingkat Dasar'
    return 'Kemahiran Aktif'
  }

  const getLanguageContext = (lang: string): string => {
    switch (lang.toLowerCase()) {
      case 'indonesia':
        return 'Komunikasi korporat formal, penulisan siaran pers, dan hubungan media nasional.'
      case 'jepang':
        return 'Penerjemahan dokumen bisnis, takarir konten multimedia, dan interpretasi percakapan lintas budaya.'
      case 'inggris':
        return 'Presentasi eksekutif, korespondensi internasional, dan analisis materi berbahasa Inggris.'
      case 'jawa':
        return 'Interaksi kultural, diplomasi komunitas lokal, dan percakapan interpersonal.'
      case 'prancis':
        return 'Pengucapan tematik, kosakata dasar percakapan, dan apresiasi linguistik kreatif.'
      default:
        return 'Komunikasi verbal dan tertulis dalam forum profesional.'
    }
  }

  return (
    <section id="bahasa" className="languages-section swiss-section">
      <div className="swiss-container">
        <motion.div
          className="languages-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* HEADER SECTION RATA TENGAH MINIMALIS */}
          <div className="swiss-section-header">
            <span className="section-meta-badge">Linguistik & Komunikasi</span>
            <h2 className="section-title">Kemampuan Bahasa</h2>
            <p className="section-lead-text">
              Kemahiran komunikasi verbal dan tertulis dalam konteks profesional, hubungan media, dan diplomasi komunitas.
            </p>
          </div>

          {/* GRID 3-KOLOM BERSIH TANPA PERSENTASE */}
          <div className="languages-grid-clean">
            {sortedLanguages.map((item) => {
              const badgeLabel = getProficiencyBadge(item.proficiency)
              const contextDesc = getLanguageContext(item.language)

              return (
                <motion.article
                  key={item.id}
                  className="language-card-clean"
                  variants={cardVariants}
                  tabIndex={0}
                  aria-label={`Bahasa ${item.language}, tingkat kemahiran: ${item.proficiency}`}
                >
                  <div className="lang-card-header">
                    <div className="lang-icon-box">
                      <Globe size={18} />
                    </div>
                    <span className="lang-badge-tag">{badgeLabel}</span>
                  </div>

                  <div className="lang-card-body">
                    <h3 className="lang-name-display">{item.language}</h3>
                    <p className="lang-proficiency-label">{item.proficiency}</p>
                    <p className="lang-context-description">{contextDesc}</p>
                  </div>

                  <div className="lang-card-footer">
                    <CheckCircle2 size={14} className="lang-check-icon" />
                    <span className="lang-verified-text">Aktif Digunakan dalam Kerja</span>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* CATATAN EDITORIAL LINGUISTIK */}
          <div className="languages-editorial-note">
            <MessageSquareQuote size={18} className="lang-note-icon" />
            <p className="lang-note-copy">
              Kemampuan multibahasa ini mendukung negosiasi lintas budaya, pengelolaan krisis reputasi dengan sensitivitas bahasa daerah, serta penyusunan pesan strategis berstandar internasional.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
