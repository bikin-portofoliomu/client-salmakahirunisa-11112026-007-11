import React, { useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { Send, MessageSquare, Mail, Sparkles, CheckCircle2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import type { PersonalInfo, ContactInfo } from '../../types/content'
import './Collaboration.css'

interface CollaborationProps {
  personal: PersonalInfo
  contact: ContactInfo
}

export const Collaboration: React.FC<CollaborationProps> = ({
  personal,
  contact,
}) => {
  const [senderName, setSenderName] = useState('')
  const [senderContact, setSenderContact] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FF2A00', '#FF6644', '#111215', '#FFFFFF'],
      })
    } catch {
      // Fallback silent jika canvas-confetti belum termuat
    }
  }

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const waClean = contact.whatsapp.replace(/^0/, '62')
    const encodedText = encodeURIComponent(
      `Halo ${personal.name},\n\nNama: ${senderName || 'Rekan Bisnis'}\nKontak: ${senderContact || '-'}\n\nPesan:\n${message}\n\n(Dikirim dari formulir portofolio Neue Grid Vanguard)`
    )
    const url = `https://wa.me/${waClean}?text=${encodedText}`

    triggerConfetti()
    setIsSubmitted(true)
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer')
    }, 400)
  }

  const handleSendEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const subject = encodeURIComponent(
      `Inquiry Kolaborasi dari ${senderName || 'Rekan Bisnis'}`
    )
    const body = encodeURIComponent(
      `Halo ${personal.name},\n\nNama: ${senderName || '-'}\nKontak: ${senderContact || '-'}\n\nPesan:\n${message}\n\nSalam hormat.`
    )
    const mailto = `mailto:${contact.email}?subject=${subject}&body=${body}`

    triggerConfetti()
    setIsSubmitted(true)
    setTimeout(() => {
      window.location.href = mailto
    }, 400)
  }

  return (
    <section id="kolaborasi" className="collab-section swiss-section">
      <div className="swiss-container">
        <motion.div
          className="collab-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* HEADER SECTION RATA TENGAH MINIMALIS */}
          <div className="swiss-section-header">
            <span className="section-meta-badge">Inisiasi Proyek</span>
            <h2 className="section-title">Kolaborasi Strategis</h2>
            <p className="section-lead-text">
              Kirimkan rencana proyek komunikasi, rilis pers, atau kebutuhan strategi reputasi organisasi Anda.
            </p>
          </div>

          {/* MAIN HERO CARD GRID KOLABORASI */}
          <div className="collab-main-card">
            {/* SISI KIRI: TIPOGRAFI KINETIK RAKSASA */}
            <motion.div className="collab-editorial-col" variants={itemVariants}>
              <div className="collab-headline-block">
                <h3 className="collab-headline-display">
                  MARI BERKOLABORASI BERSAMA<span className="accent-dot">.</span>
                </h3>
              </div>

              <p className="collab-lead-paragraph">
                Terbuka untuk kolaborasi photoshoot komersial, in-frame talent, pembuatan konten kreatif media sosial, dan kemitraan brand ambassador.
              </p>
            </motion.div>

            {/* SISI KANAN: FORMULIR TULIS PESAN LANGSUNG */}
            <motion.div className="collab-form-col" variants={itemVariants}>
              <div className="form-inner-wrapper">
                <div className="form-header-line">
                  <Sparkles size={16} className="form-sparkle-icon" />
                  <span className="form-badge-label">TULIS PESAN LANGSUNG</span>
                </div>

                {isSubmitted ? (
                  <div className="form-success-state">
                    <div className="success-icon-box">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="success-title">PESAN TELAH DITERUSKAN!</h4>
                    <p className="success-subtext">
                      Terima kasih atas inisiatif kolaborasi Anda. Aplikasi perpesanan/email Anda sedang dibuka.
                    </p>
                    <button
                      type="button"
                      className="btn-reset-form"
                      onClick={() => {
                        setIsSubmitted(false)
                        setMessage('')
                      }}
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendWA} className="collab-interactive-form">
                    {/* INPUT 1: NAMA PENGIRIM */}
                    <div className="form-field-group">
                      <label htmlFor="collab-name" className="form-field-label">
                        NAMA LENGKAP ATAU INSTANSI:
                      </label>
                      <input
                        id="collab-name"
                        type="text"
                        className="form-input-text"
                        placeholder="Contoh: Budi Santoso / PT Citra Perkasa"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        required
                      />
                    </div>

                    {/* INPUT 2: KONTAK PENGIRIM */}
                    <div className="form-field-group">
                      <label htmlFor="collab-contact" className="form-field-label">
                        EMAIL ATAU NOMOR TELEPON:
                      </label>
                      <input
                        id="collab-contact"
                        type="text"
                        className="form-input-text"
                        placeholder="Contoh: budi@perusahaan.co.id atau 0812xxxxxxxx"
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        required
                      />
                    </div>

                    {/* INPUT 3: TULISKAN PESAN */}
                    <div className="form-field-group">
                      <label htmlFor="collab-message" className="form-field-label">
                        TULISKAN PESAN KOLABORASI:
                      </label>
                      <textarea
                        id="collab-message"
                        rows={4}
                        className="form-textarea-field"
                        placeholder="Deskripsikan kebutuhan proyek, inisiatif narasi brand, atau agenda diskusi Anda..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>

                    {/* DUA TOMBOL AKSI PENGIRIMAN: VIA WA & VIA EMAIL */}
                    <div className="form-actions-row">
                      <button
                        type="submit"
                        className="btn-submit-wa"
                        aria-label="Kirim formulir ke WhatsApp"
                      >
                        <MessageSquare size={16} />
                        <span>KIRIM KE WHATSAPP</span>
                        <Send size={15} />
                      </button>

                      <button
                        type="button"
                        className="btn-submit-email"
                        onClick={handleSendEmail}
                        aria-label="Kirim formulir via Email"
                      >
                        <Mail size={16} />
                        <span>VIA EMAIL</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
