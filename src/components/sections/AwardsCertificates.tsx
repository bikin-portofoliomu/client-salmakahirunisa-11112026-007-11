import React, { useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { Trophy, Award, ZoomIn, ArrowUpRight } from 'lucide-react'
import type { AwardItem, CertificateItem } from '../../types/content'
import { Lightbox } from '../ui/Lightbox'
import './AwardsCertificates.css'

interface AwardsCertificatesProps {
  awards: AwardItem[]
  certificates: CertificateItem[]
}

export const AwardsCertificates: React.FC<AwardsCertificatesProps> = ({
  awards,
  certificates,
}) => {
  const [activeCertLightboxIndex, setActiveCertLightboxIndex] = useState<number | null>(null)
  const [failedCertImages, setFailedCertImages] = useState<Record<string, boolean>>({})

  const handleCertImageError = (id: string) => {
    setFailedCertImages((prev) => ({ ...prev, [id]: true }))
  }

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

  const handleOpenLightbox = (index: number) => {
    setActiveCertLightboxIndex(index)
  }

  const handleCloseLightbox = () => {
    setActiveCertLightboxIndex(null)
  }

  const handlePrev = () => {
    setActiveCertLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === 0 ? certificates.length - 1 : prev - 1
    })
  }

  const handleNext = () => {
    setActiveCertLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === certificates.length - 1 ? 0 : prev + 1
    })
  }

  const sortedAwards = [...awards].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  const sortedCertificates = [...certificates].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <section id="sertifikat" className="awards-certs-section swiss-section">
      <div className="swiss-container">
        <motion.div
          className="awards-certs-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* HEADER SECTION RATA TENGAH MINIMALIS */}
          <div className="swiss-section-header">
            <span className="section-meta-badge">Kredensial & Prestasi</span>
            <h2 className="section-title">Penghargaan & Sertifikat</h2>
            <p className="section-lead-text">
              Bukti pencapaian, sertifikasi kompetensi, dan apresiasi resmi yang terverifikasi.
            </p>
          </div>

          {/* BAGIAN 1: PENGHARGAAN BERGENGSI */}
          <div className="awards-sub-block">
            <div className="sub-block-header">
              <Trophy size={18} className="sub-block-icon" />
              <h3 className="sub-block-heading">Penghargaan Bergengsi</h3>
            </div>

            <div className="awards-list-clean">
              {sortedAwards.map((item) => (
                <motion.article
                  key={item.id}
                  className="award-card-clean"
                  variants={itemVariants}
                >
                  <div className="award-year-tag">{item.year}</div>

                  <div className="award-main-content">
                    <h4 className="award-title-text">{item.title}</h4>
                    {item.description && (
                      <p className="award-desc-text">{item.description}</p>
                    )}
                  </div>

                  <div className="award-inst-tag">{item.institution}</div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* BAGIAN 2: SERTIFIKASI PROFESI RESMI */}
          <div className="certs-sub-block">
            <div className="sub-block-header">
              <Award size={18} className="sub-block-icon" />
              <h3 className="sub-block-heading">Sertifikasi Profesi Resmi</h3>
            </div>

            {/* Grid 3-Kolom Bersih & Standar */}
            <div className="certs-grid-standard">
              {sortedCertificates.map((cert, index) => (
                <motion.article
                  key={cert.id}
                  className="cert-card-clean"
                  variants={itemVariants}
                  onClick={() => handleOpenLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleOpenLightbox(index)
                    }
                  }}
                  aria-label={`Buka pratinjau sertifikat ${cert.title}`}
                >
                  {/* Media Frame (Pratinjau Sertifikat) */}
                  <div className="cert-media-frame">
                    {!failedCertImages[cert.id] ? (
                      <img
                        src={cert.imageUrl}
                        alt=""
                        aria-hidden="true"
                        className="cert-media-img"
                        loading="lazy"
                        onError={() => handleCertImageError(cert.id)}
                      />
                    ) : (
                      <div className="cert-fallback-box">
                        <Award size={28} className="cert-fallback-icon" />
                        <span className="cert-fallback-label">{cert.issuer}</span>
                      </div>
                    )}

                    <div className="cert-hover-pill">
                      <ZoomIn size={14} />
                      <span>Perbesar</span>
                    </div>
                  </div>

                  {/* Body Content (Hanya Muncul Sekali) */}
                  <div className="cert-body-content">
                    <div className="cert-meta-header">
                      <span className="cert-issuer-name">{cert.issuer}</span>
                      <span className="cert-meta-dot">•</span>
                      <span className="cert-year-val">{cert.year}</span>
                    </div>

                    <h4 className="cert-heading-title">{cert.title}</h4>

                    {cert.credentialUrl && (
                      <div className="cert-action-footer">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-verify-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Verifikasi Kredensial</span>
                          <ArrowUpRight size={13} />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal untuk Sertifikat */}
      {activeCertLightboxIndex !== null && (
        <Lightbox
          items={certificates.map((c) => ({
            id: c.id,
            imageUrl: c.imageUrl,
            title: c.title,
            category: c.issuer,
            description: `Tahun Penerbitan: ${c.year}`,
          }))}
          currentIndex={activeCertLightboxIndex}
          onClose={handleCloseLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  )
}
