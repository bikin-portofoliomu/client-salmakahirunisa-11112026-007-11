import React from 'react'
import { motion, type Variants } from 'motion/react'
import { Briefcase, Building2, CheckCircle2 } from 'lucide-react'
import type { ExperienceItem } from '../../types/content'
import './Experience.css'

interface ExperienceProps {
  items: ExperienceItem[]
}

export const Experience: React.FC<ExperienceProps> = ({ items }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  // Urutan kronologis terbaru di atas
  const sortedItems = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section id="pengalaman" className="experience-section swiss-section">
      <div className="swiss-container">
        <motion.div
          className="experience-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* HEADER SECTION RATA TENGAH MINIMALIS */}
          <div className="swiss-section-header">
            <span className="section-meta-badge">Rekam Jejak Karir</span>
            <h2 className="section-title">Pengalaman Profesional</h2>
            <p className="section-lead-text">
              Riwayat pengalaman di bidang content creation, in-frame talent, modeling komersial, dan operasional ritel.
            </p>
          </div>

          {/* TIMELINE KINETIK PENGALAMAN PROFESIONAL */}
          <div className="experience-timeline">
            {sortedItems.map((item, index) => (
              <motion.article
                key={item.id}
                className="experience-item-card"
                variants={itemVariants}
                tabIndex={0}
                aria-label={`${item.role} di ${item.company}, periode ${item.period}`}
              >
                {/* Garis Aksen Vertikal Kiri */}
                <div className="experience-accent-line" aria-hidden="true" />

                {/* Kolom Periode & Instansi */}
                <div className="experience-meta-col">
                  <div className="experience-idx-wrap">
                    <span className="experience-idx-label">0{index + 1}</span>
                    <span className="experience-slash">/</span>
                  </div>

                  <div className="experience-period-badge">
                    <Briefcase size={14} className="period-icon-accent" />
                    <span className="period-year-text">{item.period}</span>
                  </div>

                  <div className="experience-company-wrap">
                    <Building2 size={15} className="company-icon-accent" />
                    <span className="company-title">{item.company}</span>
                  </div>
                </div>

                {/* Kolom Konten: Jabatan, Deskripsi, & Pencapaian */}
                <div className="experience-content-col">
                  <div className="experience-role-header">
                    <h3 className="experience-role-title">{item.role}</h3>
                  </div>

                  {/* DESKRIPSI UTAMA PEKERJAAN */}
                  <p className="experience-description-text">{item.description}</p>

                  {/* DAFTAR HIGHLIGHT / PENCAPAIAN RIIL */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="experience-achievements-list">
                      <div className="achievements-heading-label">HIGHLIGHT KINERJA:</div>
                      <ul className="achievements-ul">
                        {item.achievements.map((ach, achIdx) => (
                          <li key={achIdx} className="achievement-li">
                            <CheckCircle2 size={15} className="achievement-check-icon" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
