import React, { useState, useEffect, useRef } from 'react'
import {
  User,
  Sparkles,
  Image as ImageIcon,
  GraduationCap,
  Briefcase,
  Layers,
  Globe2,
  Award,
  Phone,
  Settings,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  FolderCheck,
  Columns2,
  Eye,
  Edit3,
  Monitor,
  Tablet,
  Smartphone,
  Loader2,
} from 'lucide-react'
import type {
  PortfolioContent,
  TemplateConfig,
  GalleryItem,
  EducationItem,
  ExperienceItem,
  SkillGroup,
  LanguageItem,
  AwardItem,
  CertificateItem,
} from '../types/content'
import {
  getStoredPortfolio,
  saveStoredPortfolio,
  getStoredConfig,
  saveStoredConfig,
  resetPortfolioToDefault,
  exportPortfolioJSON,
} from '../utils/storage'
import { exportToProjectDirectory, isFileSystemAccessSupported } from '../utils/exportProject'
import { ImageInputControl } from '../components/studio/ImageInputControl'
import { PortfolioRenderer } from '../components/PortfolioRenderer'
import './StudioPage.css'

type TabKey =
  | 'identitas'
  | 'metrik'
  | 'galeri'
  | 'pendidikan'
  | 'pengalaman'
  | 'keahlian'
  | 'bahasa'
  | 'prestasi'
  | 'kontak'
  | 'tampilan'

type ViewMode = 'editor' | 'split' | 'preview'
type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export const StudioPage: React.FC = () => {
  const [content, setContent] = useState<PortfolioContent>(() => getStoredPortfolio())
  const [config, setConfig] = useState<TemplateConfig>(() => getStoredConfig())
  const [activeTab, setActiveTab] = useState<TabKey>('identitas')
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [isSaved, setIsSaved] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  const jsonImportRef = useRef<HTMLInputElement>(null)
  const rawFilesRef = useRef<Record<string, File>>({})

  // Auto-save ke localStorage dengan debounce
  useEffect(() => {
    setIsSaved(false)
    const timer = setTimeout(() => {
      saveStoredPortfolio(content)
      saveStoredConfig(config)
      setIsSaved(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [content, config])

  // Sync tema ke atribut HTML dokumen
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', config.theme)
  }, [config.theme])

  const handleExportToProject = async () => {
    if (!isFileSystemAccessSupported()) {
      alert('Peramban Anda belum mendukung File System Access API. Silakan gunakan tombol Ekspor JSON sebagai cadangan.')
      return
    }

    try {
      setIsExporting(true)
      const res = await exportToProjectDirectory(content, config, rawFilesRef.current)
      if (res.success) {
        alert(
          `SUKSES! Sebanyak ${res.filesCount} berkas (termasuk seluruh foto yang dialokasikan rapi dan portfolio-data.json) telah berhasil ditulis ke folder proyek Anda!`,
        )
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        alert(`Gagal mengekspor proyek: ${err.message || 'Terjadi kesalahan sistem'}`)
      }
    } finally {
      setIsExporting(false)
    }
  }

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh data ke bawaan awal pelanggan?')) {
      const reset = resetPortfolioToDefault()
      setContent(reset.content)
      setConfig(reset.config)
    }
  }

  const handleExportJSON = () => {
    exportPortfolioJSON(content, config)
  }

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string)
        if (parsed.content) {
          setContent(parsed.content)
        }
        if (parsed.config) {
          setConfig(parsed.config)
        }
        alert('Data portofolio berhasil diimpor dari berkas JSON!')
      } catch (err) {
        alert('Gagal membaca berkas JSON. Format tidak valid.')
        console.error(err)
      }
    }
    reader.readAsText(file)
  }

  // Helper mutasi nested state
  const updatePersonal = (field: keyof PortfolioContent['personal'], val: string) => {
    setContent((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: val },
    }))
  }

  const updateMetrics = (field: keyof PortfolioContent['metrics'], val: any) => {
    setContent((prev) => ({
      ...prev,
      metrics: { ...prev.metrics, [field]: val },
    }))
  }

  const updateContact = (field: keyof PortfolioContent['contact'], val: any) => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: val },
    }))
  }

  return (
    <div className="studio-root">
      {/* 1. TOP BAR STUDIO (ADMIN PANEL ONLY) */}
      <header className="studio-topbar">
        <div className="studio-topbar-left">
          <div className="studio-brand-badge">
            <span className="studio-brand-dot" />
            <span className="studio-brand-name">bikin.portofoliomu</span>
            <span className="studio-edition-tag">Studio Editor (NP-11)</span>
          </div>

          <div className="studio-status-indicator">
            <CheckCircle2 size={14} className={isSaved ? 'text-emerald' : 'text-muted'} />
            <span>{isSaved ? 'Perubahan Tersimpan Otomatis' : 'Menyimpan...'}</span>
          </div>
        </div>

        <div className="studio-topbar-center">
          {/* View Mode Toggle */}
          <div className="studio-segmented-control">
            <button
              type="button"
              className={`segmented-btn ${viewMode === 'editor' ? 'active' : ''}`}
              onClick={() => setViewMode('editor')}
              title="Hanya formulir editor"
            >
              <Edit3 size={14} />
              <span>Editor</span>
            </button>
            <button
              type="button"
              className={`segmented-btn ${viewMode === 'split' ? 'active' : ''}`}
              onClick={() => setViewMode('split')}
              title="Editor dan pratinjau berdampingan"
            >
              <Columns2 size={14} />
              <span>Berdampingan</span>
            </button>
            <button
              type="button"
              className={`segmented-btn ${viewMode === 'preview' ? 'active' : ''}`}
              onClick={() => setViewMode('preview')}
              title="Hanya pratinjau penuh"
            >
              <Eye size={14} />
              <span>Pratinjau</span>
            </button>
          </div>

          {/* Device Mode Toggle (hanya saat split atau preview) */}
          {viewMode !== 'editor' && (
            <div className="studio-segmented-control">
              <button
                type="button"
                className={`segmented-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setDeviceMode('desktop')}
                title="Tampilan Desktop Penuh"
              >
                <Monitor size={14} />
              </button>
              <button
                type="button"
                className={`segmented-btn ${deviceMode === 'tablet' ? 'active' : ''}`}
                onClick={() => setDeviceMode('tablet')}
                title="Tampilan Tablet (768px)"
              >
                <Tablet size={14} />
              </button>
              <button
                type="button"
                className={`segmented-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setDeviceMode('mobile')}
                title="Tampilan Mobile (375px)"
              >
                <Smartphone size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="studio-topbar-right">
          {/* Tombol Ekspor Proyek Lengkap (Alokasi Foto Otomatis ke public/assets) */}
          <button
            type="button"
            className="studio-btn studio-btn-primary"
            onClick={handleExportToProject}
            disabled={isExporting}
            title="Alokasikan seluruh foto upload ke folder public/assets dan buat portfolio-data.json"
          >
            {isExporting ? <Loader2 size={14} className="spin" /> : <FolderCheck size={14} />}
            <span>{isExporting ? 'Mengekspor...' : 'Ekspor ke Proyek'}</span>
          </button>

          {/* Export JSON */}
          <button
            type="button"
            className="studio-btn studio-btn-secondary"
            onClick={handleExportJSON}
            title="Unduh data portofolio sebagai berkas JSON"
          >
            <Download size={14} />
            <span>Unduh JSON</span>
          </button>

          {/* Import JSON */}
          <input
            type="file"
            accept=".json"
            ref={jsonImportRef}
            onChange={handleImportJSON}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            className="studio-btn studio-btn-secondary"
            onClick={() => jsonImportRef.current?.click()}
            title="Muat data portofolio dari berkas JSON"
          >
            <Upload size={14} />
            <span>Impor JSON</span>
          </button>

          {/* Reset ke Default */}
          <button
            type="button"
            className="studio-btn studio-btn-danger"
            onClick={handleReset}
            title="Reset data ke data bawaan awal pelanggan"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          {/* Lihat Website Publik */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="studio-btn studio-btn-secondary"
            title="Buka website publik di tab baru"
          >
            <span>Web Publik</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      {/* 2. BODY WORKSPACE */}
      <div className={`studio-workspace view-${viewMode}`}>
        {/* PANE EDITOR (TAMPIL DI 'editor' & 'split') */}
        {viewMode !== 'preview' && (
          <aside className="studio-editor-pane">
            {/* BILAH TAB NAVIGASI BAGIAN */}
            <nav className="studio-tabs-nav" aria-label="Navigasi Bagian Editor">
              <button
                type="button"
                className={`studio-tab-item ${activeTab === 'identitas' ? 'active' : ''}`}
                onClick={() => setActiveTab('identitas')}
              >
                <User size={16} />
                <span>1. Identitas & Hero</span>
              </button>

              <button
                type="button"
                className={`studio-tab-item ${activeTab === 'metrik' ? 'active' : ''}`}
                onClick={() => setActiveTab('metrik')}
              >
                <Sparkles size={16} />
                <span>2. Metrik & IG</span>
              </button>

              <button
                type="button"
                className={`studio-tab-item ${activeTab === 'galeri' ? 'active' : ''}`}
                onClick={() => setActiveTab('galeri')}
              >
                <ImageIcon size={16} />
                <span>3. Galeri Foto ({content.gallery.length})</span>
              </button>

              <button
                type="button"
                className={`studio-tab-item ${activeTab === 'pendidikan' ? 'active' : ''}`}
                onClick={() => setActiveTab('pendidikan')}
              >
                <GraduationCap size={16} />
                <span>4. Pendidikan ({content.education.length})</span>
              </button>

              <button
                type="button"
                className={`studio-tab-item ${activeTab === 'pengalaman' ? 'active' : ''}`}
                onClick={() => setActiveTab('pengalaman')}
              >
                <Briefcase size={16} />
                <span>5. Pengalaman ({content.experience.length})</span>
              </button>

              <button
                type="button"
                className={`studio-tab-item ${activeTab === 'keahlian' ? 'active' : ''}`}
                onClick={() => setActiveTab('keahlian')}
              >
                <Layers size={16} />
                <span>6. Keahlian ({content.skills.length})</span>
              </button>

              <button
                type="button"
                className={`studio-tab-item ${activeTab === 'bahasa' ? 'active' : ''}`}
                onClick={() => setActiveTab('bahasa')}
              >
                <Globe2 size={16} />
                <span>7. Bahasa ({content.languages.length})</span>
              </button>

              <button
                type="button"
                className={`studio-tab-item ${activeTab === 'prestasi' ? 'active' : ''}`}
                onClick={() => setActiveTab('prestasi')}
              >
                <Award size={16} />
                <span>8. Prestasi & Sertifikat</span>
              </button>

              <button
                type="button"
                className={`studio-tab-item ${activeTab === 'kontak' ? 'active' : ''}`}
                onClick={() => setActiveTab('kontak')}
              >
                <Phone size={16} />
                <span>9. Kontak & Kolaborasi</span>
              </button>

              <button
                type="button"
                className={`studio-tab-item ${activeTab === 'tampilan' ? 'active' : ''}`}
                onClick={() => setActiveTab('tampilan')}
              >
                <Settings size={16} />
                <span>10. Tema, Navbar & Footer</span>
              </button>
            </nav>

            {/* FORMULIR AKTIF */}
            <div className="studio-form-area">
              {/* TAB 1: IDENTITAS & HERO */}
              {activeTab === 'identitas' && (
                <div className="tab-pane">
                  <h2 className="tab-pane-title">Identitas Pribadi & Hero Section</h2>
                  <p className="tab-pane-desc">
                    Kelola data dasar nama, foto profil, peran pekerjaan, dan kutipan editorial di bagian beranda.
                  </p>

                  <div className="form-card">
                    {/* Foto Profil via ImageInputControl */}
                    <ImageInputControl
                      label="Foto Profil (Avatar)"
                      value={content.personal.avatarUrl}
                      onChange={(url) => updatePersonal('avatarUrl', url)}
                      onFileSelect={(file) => {
                        rawFilesRef.current['profile'] = file
                      }}
                      helperText="Unggah foto portrait/square atau tempel tautan URL."
                    />

                    <div className="form-group-grid">
                      <div className="form-field">
                        <label className="field-label">Nama Lengkap Pengguna</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.personal.name}
                          onChange={(e) => updatePersonal('name', e.target.value)}
                        />
                      </div>

                      <div className="form-field">
                        <label className="field-label">Peran / Profesi Saat Ini</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.personal.role}
                          onChange={(e) => updatePersonal('role', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group-grid">
                      <div className="form-field">
                        <label className="field-label">Domisili / Lokasi</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.personal.location}
                          onChange={(e) => updatePersonal('location', e.target.value)}
                        />
                      </div>

                      <div className="form-field">
                        <label className="field-label">Tanggal Lahir (DD/MM/YYYY)</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.personal.birthDate}
                          onChange={(e) => updatePersonal('birthDate', e.target.value)}
                          placeholder="Contoh: 14/05/2003"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="field-label">Status Ketersediaan Proyek</label>
                      <input
                        type="text"
                        className="field-input"
                        value={content.personal.statusText || ''}
                        onChange={(e) => updatePersonal('statusText', e.target.value)}
                        placeholder="Contoh: Tersedia untuk Komunikasi Korporat"
                      />
                    </div>

                    <div className="form-field">
                      <label className="field-label">Kutipan Editorial (Quotes)</label>
                      <textarea
                        className="field-textarea"
                        rows={3}
                        value={content.personal.quote}
                        onChange={(e) => updatePersonal('quote', e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label className="field-label">Ringkasan Biografi (Tentang Saya)</label>
                      <textarea
                        className="field-textarea"
                        rows={4}
                        value={content.personal.bioSummary}
                        onChange={(e) => updatePersonal('bioSummary', e.target.value)}
                      />
                    </div>

                    <div className="form-group-grid" style={{ marginTop: '8px' }}>
                      <div className="form-field">
                        <label className="field-label">Teks Status / Badge di Navbar</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.navbarStatus || ''}
                          onChange={(e) => setContent((prev) => ({ ...prev, navbarStatus: e.target.value }))}
                          placeholder="Default: Corporate Comms"
                        />
                      </div>
                      <div className="form-field">
                        <label className="field-label">Teks Tombol CTA Navbar</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.navbarCtaText || ''}
                          onChange={(e) => setContent((prev) => ({ ...prev, navbarCtaText: e.target.value }))}
                          placeholder="Default: Hubungi"
                        />
                      </div>
                    </div>

                    <div className="form-group-grid" style={{ marginTop: '8px' }}>
                      <div className="form-field">
                        <label className="field-label">Teks Tombol Hero Utama (Solid)</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.heroPrimaryCtaText || ''}
                          onChange={(e) => setContent((prev) => ({ ...prev, heroPrimaryCtaText: e.target.value }))}
                          placeholder="Default: Hubungi Saya"
                        />
                      </div>
                      <div className="form-field">
                        <label className="field-label">Teks Tombol Hero Kedua (Outline)</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.heroSecondaryCtaText || ''}
                          onChange={(e) => setContent((prev) => ({ ...prev, heroSecondaryCtaText: e.target.value }))}
                          placeholder="Default: Lihat Galeri"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: METRIK & INSTAGRAM */}
              {activeTab === 'metrik' && (
                <div className="tab-pane">
                  <h2 className="tab-pane-title">Metrik Portofolio & Instagram</h2>
                  <p className="tab-pane-desc">
                    Sesuaikan angka metrik pada Hero strip dan kartu mandiri followers Instagram.
                  </p>

                  <div className="form-card">
                    <div className="form-group-grid">
                      <div className="form-field">
                        <label className="field-label">Total Sertifikat Resmi</label>
                        <input
                          type="number"
                          className="field-input"
                          value={content.metrics.totalCertificates}
                          onChange={(e) => updateMetrics('totalCertificates', parseInt(e.target.value, 10) || 0)}
                        />
                        <span className="field-hint">Otomatis ditambah tanda "+" di tampilan Hero.</span>
                      </div>

                      <div className="form-field">
                        <label className="field-label">Tanggal Lahir untuk Kalkulator Umur (YYYY-MM-DD)</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.metrics.birthDateForAge}
                          onChange={(e) => updateMetrics('birthDateForAge', e.target.value)}
                          placeholder="2003-05-14"
                        />
                      </div>
                    </div>

                    <div className="form-group-grid">
                      <div className="form-field">
                        <label className="field-label">Total Keahlian & Tools Dikuasai</label>
                        <input
                          type="number"
                          className="field-input"
                          value={content.metrics.totalSkillsCount}
                          onChange={(e) => updateMetrics('totalSkillsCount', parseInt(e.target.value, 10) || 0)}
                        />
                      </div>

                      <div className="form-field">
                        <label className="field-label">Jumlah Followers Instagram</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.metrics.instagramFollowers || '12.4K'}
                          onChange={(e) => updateMetrics('instagramFollowers', e.target.value)}
                          placeholder="Contoh: 12.4K"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: GALERI FOTO */}
              {activeTab === 'galeri' && (
                <div className="tab-pane">
                  <div className="pane-header-actions">
                    <div>
                      <h2 className="tab-pane-title">Galeri Karya & Dokumentasi</h2>
                      <p className="tab-pane-desc">
                        Kelola 6 foto dokumentasi kegiatan strategis dan proyek komunikasi.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="studio-btn studio-btn-primary"
                      onClick={() => {
                        const newItem: GalleryItem = {
                          id: `gal-${Date.now()}`,
                          title: 'Dokumentasi Kegiatan Baru',
                          imageUrl: '/assets/gallery/gallery-1.png',
                          category: 'Public Relations',
                          description: 'Deskripsi dokumentasi liputan atau acara.',
                          order: content.gallery.length + 1,
                        }
                        setContent((prev) => ({ ...prev, gallery: [...prev.gallery, newItem] }))
                      }}
                    >
                      <Plus size={14} />
                      <span>Tambah Foto</span>
                    </button>
                  </div>

                  <div className="form-card">
                    <div className="form-field">
                      <label className="field-label">Deskripsi Pengantar Galeri (Opsional)</label>
                      <textarea
                        className="field-textarea"
                        rows={2}
                        value={content.galleryDescription || ''}
                        onChange={(e) => setContent((prev) => ({ ...prev, galleryDescription: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="items-list-container">
                    {content.gallery.map((item, index) => (
                      <div key={item.id} className="item-editor-card">
                        <div className="item-editor-top">
                          <span className="item-index-badge">Foto #{index + 1}</span>
                          <button
                            type="button"
                            className="btn-trash"
                            onClick={() => {
                              setContent((prev) => ({
                                ...prev,
                                gallery: prev.gallery.filter((g) => g.id !== item.id),
                              }))
                            }}
                            title="Hapus foto ini"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <ImageInputControl
                          label="Berkas Gambar Dokumentasi"
                          value={item.imageUrl}
                          onChange={(url) => {
                            setContent((prev) => ({
                              ...prev,
                              gallery: prev.gallery.map((g) => (g.id === item.id ? { ...g, imageUrl: url } : g)),
                            }))
                          }}
                          onFileSelect={(file) => {
                            rawFilesRef.current[`gallery-${item.id}`] = file
                          }}
                        />

                        <div className="form-group-grid">
                          <div className="form-field">
                            <label className="field-label">Judul Foto</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.title}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  gallery: prev.gallery.map((g) => (g.id === item.id ? { ...g, title: val } : g)),
                                }))
                              }}
                            />
                          </div>

                          <div className="form-field">
                            <label className="field-label">Kategori / Topik</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.category || ''}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  gallery: prev.gallery.map((g) => (g.id === item.id ? { ...g, category: val } : g)),
                                }))
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-field">
                          <label className="field-label">Deskripsi Singkat</label>
                          <input
                            type="text"
                            className="field-input"
                            value={item.description || ''}
                            onChange={(e) => {
                              const val = e.target.value
                              setContent((prev) => ({
                                ...prev,
                                gallery: prev.gallery.map((g) => (g.id === item.id ? { ...g, description: val } : g)),
                              }))
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PENDIDIKAN */}
              {activeTab === 'pendidikan' && (
                <div className="tab-pane">
                  <div className="pane-header-actions">
                    <div>
                      <h2 className="tab-pane-title">Riwayat Pendidikan Formal</h2>
                      <p className="tab-pane-desc">Kelola jenjang akademik mulai dari perguruan tinggi hingga sekolah.</p>
                    </div>
                    <button
                      type="button"
                      className="studio-btn studio-btn-primary"
                      onClick={() => {
                        const newEdu: EducationItem = {
                          id: `edu-${Date.now()}`,
                          period: '2025-2027',
                          institution: 'Nama Lembaga Pendidikan',
                          major: 'Jurusan / Konsentrasi',
                          degree: 'Gelar Akademik',
                          order: content.education.length + 1,
                        }
                        setContent((prev) => ({ ...prev, education: [...prev.education, newEdu] }))
                      }}
                    >
                      <Plus size={14} />
                      <span>Tambah Pendidikan</span>
                    </button>
                  </div>

                  <div className="items-list-container">
                    {content.education.map((item, index) => (
                      <div key={item.id} className="item-editor-card">
                        <div className="item-editor-top">
                          <span className="item-index-badge">Pendidikan #{index + 1}</span>
                          <button
                            type="button"
                            className="btn-trash"
                            onClick={() => {
                              setContent((prev) => ({
                                ...prev,
                                education: prev.education.filter((e) => e.id !== item.id),
                              }))
                            }}
                            title="Hapus item ini"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="form-group-grid">
                          <div className="form-field">
                            <label className="field-label">Periode Tahun (Contoh: 2021-2025)</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.period}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  education: prev.education.map((ed) => (ed.id === item.id ? { ...ed, period: val } : ed)),
                                }))
                              }}
                            />
                          </div>

                          <div className="form-field">
                            <label className="field-label">Nama Instansi / Sekolah / Universitas</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.institution}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  education: prev.education.map((ed) => (ed.id === item.id ? { ...ed, institution: val } : ed)),
                                }))
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-group-grid">
                          <div className="form-field">
                            <label className="field-label">Jurusan / Peminatan</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.major || ''}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  education: prev.education.map((ed) => (ed.id === item.id ? { ...ed, major: val } : ed)),
                                }))
                              }}
                            />
                          </div>

                          <div className="form-field">
                            <label className="field-label">Jenjang / Gelar</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.degree || ''}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  education: prev.education.map((ed) => (ed.id === item.id ? { ...ed, degree: val } : ed)),
                                }))
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PENGALAMAN */}
              {activeTab === 'pengalaman' && (
                <div className="tab-pane">
                  <div className="pane-header-actions">
                    <div>
                      <h2 className="tab-pane-title">Pengalaman Kerja & Karir Profesional</h2>
                      <p className="tab-pane-desc">Kelola riwayat karir, posisi, perusahaan, dan deskripsi kontribusi.</p>
                    </div>
                    <button
                      type="button"
                      className="studio-btn studio-btn-primary"
                      onClick={() => {
                        const newExp: ExperienceItem = {
                          id: `exp-${Date.now()}`,
                          period: '2026-Sekarang',
                          role: 'Posisi / Jabatan Pekerjaan',
                          company: 'Nama Perusahaan',
                          description: 'Deskripsi tanggung jawab dan pencapaian kerja.',
                          order: content.experience.length + 1,
                        }
                        setContent((prev) => ({ ...prev, experience: [...prev.experience, newExp] }))
                      }}
                    >
                      <Plus size={14} />
                      <span>Tambah Pengalaman</span>
                    </button>
                  </div>

                  <div className="items-list-container">
                    {content.experience.map((item, index) => (
                      <div key={item.id} className="item-editor-card">
                        <div className="item-editor-top">
                          <span className="item-index-badge">Posisi #{index + 1}</span>
                          <button
                            type="button"
                            className="btn-trash"
                            onClick={() => {
                              setContent((prev) => ({
                                ...prev,
                                experience: prev.experience.filter((ex) => ex.id !== item.id),
                              }))
                            }}
                            title="Hapus pengalaman ini"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="form-group-grid">
                          <div className="form-field">
                            <label className="field-label">Periode Kerja</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.period}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  experience: prev.experience.map((ex) => (ex.id === item.id ? { ...ex, period: val } : ex)),
                                }))
                              }}
                            />
                          </div>

                          <div className="form-field">
                            <label className="field-label">Jabatan / Role</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.role}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  experience: prev.experience.map((ex) => (ex.id === item.id ? { ...ex, role: val } : ex)),
                                }))
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-field">
                          <label className="field-label">Nama Perusahaan / Organisasi</label>
                          <input
                            type="text"
                            className="field-input"
                            value={item.company}
                            onChange={(e) => {
                              const val = e.target.value
                              setContent((prev) => ({
                                ...prev,
                                experience: prev.experience.map((ex) => (ex.id === item.id ? { ...ex, company: val } : ex)),
                              }))
                            }}
                          />
                        </div>

                        <div className="form-field">
                          <label className="field-label">Deskripsi Pekerjaan & Dampak</label>
                          <textarea
                            className="field-textarea"
                            rows={3}
                            value={item.description}
                            onChange={(e) => {
                              const val = e.target.value
                              setContent((prev) => ({
                                ...prev,
                                experience: prev.experience.map((ex) => (ex.id === item.id ? { ...ex, description: val } : ex)),
                              }))
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: KEAHLIAN */}
              {activeTab === 'keahlian' && (
                <div className="tab-pane">
                  <div className="pane-header-actions">
                    <div>
                      <h2 className="tab-pane-title">Keahlian Dikuasai & Tools</h2>
                      <p className="tab-pane-desc">Kelola kelompok instrumen keahlian dan perangkat pendukung.</p>
                    </div>
                    <button
                      type="button"
                      className="studio-btn studio-btn-primary"
                      onClick={() => {
                        const newSkill: SkillGroup = {
                          id: `skill-${Date.now()}`,
                          category: 'Kategori Keahlian Baru',
                          tools: ['Tools 1', 'Tools 2'],
                          description: 'Deskripsi penerapan keahlian ini dalam pekerjaan.',
                          order: content.skills.length + 1,
                        }
                        setContent((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }))
                      }}
                    >
                      <Plus size={14} />
                      <span>Tambah Kategori</span>
                    </button>
                  </div>

                  <div className="items-list-container">
                    {content.skills.map((item, index) => (
                      <div key={item.id} className="item-editor-card">
                        <div className="item-editor-top">
                          <span className="item-index-badge">Keahlian #{index + 1}</span>
                          <button
                            type="button"
                            className="btn-trash"
                            onClick={() => {
                              setContent((prev) => ({
                                ...prev,
                                skills: prev.skills.filter((s) => s.id !== item.id),
                              }))
                            }}
                            title="Hapus keahlian ini"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="form-field">
                          <label className="field-label">Nama Kategori Keahlian</label>
                          <input
                            type="text"
                            className="field-input"
                            value={item.category}
                            onChange={(e) => {
                              const val = e.target.value
                              setContent((prev) => ({
                                ...prev,
                                skills: prev.skills.map((s) => (s.id === item.id ? { ...s, category: val } : s)),
                              }))
                            }}
                          />
                        </div>

                        <div className="form-field">
                          <label className="field-label">Daftar Tools / Perangkat (Pisahkan dengan tanda koma)</label>
                          <input
                            type="text"
                            className="field-input"
                            value={item.tools.join(', ')}
                            onChange={(e) => {
                              const toolsArray = e.target.value
                                .split(',')
                                .map((t) => t.trim())
                                .filter(Boolean)
                              setContent((prev) => ({
                                ...prev,
                                skills: prev.skills.map((s) => (s.id === item.id ? { ...s, tools: toolsArray } : s)),
                              }))
                            }}
                          />
                        </div>

                        <div className="form-field">
                          <label className="field-label">Deskripsi Penerapan</label>
                          <textarea
                            className="field-textarea"
                            rows={2}
                            value={item.description || ''}
                            onChange={(e) => {
                              const val = e.target.value
                              setContent((prev) => ({
                                ...prev,
                                skills: prev.skills.map((s) => (s.id === item.id ? { ...s, description: val } : s)),
                              }))
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: BAHASA */}
              {activeTab === 'bahasa' && (
                <div className="tab-pane">
                  <div className="pane-header-actions">
                    <div>
                      <h2 className="tab-pane-title">Kemampuan Bahasa</h2>
                      <p className="tab-pane-desc">
                        Kelola bahasa aktif secara kualitatif. Dilarang menggunakan persentase atau progress bar.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="studio-btn studio-btn-primary"
                      onClick={() => {
                        const newLang: LanguageItem = {
                          id: `lang-${Date.now()}`,
                          language: 'Bahasa Baru',
                          proficiency: 'Profesional (Konteks Kerja)',
                          order: content.languages.length + 1,
                        }
                        setContent((prev) => ({ ...prev, languages: [...prev.languages, newLang] }))
                      }}
                    >
                      <Plus size={14} />
                      <span>Tambah Bahasa</span>
                    </button>
                  </div>

                  <div className="items-list-container">
                    {content.languages.map((item, index) => (
                      <div key={item.id} className="item-editor-card">
                        <div className="item-editor-top">
                          <span className="item-index-badge">Bahasa #{index + 1}</span>
                          <button
                            type="button"
                            className="btn-trash"
                            onClick={() => {
                              setContent((prev) => ({
                                ...prev,
                                languages: prev.languages.filter((l) => l.id !== item.id),
                              }))
                            }}
                            title="Hapus bahasa ini"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="form-group-grid">
                          <div className="form-field">
                            <label className="field-label">Nama Bahasa</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.language}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  languages: prev.languages.map((l) => (l.id === item.id ? { ...l, language: val } : l)),
                                }))
                              }}
                            />
                          </div>

                          <div className="form-field">
                            <label className="field-label">Tingkat Kemahiran Kualitatif</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.proficiency}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  languages: prev.languages.map((l) => (l.id === item.id ? { ...l, proficiency: val } : l)),
                                }))
                              }}
                              placeholder="Contoh: Fasih (Penutur Asli)"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: PRESTASI & SERTIFIKAT */}
              {activeTab === 'prestasi' && (
                <div className="tab-pane">
                  <h2 className="tab-pane-title">Penghargaan Bergengsi & Sertifikat Profesi</h2>
                  <p className="tab-pane-desc">Kelola pencapaian kompetisi dan lisensi resmi terverifikasi.</p>

                  {/* Sub: Penghargaan */}
                  <div className="pane-sub-section">
                    <div className="pane-header-actions">
                      <h3 className="sub-section-title">1. Penghargaan Bergengsi</h3>
                      <button
                        type="button"
                        className="studio-btn studio-btn-secondary"
                        onClick={() => {
                          const newAward: AwardItem = {
                            id: `award-${Date.now()}`,
                            year: '2025',
                            title: 'Nama Penghargaan / Juara',
                            institution: 'Penyelenggara / Universitas',
                            description: 'Deskripsi pencapaian.',
                            order: content.awards.length + 1,
                          }
                          setContent((prev) => ({ ...prev, awards: [...prev.awards, newAward] }))
                        }}
                      >
                        <Plus size={14} />
                        <span>Tambah Penghargaan</span>
                      </button>
                    </div>

                    <div className="items-list-container">
                      {content.awards.map((item, index) => (
                        <div key={item.id} className="item-editor-card">
                          <div className="item-editor-top">
                            <span className="item-index-badge">Penghargaan #{index + 1}</span>
                            <button
                              type="button"
                              className="btn-trash"
                              onClick={() => {
                                setContent((prev) => ({
                                  ...prev,
                                  awards: prev.awards.filter((a) => a.id !== item.id),
                                }))
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="form-group-grid">
                            <div className="form-field">
                              <label className="field-label">Tahun</label>
                              <input
                                type="text"
                                className="field-input"
                                value={item.year}
                                onChange={(e) => {
                                  const val = e.target.value
                                  setContent((prev) => ({
                                    ...prev,
                                    awards: prev.awards.map((a) => (a.id === item.id ? { ...a, year: val } : a)),
                                  }))
                                }}
                              />
                            </div>

                            <div className="form-field">
                              <label className="field-label">Instansi Penyelenggara</label>
                              <input
                                type="text"
                                className="field-input"
                                value={item.institution}
                                onChange={(e) => {
                                  const val = e.target.value
                                  setContent((prev) => ({
                                    ...prev,
                                    awards: prev.awards.map((a) => (a.id === item.id ? { ...a, institution: val } : a)),
                                  }))
                                }}
                              />
                            </div>
                          </div>

                          <div className="form-field">
                            <label className="field-label">Judul Penghargaan</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.title}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  awards: prev.awards.map((a) => (a.id === item.id ? { ...a, title: val } : a)),
                                }))
                              }}
                            />
                          </div>

                          <div className="form-field">
                            <label className="field-label">Keterangan Singkat</label>
                            <input
                              type="text"
                              className="field-input"
                              value={item.description || ''}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  awards: prev.awards.map((a) => (a.id === item.id ? { ...a, description: val } : a)),
                                }))
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sub: Sertifikat */}
                  <div className="pane-sub-section" style={{ marginTop: '32px' }}>
                    <div className="pane-header-actions">
                      <h3 className="sub-section-title">2. Sertifikasi Profesi Resmi</h3>
                      <button
                        type="button"
                        className="studio-btn studio-btn-primary"
                        onClick={() => {
                          const newCert: CertificateItem = {
                            id: `cert-${Date.now()}`,
                            title: 'Nama Sertifikasi Profesi Baru',
                            issuer: 'Badan / Institusi Penerbit',
                            year: '2025',
                            imageUrl: '/assets/certificates/certificate-1.png',
                            credentialUrl: 'https://',
                            order: content.certificates.length + 1,
                          }
                          setContent((prev) => ({ ...prev, certificates: [...prev.certificates, newCert] }))
                        }}
                      >
                        <Plus size={14} />
                        <span>Tambah Sertifikat</span>
                      </button>
                    </div>

                    <div className="items-list-container">
                      {content.certificates.map((cert, index) => (
                        <div key={cert.id} className="item-editor-card">
                          <div className="item-editor-top">
                            <span className="item-index-badge">Sertifikat #{index + 1}</span>
                            <button
                              type="button"
                              className="btn-trash"
                              onClick={() => {
                                setContent((prev) => ({
                                  ...prev,
                                  certificates: prev.certificates.filter((c) => c.id !== cert.id),
                                }))
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <ImageInputControl
                            label="Berkas Gambar Sertifikat"
                            value={cert.imageUrl}
                            onChange={(url) => {
                              setContent((prev) => ({
                                ...prev,
                                certificates: prev.certificates.map((c) => (c.id === cert.id ? { ...c, imageUrl: url } : c)),
                              }))
                            }}
                            onFileSelect={(file) => {
                              rawFilesRef.current[`cert-${cert.id}`] = file
                            }}
                          />

                          <div className="form-group-grid">
                            <div className="form-field">
                              <label className="field-label">Tahun Penerbitan</label>
                              <input
                                type="text"
                                className="field-input"
                                value={cert.year}
                                onChange={(e) => {
                                  const val = e.target.value
                                  setContent((prev) => ({
                                    ...prev,
                                    certificates: prev.certificates.map((c) => (c.id === cert.id ? { ...c, year: val } : c)),
                                  }))
                                }}
                              />
                            </div>

                            <div className="form-field">
                              <label className="field-label">Badan / Institusi Penerbit</label>
                              <input
                                type="text"
                                className="field-input"
                                value={cert.issuer}
                                onChange={(e) => {
                                  const val = e.target.value
                                  setContent((prev) => ({
                                    ...prev,
                                    certificates: prev.certificates.map((c) => (c.id === cert.id ? { ...c, issuer: val } : c)),
                                  }))
                                }}
                              />
                            </div>
                          </div>

                          <div className="form-field">
                            <label className="field-label">Judul Sertifikasi</label>
                            <input
                              type="text"
                              className="field-input"
                              value={cert.title}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  certificates: prev.certificates.map((c) => (c.id === cert.id ? { ...c, title: val } : c)),
                                }))
                              }}
                            />
                          </div>

                          <div className="form-field">
                            <label className="field-label">Tautan Verifikasi Kredensial (Opsional)</label>
                            <input
                              type="text"
                              className="field-input"
                              value={cert.credentialUrl || ''}
                              onChange={(e) => {
                                const val = e.target.value
                                setContent((prev) => ({
                                  ...prev,
                                  certificates: prev.certificates.map((c) => (c.id === cert.id ? { ...c, credentialUrl: val } : c)),
                                }))
                              }}
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: KONTAK & KOLABORASI */}
              {activeTab === 'kontak' && (
                <div className="tab-pane">
                  <h2 className="tab-pane-title">Kontak Cepat & Media Sosial</h2>
                  <p className="tab-pane-desc">Kelola saluran WhatsApp, email, dan akun media sosial resmi.</p>

                  <div className="form-card">
                    <div className="form-group-grid">
                      <div className="form-field">
                        <label className="field-label">Nomor WhatsApp Resmi</label>
                        <input
                          type="text"
                          className="field-input"
                          value={content.contact.whatsapp}
                          onChange={(e) => updateContact('whatsapp', e.target.value)}
                        />
                      </div>

                      <div className="form-field">
                        <label className="field-label">Alamat Email Resmi</label>
                        <input
                          type="email"
                          className="field-input"
                          value={content.contact.email}
                          onChange={(e) => updateContact('email', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="field-label">Domisili Kantor / Kerja</label>
                      <input
                        type="text"
                        className="field-input"
                        value={content.contact.location}
                        onChange={(e) => updateContact('location', e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label className="field-label">Catatan Ketersediaan Kolaborasi</label>
                      <textarea
                        className="field-textarea"
                        rows={2}
                        value={content.contact.note || ''}
                        onChange={(e) => updateContact('note', e.target.value)}
                      />
                    </div>
                  </div>

                  <h3 className="sub-section-title" style={{ marginTop: '28px' }}>Tautan Media Sosial</h3>
                  <div className="items-list-container">
                    {content.contact.socials.map((soc, idx) => (
                      <div key={soc.platform} className="item-editor-card">
                        <div className="form-group-grid">
                          <div className="form-field">
                            <label className="field-label">Platform ({soc.platform})</label>
                            <input
                              type="text"
                              className="field-input"
                              value={soc.label}
                              onChange={(e) => {
                                const val = e.target.value
                                const updated = [...content.contact.socials]
                                updated[idx].label = val
                                updateContact('socials', updated)
                              }}
                            />
                          </div>

                          <div className="form-field">
                            <label className="field-label">Tautan URL Profil</label>
                            <input
                              type="text"
                              className="field-input"
                              value={soc.url}
                              onChange={(e) => {
                                const val = e.target.value
                                const updated = [...content.contact.socials]
                                updated[idx].url = val
                                updateContact('socials', updated)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 10: TEMA, NAVBAR & FOOTER */}
              {activeTab === 'tampilan' && (
                <div className="tab-pane">
                  <h2 className="tab-pane-title">Pengaturan Tema, Navbar & Footer</h2>
                  <p className="tab-pane-desc">
                    Sesuaikan preferensi visual, teks footer, dan pilihan tampil foto navbar.
                  </p>

                  <div className="form-card">
                    <div className="form-group-grid">
                      <div className="form-field">
                        <label className="field-label">Mode Tema Tampilan</label>
                        <select
                          className="field-select"
                          value={config.theme}
                          onChange={(e) => {
                            const val = e.target.value as 'light' | 'dark'
                            setConfig((prev) => ({ ...prev, theme: val }))
                          }}
                        >
                          <option value="dark">Mode Gelap (Obsidian Grid - Default)</option>
                          <option value="light">Mode Terang (Swiss Paper)</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label className="field-label">Warna Aksen Swiss</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="color"
                            value={config.accentColor || '#FF3B1D'}
                            onChange={(e) => {
                              const val = e.target.value
                              setConfig((prev) => ({ ...prev, accentColor: val }))
                              document.documentElement.style.setProperty('--color-accent', val)
                            }}
                            style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer', background: 'none' }}
                          />
                          <input
                            type="text"
                            className="field-input"
                            value={config.accentColor || '#FF3B1D'}
                            onChange={(e) => {
                              const val = e.target.value
                              setConfig((prev) => ({ ...prev, accentColor: val }))
                              document.documentElement.style.setProperty('--color-accent', val)
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-field" style={{ marginTop: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={config.showNavbarPhoto ?? true}
                          onChange={(e) => setConfig((prev) => ({ ...prev, showNavbarPhoto: e.target.checked }))}
                        />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          Tampilkan Avatar Foto Profil pada Navbar Atas
                        </span>
                      </label>
                    </div>

                    <div className="form-field" style={{ marginTop: '16px' }}>
                      <label className="field-label">Ringkasan Profil Singkat Footer</label>
                      <textarea
                        className="field-textarea"
                        rows={2}
                        value={content.footerSummary || ''}
                        onChange={(e) => setContent((prev) => ({ ...prev, footerSummary: e.target.value }))}
                        placeholder="Contoh: Fokus pada strategi komunikasi korporat, manajemen reputasi krisis, dan pengembangan kampanye digital berbasis riset data."
                      />
                    </div>

                    <div className="form-field" style={{ marginTop: '16px' }}>
                      <label className="field-label">Teks Hak Cipta Footer</label>
                      <input
                        type="text"
                        className="field-input"
                        value={content.footerCopyright || ''}
                        onChange={(e) => setContent((prev) => ({ ...prev, footerCopyright: e.target.value }))}
                        placeholder="Contoh: © 2026 SALMA KHAIRUNISA. Seluruh Hak Cipta Dilindungi."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* PANE PRATINJAU REALTIME (TAMPIL DI 'split' & 'preview') */}
        {viewMode !== 'editor' && (
          <main className="studio-preview-pane">
            <div className={`preview-viewport-wrapper device-${deviceMode}`}>
              <div className="preview-viewport-container">
                <PortfolioRenderer
                  content={content}
                  config={config}
                  theme={config.theme}
                  onToggleTheme={() => {
                    setConfig((prev) => ({
                      ...prev,
                      theme: prev.theme === 'light' ? 'dark' : 'light',
                    }))
                  }}
                  disableNavbar={true}
                />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}
export default StudioPage
