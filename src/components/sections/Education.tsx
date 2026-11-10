import React from 'react'
import { motion, type Variants } from 'motion/react'
import { GraduationCap, Award } from 'lucide-react'
import type { EducationItem } from '../../types/content'
import './Education.css'

interface EducationProps {
  items: EducationItem[]
}

export const Education: React.FC<EducationProps> = ({ items }) => {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  // Urutan kronologis terbaru di atas (reverse chronological order)
  const sortedItems = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section id="pendidikan" className="education-section swiss-section">
      <div className="swiss-container">
        <motion.div
          className="education-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* HEADER SECTION RATA TENGAH MINIMALIS */}
          <div className="swiss-section-header">
            <span className="section-meta-badge">Riwayat Akademik</span>
            <h2 className="section-title">Pendidikan</h2>
            <p className="section-lead-text">
              Jejak pendidikan formal dan riwayat jenjang akademik.
            </p>
          </div>

          {/* DAFTAR DOSSIER PENDIDIKAN (TAHUN * INSTANSI * JURUSAN) */}
          <div className="education-list-dossier">
            {sortedItems.map((item, index) => (
              <motion.article
                key={item.id}
                className="education-card"
                variants={itemVariants}
                tabIndex={0}
                aria-label={`${item.period}, ${item.institution}, ${item.major || item.degree || 'Pendidikan'}`}
              >
                {/* Indikator Garis Kinetik Kiri */}
                <div className="education-accent-bar" aria-hidden="true" />

                <div className="education-card-inner">
                  {/* KOLOM 1: NOMOR INDEKS & PERIODE / TAHUN */}
                  <div className="education-col-period">
                    <span className="education-index-num">0{index + 1}</span>
                    <div className="education-period-badge">
                      <span className="period-text">{item.period}</span>
                    </div>
                  </div>

                  {/* SEPARATOR KINETIK ASTERISK */}
                  <div className="education-formula-sep" aria-hidden="true">
                    *
                  </div>

                  {/* KOLOM 2: INSTANSI PENDIDIKAN */}
                  <div className="education-col-institution">
                    <div className="institution-header-line">
                      <GraduationCap size={18} className="institution-icon" />
                      <h3 className="institution-name">{item.institution}</h3>
                    </div>

                    {item.degree && (
                      <p className="institution-degree-subtext">
                        <Award size={14} className="degree-icon" />
                        <span>{item.degree}</span>
                      </p>
                    )}
                  </div>

                  {/* SEPARATOR KINETIK ASTERISK */}
                  <div className="education-formula-sep" aria-hidden="true">
                    *
                  </div>

                  {/* KOLOM 3: JURUSAN / KONSENTRASI */}
                  <div className="education-col-major">
                    {item.major ? (
                      <div className="education-major-pill">
                        <span className="major-label">{item.major}</span>
                      </div>
                    ) : (
                      <div className="education-major-placeholder">
                        <span className="major-regular-label">Pendidikan Umum</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
