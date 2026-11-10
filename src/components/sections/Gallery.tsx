import React, { useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { Eye, ArrowUpRight } from 'lucide-react'
import type { GalleryItem } from '../../types/content'
import { Lightbox } from '../ui/Lightbox'
import './Gallery.css'

interface GalleryProps {
  items: GalleryItem[]
  description?: string
}

export const Gallery: React.FC<GalleryProps> = ({ items, description }) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }))
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index)
  }

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null)
  }

  const handlePrev = () => {
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === 0 ? items.length - 1 : prev - 1
    })
  }

  const handleNext = () => {
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === items.length - 1 ? 0 : prev + 1
    })
  }

  return (
    <section id="galeri" className="gallery-section swiss-section">
      <div className="swiss-container">
        <motion.div
          className="gallery-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* HEADER SECTION RATA TENGAH MINIMALIS */}
          <div className="swiss-section-header">
            <span className="section-meta-badge">Karya & Dokumentasi</span>
            <h2 className="section-title">Galeri Saya</h2>
            {description && (
              <p className="section-lead-text">{description}</p>
            )}
          </div>

          {/* GRID 6 FOTO EDITORIAL (2 BARIS X 3 KOLOM) */}
          <div className="gallery-grid-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="gallery-card"
                variants={cardVariants}
                onClick={() => handleOpenLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleOpenLightbox(index)
                  }
                }}
                aria-label={`Buka pratinjau ${item.title}`}
              >
                <div className="gallery-image-frame">
                  {!failedImages[item.id] ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="gallery-img"
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <div className="gallery-placeholder-pattern">
                      <span className="placeholder-num">0{index + 1}</span>
                      <span className="placeholder-tag">{item.category}</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="gallery-hover-overlay">
                    <div className="hover-action-pill">
                      <Eye size={15} />
                      <span>PRATINJAU</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                <div className="gallery-info-bar">
                  <div className="gallery-card-meta">
                    <span className="gallery-category-pill">{item.category}</span>
                  </div>
                  <h3 className="gallery-card-heading">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DESKRIPSI EDITORIAL GALERI (OPSIONAL) */}
          {description && (
            <div className="gallery-editorial-description">
              <div className="description-accent-line" />
              <p className="description-text-lead">{description}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* MODAL LIGHTBOX RESOLUSI PENUH */}
      <Lightbox
        items={items}
        currentIndex={activeLightboxIndex}
        onClose={handleCloseLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  )
}
