# Product Requirements Document (PRD)
## template-portofolio11: Neue Grid Vanguard | bikin.portofoliomu

**Versi:** 1.0.0 | **Tanggal:** 25 September 2026 | **Status:** Disetujui untuk Arsitektur Fondasi  
**Brand Penyedia:** bikin.portofoliomu  
**Sifat Dokumen:** Single Source of Truth bagi AI coding agent dan tim pengembang di repositori ini.

> [!IMPORTANT]
> **DOKUMENTASI TERKAIT:**
> 1. [`AGENTS.md`](./AGENTS.md): Aturan Kerja, Protokol Konfirmasi Per-Section, dan Anti-Slop Gate.
> 2. [`SKILL.md`](./SKILL.md): Spesifikasi Rekayasa Teknis, Kontrak Data, dan Panduan Motion.
> 3. [`docs/data-model-mapping.md`](./docs/data-model-mapping.md): Pemetaan Data Form Pelanggan ke Skema Kode.
> 4. [`data-form-yang-ada.txt`](./data-form-yang-ada.txt): Sumber Kebenaran Data Pengguna Asli (Ahmad Furguso).
> 5. [`urutan-yang-benar.txt`](./urutan-yang-benar.txt): Sumber Kebenaran Urutan Tampilan 12 Section.

---

## 1. Product Overview

**template-portofolio11** (nama edisi: **Neue Grid Vanguard**) adalah template website portofolio interaktif dan editorial premium berbasis **React 19 + TypeScript + Vite + React Compiler**, dikembangkan secara resmi oleh platform **bikin.portofoliomu**.

### 1.1 Referensi Gaya & Rekayasa Desain
Website ini dibangun berlandaskan sintesis prinsip desain modern tingkat tinggi:
- **Minimalist UI:** Mengeliminasi ornamen artifisial, gradien pelangi, dan kartu bento generik. Setiap elemen memiliki tujuan fungsional dan hierarki yang tegas.
- **Swiss / International Typographic Style:** Mengadopsi prinsip desain Swiss (Josef Müller-Brockmann, Wim Crouwel, Max Bill): grid matematika 12-kolom yang ketat, asimetri terencana, ritme vertikal-horizontal yang presisi, dan penomoran section modular (`01 /`, `02 /`, dst.).
- **Kinetic Typography:** Tipografi diposisikan sebagai interface aktif. Karakter dan kata bergerak secara terarah melalui staggered reveal, sapuan garis aksen dinamis, dan efek kinetik saat scroll.
- **Editorial Composition:** Tata letak berkelas editorial majalah seni independen dengan breathing room luas (generous whitespace), pembagian kolom asimetris, dan kutipan berkarakter kuat.
- **Maximized Accent Color System:** Latar belakang monokromatik kontras tinggi dikatalisasi oleh warna aksen tunggal bervoltase tinggi: **Swiss Signal Vermilion (`#FF2A00`)**, yang diterapkan secara tegas pada tombol CTA, highlight kinetik, nomor indeks, border aktif, dan pulse status.

### 1.2 Dual-Mode Palette
- **Mode Terang (Swiss Paper - Default):** Latar belakang kertas arsitektur `#FBFBFB`, teks hitam pekat `#0A0A0B`, border hairline `#E5E7EB`, dan aksen menyala `#FF2A00`.
- **Mode Gelap (Obsidian Grid - Toggle):** Latar belakang obsidian dalam `#08080A`, teks putih bersih `#F8F9FA`, border halus `#1E1F24`, dan aksen elektrik `#FF4015` dengan ambient glow lembut.

### 1.3 Target Pengguna
Template ini berkarakter **umum (general)**: fleksibel untuk menampilkan profil profesional komunikasi, public relations, kreator konten, desainer, developer, konsultan strategi, hingga eksekutif. Profil default yang diintegrasikan adalah **Ahmad Furguso (Corporate Communication Specialist)**.

---

## 2. Pemisahan Empat Pilar Arsitektur

Repo ini menganut pemisahan mutlak (*strict separation of concerns*):
1. **Content (`PortfolioContent`):** Data murni portofolio pengguna tanpa polusi kelas CSS atau atribut tampilan visual.
2. **Template (`TemplateRenderer` & Sections):** Komponen presentasi dan layout modular yang merender data secara aman.
3. **Theme (`ThemeTokens`):** Variabel CSS custom properties yang mengatur warna, tipografi, dan grid spacing untuk mode terang dan gelap.
4. **Motion (`MotionEngine`):** Orkestrasi terpusat (Lenis Smooth Scroll + GSAP ScrollTrigger + Motion for React) yang aman lifecycle dan mematuhi aksesibilitas `prefers-reduced-motion`.

---

## 3. Jalur Akses Aplikasi

1. **Portofolio Publik (`/` / `index.html`):**
   - Menampilkan website portofolio siap pakai bagi klien, perekrut, dan publik.
   - Bebas dari kontrol pengeditan admin.
2. **Studio Admin Internal (`/buat-template` / `buat-template.html`):**
   - Panel tersembunyi yang digunakan oleh tim internal **bikin.portofoliomu** untuk menginput data formulir pelanggan, mengunggah foto profil, galeri, dan sertifikat, serta menyesuaikan preset aksen warna.
   - **TIDAK ADA LINK MAUPUN TOMBOL** menuju `/buat-template` dari halaman publik.

---

## 4. Goals & Key Performance Indicators (KPIs)

| Metrik | Target | Metode Pengukuran |
|---|---|---|
| Stabilitas Frame Rate | 60 FPS stabil pada desktop & mobile | Chrome DevTools Performance Audit |
| Kecepatan Muat (LCP) | < 1.5 detik pada koneksi 4G standar | Lighthouse Performance Score >= 95 |
| Aksesibilitas | WCAG 2.2 Level AA di kedua mode (Light & Dark) | Lighthouse Accessibility >= 98 |
| Retensi Data Studio | 100% tersimpan aman via `localStorage` (debounced 300ms) | Uji auto-save & reload browser |
| Kepatuhan Struktur | 100% urutan mengikuti `urutan-yang-benar.txt` | Verifikasi checklist visual 12 section |
| Anti-Slop Integrity | Bebas karakter em dash (`—`), bebas klaim palsu, tombol 100% aktif | Anti-Slop Delivery Gate report |

---

## 5. Rincian Alur & Struktur 12 Section (Kanonikal)

Berdasarkan berkas kebenaran `urutan-yang-benar.txt`, halaman portofolio wajib dirender dengan susunan berikut:

### Section 0: Header & Navigation
- **NP ID:** Monogram inisial / brand mark (`AF` atau `AHMAD FURGUSO`) dengan tipografi bold modern.
- **PP (Opsional):** Thumbnail foto profil lingkaran/kotak di bilah navbar.
- **Teksline Pengguna:** Status ticker berjalan atau teksline statis (`Tersedia untuk Komunikasi Korporat & Kampanye Digital`).
- **Nav Links:** Tautan navigasi bergulir halus: `BERANDA`, `TENTANG`, `GALERI`, `PENGALAMAN`, `KEAHLIAN`, `KONTAK`.
- **Theme Toggle:** Tombol pengalih mode terang (Swiss Paper) dan mode gelap (Obsidian Grid).

### Section 1: Hero
- **Greeting Label:** `HAI, SAYA` (Monospace uppercase badge beraksen `[00 / INTRO]`).
- **Headline Nama Besar:** `AHMAD FURGUSO` (Tipografi raksasa kinetik dengan animasi word/character stagger).
- **Subline:** `Corporate Communication Specialist * D.I. Yogyakarta * Indonesia` dengan separator titik matematika.
- **Blockquote:** Kutipan profesional berbobot: *"Komunikasi yang efektif bukan sekadar menyampaikan pesan, melainkan membangun pemahaman dan koneksi yang bermakna."*
- **Primary CTAs:** Dua tombol interaktif: `LIHAT GALERI` (tombol outline presisi) & `HUBUNGI SAYA` (tombol solid Swiss Vermilion dengan efek magnetik).
- **Highlight Metric Bar:** 3 kartu hitungan metrik bernuansa aksen:
  1. `TOTAL SERTIFIKAT` (mis. 6 Kredensial)
  2. `UMUR SAAT INI` (Dihitung dinamis dari tanggal lahir 14/05/2003: 23 Tahun)
  3. `KEAHLIAN DIKUASAI` (6 Kategori Kompetensi)
- **Social Proof Ticker:** Ticker interaktif status `FOLLOWERS INSTAGRAM` (@ahmadfurguso).

### Section 2: Tentang Saya (About)
- **Section Index & Title:** `01 / TENTANG SAYA`
- **PP Frame:** Foto profil editorial dengan bingkai asimetris bersih dan badge metadata.
- **Deskripsi:** Narasi komprehensif profil lulusan Manajemen Komunikasi UGM, keahlian strategi komunikasi korporat, brand storytelling, dan manajemen krisis.
- **Detail & Action:** Tanggal lahir (14 Mei 2003) dan tombol aksi cepat `HUBUNGI WA (081234567890)` yang membuka obrolan WhatsApp secara langsung.

### Section 3: Galeri Saya (Gallery)
- **Section Index & Title:** `02 / GALERI SAYA`
- **Editorial Photo Grid:** 6 foto dokumentasi profesional dalam formasi grid 2 baris (3 kolom baris 1, 3 kolom baris 2) dengan hover zoom halus, border highlight `#FF2A00`, dan modal Lightbox resolusi penuh saat diklik.
- **Deskripsi Galeri:** Keterangan editorial ringkas mengenai dokumentasi kampanye, peluncuran produk, dan media relations.

### Section 4: Pendidikan (Education)
- **Section Index & Title:** `03 / PENDIDIKAN`
- **Format Dossier List:** `TAHUN * INSTANSI * JURUSAN`
  1. 2021-2025: Universitas Gadjah Mada (Jurusan Manajemen Komunikasi)
  2. 2018-2021: SMAN 3 Yogyakarta (Jurusan IPS)
  3. 2015-2018: SMPN 5 Yogyakarta
  4. 2009-2015: SDN Percobaan 2 Yogyakarta

### Section 5: Pengalaman Profesional (Experience)
- **Section Index & Title:** `04 / PENGALAMAN PROFESIONAL`
- **Timeline Asimetris:** Kartu riwayat karier berulang dengan tata letak Swiss:
  1. `2025-2026` | `Junior Corporate Communication Officer` | PT Wijaya Mega Perkasa
     - Tanggung jawab: Pengelolaan komunikasi internal, penyusunan buletin korporat, dan manajemen krisis reputasi.
  2. `2024-2025` | `Digital Campaign Associate` | Agensi Kreatif Ruang Ide
     - Tanggung jawab: Strategi kampanye digital multi-channel, editorial plan, dan kolaborasi influencer (peningkatan engagement 35%).
  3. `2023-2024` | `Public Relations Intern` | PT Narasi Citra Mandiri
     - Tanggung jawab: Penyusunan siaran pers mingguan, koordinasi media relations, dan monitoring sentimen liputan publik.

### Section 6: Keahlian Dikuasai (Skills)
- **Section Index & Title:** `05 / KEAHLIAN DIKUASAI`
- **Struktur Kartu:** `JENIS KEAHLIAN` + `DESKRIPSI / TOOLS`
  1. Public Speaking & Media Handling (Media briefing, press conference, interview guidance)
  2. Strategic Communication Planning (Campaign roadmap, audience targeting, brand narrative)
  3. Copywriting & Press Release Writing (Siaran pers korporat, editorial plan, artikel opini)
  4. Desain Grafis (Canva, Adobe Photoshop, Adobe Illustrator)
  5. Social Media Analytics (Meta Business Suite, Google Analytics, Hootsuite)
  6. Manajemen Proyek Kolaborasi (Notion, Trello, Asana)

### Section 7: Kemampuan Bahasa (Languages)
- **Section Index & Title:** `06 / KEMAMPUAN BAHASA`
- **Daftar Kompetensi:**
  1. Indonesia (Fasih - Penutur Asli)
  2. Inggris (Profesional - Komunikasi Bisnis & Presentasi)
  3. Jawa (Aktif - Percakapan Sehari-hari)

### Section 8: Penghargaan & Sertifikat (Awards & Certificates)
- **Section Index & Title:** `07 / PENGHARGAAN & SERTIFIKAT`
- **Penghargaan:** Format `TAHUN * DESKRIPSI PENGHARGAAN * INSTANSI`.
- **Galeri Sertifikat:** Tampilan kartu kredensial visual dengan fitur Lightbox zoom dan badge verifikasi.

### Section 9: Quick Contact & Direct Action Bar
- **Tombol Aksi Cepat:**
  - `KIRIM VIA WA` (Membuka percakapan WhatsApp instan dengan template pesan).
  - `KIRIM VIA EMAIL` (`mailto:ahmad.furguso@email.com` dengan subjek otomatis).
- **Metadata Kontak:** Nomor WhatsApp, Alamat Email, Domisili (D.I. Yogyakarta, Indonesia).
- **Tautan Aplikasi Sosial:** Tautan langsung ke LinkedIn, Instagram, dan TikTok.

### Section 10: Kolaborasi (Call to Action)
- **Headline Utama:** `MARI BERKOLABORASI BERSAMA` (Tipografi display raksasa dengan aksen visual).
- **Formulir Pesan Langsung:** Input Nama, Alamat Email, dan Isi Pesan. Tombol kirim terintegrasi untuk meneruskan pesan ke WhatsApp atau membuka aplikasi email klien secara otomatis.

### Section 11: Footer
- **Eksplorasi Navigasi:** Tautan section: `TENTANG`, `GALERI`, `PENGALAMAN`, `KEAHLIAN`, `SERTIFIKAT`, `KONTAK`.
- **Kontak & Lokasi:** Domisili, Email, WhatsApp.
- **Tautan Media Sosial:** LinkedIn, Instagram, TikTok.
- **Copyright Statement:**
  `© 2026 Ahmad Furguso. Seluruh Hak Cipta Dilindungi. DIBUAT DAN DIKEMBANGKAN OLEH bikin.portofoliomu`

---

## 6. Persyaratan Teknis & Dependensi

### Stack Utama
- **Runtime:** React 19 (`^19.2.8`)
- **Bahasa:** TypeScript (`~6.0.2`)
- **Build Tool:** Vite 8 (`^8.3.0`)
- **Optimization:** `babel-plugin-react-compiler` (`^1.0.0`)
- **Styling:** Vanilla CSS modular (`src/styles/swiss-theme.css`, `src/styles/swiss-grid.css`) untuk kontrol presisi tanpa batasan utilitas.

### Pustaka Pendukung Resmi
- `motion`: Animasi gestur deklaratif, transisi tata letak, dan kinetic text reveal.
- `gsap` + `ScrollTrigger`: Orkestrasi timeline scroll hero dan pin interaktif.
- `lenis`: Smooth momentum scrolling dengan sinkronisasi ke GSAP ticker.
- `lucide-react`: Ikon antarmuka presisi garis tipis (stroke width 1.5px).
- `canvas-confetti`: Efek mikro-interaksi saat pengiriman pesan berhasil.

---

## 7. Aturan Aksesibilitas & Anti-Slop (Mandatory)

1. **Aturan Em Dash (R-02):** DILARANG menggunakan karakter em dash (`—`) pada seluruh teks antarmuka dan salinan dokumen. Gunakan koma, titik dua, tanda hubung biasa (`-`), atau kurung.
2. **Kontras Warna WCAG AA (R-25):** Rasio kontras teks terhadap latar belakang minimal 4.5:1 untuk teks standar dan 3:1 untuk teks display besar di kedua mode (Light & Dark).
3. **Navigasi Keyboard Penuh (R-32):** Seluruh tautan, tombol, dan input form wajib dapat diakses dengan `Tab` / `Shift+Tab` serta memiliki outline fokus kontras tinggi yang terlihat jelas (`outline: 2px solid #FF2A00`).
4. **Respon Sentuh Minimum (R-03):** Seluruh elemen interaktif memiliki tap target minimal 44x44px di perangkat mobile.
5. **Dukungan Prefers-Reduced-Motion:** Transisi berat, distorsi kinetik, dan parallax otomatis dimatikan saat pengguna mengaktifkan preferensi reduced motion di sistem operasi mereka.
