import React, { useRef, useState } from 'react'
import { Upload, Link as LinkIcon, X, Check, Loader2, Image as ImageIcon } from 'lucide-react'

interface ImageInputControlProps {
  label: string
  value: string
  onChange: (newValue: string) => void
  onFileSelect?: (file: File) => void
  helperText?: string
}

export const ImageInputControl: React.FC<ImageInputControlProps> = ({
  label,
  value,
  onChange,
  onFileSelect,
  helperText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Format berkas harus berupa gambar (JPG, PNG, WebP, SVG)')
      return
    }

    // Batasi ukuran maksimal 10MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Ukuran berkas maksimal 10MB')
      return
    }

    onFileSelect?.(file)
    setErrorMsg(null)
    setIsProcessing(true)

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result)
      }
      setIsProcessing(false)
    }
    reader.onerror = () => {
      setErrorMsg('Gagal membaca berkas gambar lokal')
      setIsProcessing(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </label>
        {value && (
          <span
            style={{
              fontSize: '0.6875rem',
              color: '#10B981',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              padding: '2px 8px',
              borderRadius: '4px',
            }}
          >
            <Check size={12} />
            <span>Gambar Terpasang</span>
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {/* Link / Path input field */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            padding: '0 10px',
            minHeight: '40px',
          }}
        >
          <LinkIcon size={14} style={{ color: 'var(--color-text-muted)', marginRight: '8px', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Tempel tautan gambar (https://...) atau jalur (/assets/...)"
            value={value.startsWith('data:') ? '[Gambar Hasil Unggahan Berkas Lokal]' : value}
            onChange={(e) => {
              if (!e.target.value.startsWith('[Gambar Hasil')) {
                onChange(e.target.value)
              }
            }}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--color-text)',
              fontSize: '0.8125rem',
              fontFamily: 'var(--font-body, sans-serif)',
            }}
          />
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        {/* Upload Button */}
        <button
          type="button"
          disabled={isProcessing}
          onClick={() => fileInputRef.current?.click()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0 14px',
            minHeight: '40px',
            borderRadius: '6px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: isProcessing ? 'wait' : 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}
        >
          {isProcessing ? (
            <>
              <Loader2 size={14} className="animate-spin" style={{ color: 'var(--color-accent)' }} />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <Upload size={14} style={{ color: 'var(--color-accent)' }} />
              <span>Unggah Berkas</span>
            </>
          )}
        </button>

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            title="Hapus gambar"
            aria-label="Hapus gambar"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {errorMsg && (
        <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>
          {errorMsg}
        </span>
      )}

      {helperText && !errorMsg && (
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          {helperText}
        </span>
      )}

      {/* Thumbnail Preview */}
      {value && (
        <div
          style={{
            marginTop: '4px',
            position: 'relative',
            width: '96px',
            height: '96px',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1.5px solid var(--color-accent)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <img
            src={value}
            alt="Pratinjau gambar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              ;(e.target as HTMLElement).style.display = 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              fontSize: '0.625rem',
              color: '#10B981',
              fontWeight: 700,
              textAlign: 'center',
              padding: '2px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            <ImageIcon size={10} />
            <span>TERPASANG</span>
          </div>
        </div>
      )}
    </div>
  )
}
