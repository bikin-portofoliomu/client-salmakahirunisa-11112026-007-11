# SKILL.md: Spesifikasi Rekayasa Teknis template-portofolio11
## Arsitektur Swiss Kinetic Minimalist | bikin.portofoliomu

> [!IMPORTANT]
> **DOKUMENTASI WAJIB:**
> Baca dan ikuti [`PRD.md`](./PRD.md), [`AGENTS.md`](./AGENTS.md) (khususnya Aturan 0 Protokol Konfirmasi Per-Section),
> [`docs/data-model-mapping.md`](./docs/data-model-mapping.md), serta data sumber [`data-form-yang-ada.txt`](./data-form-yang-ada.txt)
> dan [`urutan-yang-benar.txt`](./urutan-yang-benar.txt).

---

## 1. Identitas Sistem & Prinsip Teknis

Skill ini adalah cetak biru teknis bagi AI coding agent dan engineer dalam merekayasa **template-portofolio11** (nama edisi: **Neue Grid Vanguard**) di bawah naungan brand **bikin.portofoliomu**, berbasis **React 19 + TypeScript + Vite + React Compiler**.

### Prinsip Pokok:
1. **Pemisahan Mutlak 4 Pilar:** Konten (`PortfolioContent`) terisolasi dari Presentasi (`Sections`), Tema (`CSS Custom Properties`), dan Orkestrasi Gerak (`Motion`).
2. **Estetika Swiss Minimalist & Kinetic Typography:** Grid 12-kolom modular, asimetri fungsional, dan tipografi bold yang hidup melalui animasi terukur.
3. **Maximized Accent Color System:** Menempatkan **Swiss Signal Vermilion (`#FF2A00`)** sebagai pemicu visual berenergi tinggi pada seluruh tombol CTA, highlight kinetik, penomoran section raksasa, dan border interaktif.
4. **Dua Rute Terpisah:** `/` (Portofolio Publik) dan `/buat-template` (Studio Admin Tersembunyi).
5. **Kepatuhan Anti-Slop:** Nol karakter em dash (`—`), kontras WCAG AA, nol statistik palsu, dan seluruh tombol interaktif memiliki aksi nyata.

---

## 2. Skema Data Kanonikal (`src/types/content.ts`)

```typescript
export interface PersonalInfo {
  name: string
  role: string
  location: string
  quote: string
  avatarUrl: string
  whatsapp: string
  email: string
  birthDate: string
  bioSummary: string
  statusText?: string
}

export interface MetricHighlights {
  totalCertificates: number
  birthDateForAge: string
  totalSkillsCount: number
  instagramFollowers?: string
}

export interface GalleryItem {
  id: string
  title: string
  imageUrl: string
  category?: string
  description?: string
  order?: number
}

export interface EducationItem {
  id: string
  period: string
  institution: string
  major?: string
  degree?: string
  order?: number
}

export interface ExperienceItem {
  id: string
  period: string
  role: string
  company: string
  description: string
  achievements?: string[]
  order?: number
}

export interface SkillGroup {
  id: string
  category: string
  tools: string[]
  description?: string
  order?: number
}

export interface LanguageItem {
  id: string
  language: string
  proficiency: string
  order?: number
}

export interface AwardItem {
  id: string
  year: string
  title: string
  institution: string
  description?: string
  order?: number
}

export interface CertificateItem {
  id: string
  title: string
  issuer: string
  year: string
  imageUrl: string
  credentialUrl?: string
  order?: number
}

export interface SocialLink {
  platform: 'linkedin' | 'instagram' | 'tiktok' | 'facebook' | 'github' | 'twitter' | 'other'
  url: string
  label: string
  handle?: string
}

export interface ContactInfo {
  whatsapp: string
  email: string
  location: string
  socials: SocialLink[]
  note?: string
}

export interface PortfolioContent {
  personal: PersonalInfo
  metrics: MetricHighlights
  gallery: GalleryItem[]
  galleryDescription?: string
  education: EducationItem[]
  experience: ExperienceItem[]
  skills: SkillGroup[]
  languages: LanguageItem[]
  awards: AwardItem[]
  certificates: CertificateItem[]
  contact: ContactInfo
  footerCopyright?: string
}

export interface TemplateConfig {
  theme: 'light' | 'dark'
  accentColor: string
  accentColorGlow: string
  showNavbarPhoto?: boolean
  showGalleryDescription?: boolean
}
```

---

## 3. Sistem Desain & Token Tema Swiss (`src/styles/swiss-theme.css`)

### 3.1 Variabel CSS Custom Properties

```css
:root {
  /* Tipografi */
  --font-display: 'Syne', 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, sans-serif;
  --font-mono: 'Space Mono', monospace;

  /* Grid & Spacing */
  --container-max: 1360px;
  --grid-gap: 24px;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-pill: 9999px;

  /* Durasi Transisi */
  --ease-swiss: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 180ms;
  --duration-normal: 320ms;
  --duration-slow: 600ms;
}

/* Mode Terang (Swiss Paper - Default) */
[data-theme='light'], :root:not([data-theme='dark']) {
  --color-bg: #FBFBFB;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F3F4F6;
  --color-border: #E5E7EB;
  --color-border-strong: #111827;

  --color-text-primary: #0A0A0C;
  --color-text-secondary: #4B5563;
  --color-text-muted: #6B7280;

  /* Maximized Accent: Swiss Signal Vermilion */
  --color-accent: #FF2A00;
  --color-accent-hover: #E02500;
  --color-accent-glow: rgba(255, 42, 0, 0.25);
  --color-accent-contrast: #FFFFFF;
  --color-accent-subtle: rgba(255, 42, 0, 0.08);

  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-accent: 0 8px 24px rgba(255, 42, 0, 0.25);
}

/* Mode Gelap (Obsidian Grid - Toggle) */
[data-theme='dark'] {
  --color-bg: #08080A;
  --color-surface: #111215;
  --color-surface-subtle: #18191E;
  --color-border: #1E2026;
  --color-border-strong: #F4F4F6;

  --color-text-primary: #F8F9FA;
  --color-text-secondary: #9CA3AF;
  --color-text-muted: #6B7280;

  /* Maximized Accent: Electric Vermilion Glow */
  --color-accent: #FF4015;
  --color-accent-hover: #FF5A36;
  --color-accent-glow: rgba(255, 64, 21, 0.35);
  --color-accent-contrast: #FFFFFF;
  --color-accent-subtle: rgba(255, 64, 21, 0.12);

  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-accent: 0 8px 28px rgba(255, 64, 21, 0.35);
}
```

---

## 4. Orkestrasi Animasi (Lenis + GSAP + Motion for React)

### 4.1 Prinsip Orkestrasi
1. **Lenis Smooth Scroll:** Terpasang di root aplikasi (`src/App.tsx`) dan disinkronkan ke ticker GSAP:
   ```typescript
   lenis.on('scroll', ScrollTrigger.update)
   gsap.ticker.add((time) => lenis.raf(time * 1000))
   gsap.ticker.lagSmoothing(0)
   ```
2. **Motion for React (`motion/react`):** Digunakan untuk kinetic typography per kata/karakter di Hero, hover gestures, dan state layout dinamis.
3. **GSAP ScrollTrigger Scope:** Setiap section yang memanfaatkan ScrollTrigger wajib dibungkus dalam `gsap.context()` dengan cleanup function saat komponen dilepas.
4. **Prefers-Reduced-Motion:** Jika media query `prefers-reduced-motion: reduce` aktif, Lenis dinonaktifkan dan seluruh transisi menggunakan fallback durasi instan.

---

## 5. Spesifikasi Studio Admin (`/buat-template`)

### 5.1 Fungsionalitas Inti
- **Sistem Tab Terstruktur:**
  - Tab 1: Informasi Personal & Hero (Nama, Foto Profil, Role, Quote, WhatsApp, Email, Tanggal Lahir).
  - Tab 2: Metrik & Instagram (Total Sertifikat, Umur Otomatis, Total Keahlian, Followers IG).
  - Tab 3: Galeri Karya (Upload multi-foto 6 slot, judul, kategori, deskripsi).
  - Tab 4: Pendidikan (Repeatable list: Tahun, Instansi, Jurusan).
  - Tab 5: Pengalaman Profesional (Repeatable list: Tahun, Jabatan, Perusahaan, Deskripsi).
  - Tab 6: Keahlian & Bahasa (Repeatable list: Kategori keahlian, tools, bahasa & tingkat fasih).
  - Tab 7: Sertifikat & Penghargaan (Upload foto sertifikat, judul, penerbit, penghargaan).
  - Tab 8: Kontak & Tautan Sosial (Media sosial, domisili, template pesan WhatsApp).
  - Tab 9: Konfigurasi Tema (Pilihan default Light/Dark, preset aksen warna, toggle elemen visual).
- **Auto-Save Lokal:** Data tersimpan otomatis ke `localStorage` dengan debounce 300ms.
- **Upload Gambar Lokal:** Terhubung ke server plugin Vite `/api/upload` yang menyimpan berkas ke `public/assets/<folder>/`.
- **Ekspor & Reset:** Tombol *"Unduh Data JSON"* untuk backup serta *"Reset ke Data Awal"* untuk mengembalikan profil Ahmad Furguso.
