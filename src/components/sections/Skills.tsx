import React from 'react'
import { motion, type Variants } from 'motion/react'
import { Wrench, Sparkles } from 'lucide-react'
import type { SkillGroup } from '../../types/content'
import './Skills.css'

interface SkillsProps {
  skills: SkillGroup[]
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const sortedSkills = [...skills].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section id="keahlian" className="skills-section swiss-section">
      <div className="swiss-container">
        <motion.div
          className="skills-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* HEADER SECTION RATA TENGAH MINIMALIS */}
          <div className="swiss-section-header">
            <span className="section-meta-badge">Kompetensi Teknis</span>
            <h2 className="section-title">Keahlian Dikuasai</h2>
            <p className="section-lead-text">
              Instrumen komunikasi, analitik audiens, dan teknologi kolaborasi pendukung efektivitas kerja.
            </p>
          </div>

          {/* GRID MODULAR KEAHLIAN & TOOLS (SWISS 3-KOLOM) */}
          <div className="skills-grid-modular">
            {sortedSkills.map((skill, index) => (
              <motion.article
                key={skill.id}
                className="skill-card-item"
                variants={cardVariants}
                tabIndex={0}
                aria-label={`Keahlian ${skill.category}: ${skill.description}`}
              >
                {/* Indikator Sudut Kinetik */}
                <div className="skill-corner-accent" aria-hidden="true" />

                {/* Header Kartu: Indeks & Badge */}
                <div className="skill-card-top">
                  <span className="skill-idx-badge">0{index + 1}</span>
                  <div className="skill-sparkle-pill">
                    <Sparkles size={12} className="sparkle-icon" />
                    <span>SPESIALISASI</span>
                  </div>
                </div>

                {/* Judul Jenis Keahlian */}
                <div className="skill-title-block">
                  <h3 className="skill-category-title">{skill.category}</h3>
                </div>

                {/* Deskripsi Keahlian */}
                <p className="skill-description-text">{skill.description}</p>

                {/* Sub-blok: Deskripsi/Tools */}
                <div className="skill-tools-block">
                  <div className="tools-label-row">
                    <Wrench size={13} className="tools-icon" />
                    <span className="tools-header-text">DESKRIPSI / TOOLS:</span>
                  </div>

                  <div className="tools-pills-wrap">
                    {skill.tools.map((tool: string, toolIdx: number) => (
                      <span key={toolIdx} className="tool-tag-pill">
                        {tool}
                      </span>
                    ))}
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
