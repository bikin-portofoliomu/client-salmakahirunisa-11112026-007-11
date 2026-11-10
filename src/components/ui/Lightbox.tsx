import React, { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import type { GalleryItem } from '../../types/content'
import './Lightbox.css'

interface LightboxProps {
  items: GalleryItem[]
  currentIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, onClose, onPrev, onNext])

  if (currentIndex === null || !items[currentIndex]) return null

  const activeItem = items[currentIndex]

  return (
    <div className="swiss-lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="swiss-lightbox-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Control Bar */}
        <div className="lightbox-top-bar">
          <div className="lightbox-counter-badge">
            <span className="counter-current">0{currentIndex + 1}</span>
            <span className="counter-sep">/</span>
            <span className="counter-total">0{items.length}</span>
          </div>

          <div className="lightbox-item-title-meta">
            <span className="lightbox-category-tag">{activeItem.category || 'Dokumentasi'}</span>
            <span className="lightbox-title-text">{activeItem.title}</span>
          </div>

          <button
            type="button"
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Tutup pratinjau gambar (Escape)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Image Stage */}
        <div className="lightbox-stage">
          <button
            type="button"
            className="lightbox-nav-btn prev-btn"
            onClick={onPrev}
            aria-label="Gambar sebelumnya"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="lightbox-image-wrap">
            <img
              src={activeItem.imageUrl}
              alt={activeItem.title}
              className="lightbox-active-img"
              onError={(e) => {
                // Fallback visual jika file gambar lokal belum diletakkan
                ;(e.target as HTMLElement).style.display = 'none'
              }}
            />
            {/* Fallback graphic placeholder jika gambar lokal belum diisi */}
            <div className="lightbox-placeholder-fallback">
              <Maximize2 size={32} className="fallback-icon-accent" />
              <span>{activeItem.title}</span>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-nav-btn next-btn"
            onClick={onNext}
            aria-label="Gambar selanjutnya"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Bottom Caption Bar */}
        {activeItem.description && (
          <div className="lightbox-caption-bar">
            <p className="lightbox-caption-text">{activeItem.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
