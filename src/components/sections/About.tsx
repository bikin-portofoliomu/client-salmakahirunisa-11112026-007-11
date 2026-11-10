import React from 'react'
import { motion, type Variants } from 'motion/react'
import { MessageCircle, Calendar, MapPin, GraduationCap } from 'lucide-react'
import type { PersonalInfo, EducationItem } from '../../types/content'
import { calculateAge, formatWhatsAppUrl } from '../../utils/format'
import './About.css'

interface AboutProps {
  personal: PersonalInfo
  education?: EducationItem[]
  showPhoto?: boolean
}

export const About: React.FC<AboutProps> = ({ personal, education, showPhoto = true }) => {
  const currentAge = calculateAge(personal.birthDate) ?? 19
  const waUrl = formatWhatsAppUrl(personal.whatsapp, personal.name)

  const formatBirthDateDisplay = (bDate: string) => {
    if (!bDate) return ''
    const parts = bDate.split(/[/ -]/)
    if (parts.length === 3) {
      const d = parts[0]
      const m = parts[1]
      const y = parts[2]
      const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
      ]
      const mIdx = parseInt(m, 10) - 1
      if (mIdx >= 0 && mIdx < 12) {
        return `${parseInt(d, 10)} ${months[mIdx]} ${y}`
      }
    }
    return bDate
  }

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

  // Prioritaskan institusi perguruan tinggi / universitas untuk kartu dossier foto profil
  const universityEdu = education?.find(
    (e) =>
      e.institution.toLowerCase().includes('universitas') ||
      e.institution.toLowerCase().includes('institut') ||
      e.degree?.toLowerCase().includes('s1') ||
      e.degree?.toLowerCase().includes('sarjana')
  )
  const topEducation =
    universityEdu?.institution ||
    education?.[education.length - 1]?.institution ||
    "Universitas 'Aisyiyah Yogyakarta"

  return (
    <section id="tentang" className="about-section swiss-section">
      <div className="swiss-container">
        <motion.div
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* HEADER SECTION RATA TENGAH MINIMALIS */}
          <motion.div className="swiss-section-header" variants={itemVariants}>
            <span className="section-meta-badge">Profil Editorial</span>
            <h2 className="section-title">Tentang Saya</h2>
            <p className="section-lead-text">{personal.role}</p>
          </motion.div>

          {/* KONTEN UTAMA: ASIMETRIS SWISS GRID (FOTO & NARASI) */}
          <div className="about-content-layout">
            {/* SISI KIRI: FOTO PROFIL EDITORIAL */}
            {showPhoto && (
              <motion.div className="about-photo-column" variants={itemVariants}>
                <div className="about-photo-frame">
                  <img
                    src={personal.avatarUrl}
                    alt={`Foto Profil ${personal.name}`}
                    className="about-avatar-img"
                    loading="lazy"
                  />
                  <div className="about-photo-badge">
                    <span className="badge-dot-accent" />
                    <span className="badge-caption">{personal.name.toUpperCase()}</span>
                  </div>
                </div>

                <div className="about-dossier-card">
                  <div className="dossier-row">
                    <span className="dossier-label">
                      <GraduationCap size={15} />
                      <span>PENDIDIKAN</span>
                    </span>
                    <span className="dossier-value">{topEducation}</span>
                  </div>
                  <div className="dossier-row">
                    <span className="dossier-label">
                      <MapPin size={15} />
                      <span>DOMISILI</span>
                    </span>
                    <span className="dossier-value">{personal.location}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SISI KANAN: DESKRIPSI BIOGRAFI & INFO DETAIL */}
            <motion.div className="about-text-column" variants={itemVariants}>
              <div className="about-bio-card">
                <h3 className="about-headline-lead">
                  {personal.quote || personal.role}
                </h3>
                <p className="about-description-text">{personal.bioSummary}</p>

                {/* INFO TANGGAL LAHIR & TOMBOL HUBUNGI WA */}
                <div className="about-action-strip">
                  <div className="about-birth-info">
                    <div className="birth-icon-box">
                      <Calendar size={18} />
                    </div>
                    <div className="birth-text-group">
                      <span className="birth-label">TANGGAL LAHIR</span>
                      <span className="birth-value">
                        {formatBirthDateDisplay(personal.birthDate)} ({currentAge} Tahun)
                      </span>
                    </div>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-swiss btn-swiss-solid about-wa-btn"
                  >
                    <MessageCircle size={18} />
                    <span>Hubungi WA ({personal.whatsapp})</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
