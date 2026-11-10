import React, { useState } from 'react'
import { motion, type Variants } from 'motion/react'
import {
  MessageSquare,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react'
import type { ContactInfo, PersonalInfo } from '../../types/content'
import './QuickContact.css'

interface QuickContactProps {
  contact: ContactInfo
  personal?: PersonalInfo
}

// Icon SVG LinkedIn
const LinkedInIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
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

// Icon SVG Instagram
const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
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

// Icon SVG TikTok
const TikTokIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
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

export const QuickContact: React.FC<QuickContactProps> = ({ contact, personal }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null)

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  const waCleanNumber = contact.whatsapp.replace(/^0/, '62')
  const clientName = personal?.name || 'Salma Khairunisa'
  const waUrl = `https://wa.me/${waCleanNumber}?text=Halo%20${encodeURIComponent(clientName)},%20saya%20ingin%20berdiskusi%20dan%20berkolaborasi.`
  const mailtoUrl = `mailto:${contact.email}?subject=Inquiry%20Kolaborasi%20-%20${encodeURIComponent(clientName)}&body=Halo%20${encodeURIComponent(clientName)},%0D%0A%0D%0ASaya%20ingin%20mendiskusikan%20peluang%20kerja%20sama...`

  return (
    <section id="kontak" className="quick-contact-section swiss-section">
      <div className="swiss-container">
        <motion.div
          className="quick-contact-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* HEADER SECTION RATA TENGAH MINIMALIS */}
          <div className="swiss-section-header">
            <span className="section-meta-badge">Hubungi Langsung</span>
            <h2 className="section-title">Kontak Cepat</h2>
            <p className="section-lead-text">
              Saluran komunikasi langsung untuk diskusi penjadwalan, konsultasi, dan kemitraan media.
            </p>
          </div>

          <div className="quick-contact-actions-center">
            {/* DUA TOMBOL AKSI CEPAT UTAMA: KIRIM VIA WA & KIRIM VIA EMAIL */}
            <div className="quick-action-buttons-wrap">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quick-primary"
                aria-label="Kirim pesan langsung via WhatsApp"
              >
                <MessageSquare size={17} />
                <span>KIRIM VIA WA</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href={mailtoUrl}
                className="btn-quick-secondary"
                aria-label="Kirim surat elektronik via Email"
              >
                <Mail size={17} />
                <span>KIRIM VIA EMAIL</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* GRID 3 KARTU INFORMASI KONTAK (NOMOR WA, EMAIL, DOMISILI) */}
          <div className="contact-info-grid-3">
            {/* KARTU 1: NOMOR WA */}
            <motion.div className="contact-info-card" variants={itemVariants}>
              <div className="info-card-header">
                <div className="info-icon-badge">
                  <Phone size={18} />
                </div>
                <span className="info-idx-num">01 /</span>
              </div>

              <div className="info-card-body">
                <span className="info-card-label">NOMOR WHATSAPP</span>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-card-value-link"
                >
                  {contact.whatsapp}
                </a>
              </div>

              <div className="info-card-footer">
                <button
                  type="button"
                  className="copy-action-btn"
                  onClick={() => handleCopy(contact.whatsapp, 'wa')}
                  aria-label="Salin nomor WhatsApp"
                >
                  {copiedType === 'wa' ? (
                    <>
                      <Check size={13} className="copy-success-icon" />
                      <span>TERSALIN</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>SALIN NOMOR</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* KARTU 2: EMAIL */}
            <motion.div className="contact-info-card" variants={itemVariants}>
              <div className="info-card-header">
                <div className="info-icon-badge">
                  <Mail size={18} />
                </div>
                <span className="info-idx-num">02 /</span>
              </div>

              <div className="info-card-body">
                <span className="info-card-label">ALAMAT EMAIL RESMI</span>
                <a href={mailtoUrl} className="info-card-value-link">
                  {contact.email}
                </a>
              </div>

              <div className="info-card-footer">
                <button
                  type="button"
                  className="copy-action-btn"
                  onClick={() => handleCopy(contact.email, 'email')}
                  aria-label="Salin alamat email"
                >
                  {copiedType === 'email' ? (
                    <>
                      <Check size={13} className="copy-success-icon" />
                      <span>TERSALIN</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>SALIN EMAIL</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* KARTU 3: DOMISILI */}
            <motion.div className="contact-info-card" variants={itemVariants}>
              <div className="info-card-header">
                <div className="info-icon-badge">
                  <MapPin size={18} />
                </div>
                <span className="info-idx-num">03 /</span>
              </div>

              <div className="info-card-body">
                <span className="info-card-label">DOMISILI & LOKASI</span>
                <p className="info-card-value-text">{contact.location}</p>
              </div>

              <div className="info-card-footer">
                <span className="status-live-tag">WAKTU INDONESIA BARAT (WIB)</span>
              </div>
            </motion.div>
          </div>

          {/* BAGIAN TAUTAN APLIKASI & JEJARING SOSIAL (LINK APP) */}
          <div className="social-links-dossier-block">
            <div className="social-dossier-heading">
              <span className="social-label-tag">LINK APLIKASI & JEJARING SOSIAL:</span>
            </div>

            <div className="social-cards-row">
              {contact.socials.map((social) => {
                let SocialIcon: React.ComponentType<{ size?: number; className?: string }> =
                  ExternalLink
                if (social.platform === 'linkedin') SocialIcon = LinkedInIcon
                if (social.platform === 'instagram') SocialIcon = InstagramIcon
                if (social.platform === 'tiktok') SocialIcon = TikTokIcon

                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-app-card"
                    variants={itemVariants}
                    aria-label={`Buka profil ${social.label}`}
                  >
                    <div className="social-app-icon-box">
                      <SocialIcon size={18} />
                    </div>

                    <div className="social-app-meta">
                      <span className="social-platform-name">{social.label}</span>
                      <span className="social-handle-text">{social.handle || social.label}</span>
                    </div>

                    <ArrowUpRight size={16} className="social-arrow-icon" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
