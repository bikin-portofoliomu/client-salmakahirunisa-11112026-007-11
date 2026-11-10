import React from 'react'
import { motion, type Variants } from 'motion/react'
import { ArrowDownRight, MessageSquare, Award, Calendar, Sparkles, ExternalLink } from 'lucide-react'
import type { PersonalInfo, MetricHighlights } from '../../types/content'
import { calculateAge, formatWhatsAppUrl } from '../../utils/format'
import './Hero.css'

interface HeroProps {
  personal: PersonalInfo
  metrics: MetricHighlights
  certificatesCount?: number
  skillsCount?: number
  primaryCtaText?: string
  secondaryCtaText?: string
  instagramUrl?: string
  instagramHandle?: string
}

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
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

export const Hero: React.FC<HeroProps> = ({
  personal,
  metrics,
  certificatesCount,
  skillsCount,
  primaryCtaText,
  secondaryCtaText,
  instagramUrl,
  instagramHandle,
}) => {
  // Hitung umur dinamis dari tanggal lahir (DD/MM/YYYY atau YYYY-MM-DD)
  const currentAge = calculateAge(metrics.birthDateForAge || personal.birthDate) ?? 19

  // Total sertifikat dari props atau metrics
  const totalCert = certificatesCount ?? metrics.totalCertificates ?? 6

  // Total keahlian dari props atau metrics
  const totalSkills = skillsCount ?? metrics.totalSkillsCount ?? 18

  // Followers Instagram dari metrics
  const rawIgFollowers = metrics.instagramFollowers || '1.2K+'
  const igFollowers = rawIgFollowers.replace(/\+$/, '')

  const waConsultUrl = formatWhatsAppUrl(personal.whatsapp, personal.name)

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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="beranda" className="hero-section swiss-section">
      <div className="swiss-container">
        <motion.div
          className="hero-wrapper hero-center-layout"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* PP (FOTO PROFIL) - URUTAN KANONIKAL AWAL */}
          <motion.div className="hero-avatar-block" variants={itemVariants}>
            <div className="hero-avatar-frame">
              <img
                src={personal.avatarUrl}
                alt={`Foto Profil ${personal.name}`}
                className="hero-avatar-img"
                loading="eager"
              />
              <span className="hero-avatar-status-dot" title="Tersedia untuk proyek" />
            </div>
          </motion.div>

          {/* BARIS 1: SALAM MINIMALIS RATA TENGAH */}
          <motion.div className="hero-intro-row hero-row-center" variants={itemVariants}>
            <span className="hero-greeting-pill">Halo, Saya</span>
            <span className="hero-status-tag">
              {personal.statusText || 'Tersedia untuk Komunikasi Korporat'}
            </span>
          </motion.div>

          {/* BARIS 2: NAMA PENGGUNA BERSIH & BESAR RATA TENGAH */}
          <motion.div className="hero-headline-block" variants={itemVariants}>
            <h1 className="hero-name-display">{personal.name}</h1>
          </motion.div>

          {/* BARIS 3: PEKERJAAN • LOKASI RATA TENGAH */}
          <motion.div className="hero-subline-row hero-row-center" variants={itemVariants}>
            <span className="subline-role">{personal.role}</span>
            <span className="subline-dot" aria-hidden="true">•</span>
            <span className="subline-location">{personal.location}</span>
          </motion.div>

          {/* BARIS 4: QUOTES EDITORIAL ELEGAN RATA TENGAH */}
          <motion.div className="hero-quote-box hero-quote-center" variants={itemVariants}>
            <blockquote className="hero-quote-text">
              “{personal.quote}”
            </blockquote>
          </motion.div>

          {/* BARIS 5: ACTION CTAS RATA TENGAH */}
          <motion.div className="hero-cta-group hero-cta-center" variants={itemVariants}>
            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-swiss btn-swiss-solid"
            >
              <span>{primaryCtaText || 'Hubungi Saya'}</span>
              <MessageSquare size={16} />
            </a>
            <a href="#galeri" className="btn-swiss btn-swiss-outline">
              <span>{secondaryCtaText || 'Lihat Galeri'}</span>
              <ArrowDownRight size={16} />
            </a>
          </motion.div>

          {/* BARIS 6: KELOMPOK 3 METRIK UTAMA (TOTAL SERTIFIKAT, UMUR SAAT INI, KEAHLIAN DIKUASAI) */}
          <motion.div className="hero-core-metrics-grid" variants={itemVariants}>
            {/* METRIK 1: TOTAL SERTIFIKAT */}
            <div className="metric-clean-card">
              <div className="metric-card-header">
                <Award size={18} className="metric-card-icon" />
                <span className="metric-card-label">Total Sertifikat</span>
              </div>
              <div className="metric-card-value">
                <span className="metric-number-big">{totalCert}</span>
                <span className="metric-symbol-accent">+</span>
              </div>
              <p className="metric-card-caption">Kredensial & lisensi resmi</p>
            </div>

            {/* METRIK 2: UMUR SAAT INI */}
            <div className="metric-clean-card">
              <div className="metric-card-header">
                <Calendar size={18} className="metric-card-icon" />
                <span className="metric-card-label">Umur Saat Ini</span>
              </div>
              <div className="metric-card-value">
                <span className="metric-number-big">{currentAge}</span>
                <span className="metric-unit-text">Thn</span>
              </div>
              <p className="metric-card-caption">Tahun produktif & aktif</p>
            </div>

            {/* METRIK 3: KEAHLIAN DIKUASAI */}
            <div className="metric-clean-card">
              <div className="metric-card-header">
                <Sparkles size={18} className="metric-card-icon" />
                <span className="metric-card-label">Keahlian Dikuasai</span>
              </div>
              <div className="metric-card-value">
                <span className="metric-number-big">{totalSkills}</span>
                <span className="metric-symbol-accent">+</span>
              </div>
              <p className="metric-card-caption">Keahlian & kompetensi terverifikasi</p>
            </div>
          </motion.div>

          {/* BARIS 7: KARTU MANDIRI FOLLOWERS INSTAGRAM */}
          <motion.div className="hero-instagram-card-wrapper" variants={itemVariants}>
            <a
              href={instagramUrl || 'https://www.instagram.com/invites/contact/?utm_content=xomrd51&srtk=pnmkoglskjxr'}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-instagram-card"
              aria-label={`Kunjungi profil resmi Instagram ${instagramHandle || 'IG : SSLMAID'}`}
            >
              <div className="ig-card-left">
                <div className="ig-icon-container">
                  <InstagramIcon size={22} className="ig-icon-svg" />
                </div>
                <div className="ig-identity">
                  <div className="ig-identity-top">
                    <span className="ig-handle-name">{instagramHandle || 'IG : SSLMAID'}</span>
                    <span className="ig-badge">Official</span>
                  </div>
                  <span className="ig-label-sub">Media Sosial & Komunitas</span>
                </div>
              </div>

              <div className="ig-card-right">
                <div className="ig-metric-count">
                  <span className="ig-count-number">{igFollowers}</span>
                  <span className="ig-count-plus">+</span>
                </div>
                <span className="ig-metric-title">Followers Instagram</span>
                <ExternalLink size={14} className="ig-arrow-icon" aria-hidden="true" />
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
