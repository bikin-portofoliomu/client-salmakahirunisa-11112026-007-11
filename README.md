template-portofolio11
Nama: Neue Grid Vanguard
Deskripsi Singkat Tema: Template portofolio interaktif dan editorial premium beraliran Swiss / International Typographic Style dengan sentuhan kinetic typography berkecepatan tinggi, komposisi editorial asimetris, grid presisi matematika, breathing room luas, dan aksen menyala Swiss Signal Vermilion yang profesional, berwibawa, dan elegan.
4 Kata Tentang Template:
Swiss-Minimalis
Presisi
Editorial
Kinetik

---

## Ringkasan Proyek
- **Brand Penyedia:** bikin.portofoliomu
- **Edisi Template:** Neue Grid Vanguard
- **Referensi Desain:** Swiss / International Typographic Style, Kinetic Typography, Minimalist UI, Editorial Composition
- **Aksen Utama:** Swiss Signal Vermilion (`#FF2A00`) dengan sistem Maximized Accent
- **Tech Stack:** React 19, TypeScript, Vite 8, React Compiler
- **Motion & Interaktivitas:** Lenis Smooth Scroll, GSAP ScrollTrigger, Motion for React, Canvas Confetti
- **Arsitektur:** Pemisahan mutlak 4 pilar (Content, Template, Theme, Motion)
- **Dua Jalur Akses:**
  - Halaman Publik: `/` (`index.html`)
  - Studio Admin Tersembunyi: `/buat-template` (`buat-template.html`)

---

## Fitur Utama & 12 Urutan Section Kanonikal

1. **Header / Navbar:** Brand mark inisial, thumbnail profil opsional, status ticker, tautan navigasi halus, dan tombol dual-mode (Light/Dark).
2. **Hero:** Salam pembuka, tipografi kinetik nama besar, subline profesi & domisili, kutipan profesional, tombol CTA solid & outline, baris kartu metrik 3 pilar (Sertifikat, Umur, Keahlian), dan ticker Instagram.
3. **01 / Tentang Saya:** Bingkai foto editorial asimetris, narasi biografi komprehensif, info tanggal lahir, dan tombol direct chat WhatsApp.
4. **02 / Galeri Saya:** Grid foto 6 slot dengan rasio proporsional, border aksen vermilion, dan pratinjau Lightbox layar penuh.
5. **03 / Pendidikan:** Kartu capaian akademik berurutan (`TAHUN * INSTANSI * JURUSAN`).
6. **04 / Pengalaman Profesional:** Linimasa riwayat karier asimetris dengan rincian pencapaian konkret.
7. **05 / Keahlian Dikuasai:** Pengelompokan kompetensi dan daftar software/tools terstruktur.
8. **06 / Kemampuan Bahasa:** Kartu tingkat kefasihan bahasa penutur asli dan profesional.
9. **07 / Penghargaan & Sertifikat:** Catatan prestasi dan galeri sertifikat kredensial dengan modal zoom.
10. **Quick Contact Bar:** Tombol aksi kilat WhatsApp & Email, metadata domisili, dan tautan sosial media.
11. **Kolaborasi / Final CTA:** Formulir kontak interaktif terintegrasi untuk pengiriman pesan instan.
12. **Footer:** Navigasi eksplorasi, informasi kontak, tautan sosial, dan hak cipta resmi bikin.portofoliomu.

---

## Teknologi & Dependensi

- **Core:** [React 19](https://react.dev/) + [React Compiler](https://react.dev/learn/react-compiler)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite 8](https://vite.dev/)
- **Styling:** Vanilla CSS Modular dengan CSS Custom Properties (`src/styles/swiss-theme.css`)
- **Animasi:**
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth Momentum Scroll)
  - [GSAP 3](https://gsap.com/) & ScrollTrigger
  - [Motion for React](https://motion.dev/) (Kinetic Typography & Layout Transitions)
  - [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Ikon:** [Lucide React](https://lucide.dev/)

---

## Memulai (Getting Started)

### Prasyarat
- Node.js (versi 18 ke atas)
- npm / pnpm / yarn

### Instalasi Dependensi
```bash
npm install
```

### Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Buka browser pada:
- Portofolio Publik: `http://localhost:5173/`
- Studio Admin Privat: `http://localhost:5173/buat-template` atau `http://localhost:5173/buat-template.html`

### Membangun untuk Produksi
```bash
npm run build
```

---

## Struktur Proyek

```text
template-portofolio11/
├── AGENTS.md                  # Panduan agen, Protokol Aturan 0, & Delivery Gate
├── PRD.md                     # Product Requirements Document
├── SKILL.md                   # Cetak biru rekayasa teknis & skema kanonikal
├── README.md                  # Dokumentasi resmi repositori
├── data-form-yang-ada.txt     # Data asli pelanggan (Ahmad Furguso)
├── urutan-yang-benar.txt      # Urutan kanonikal 12 section
├── docs/
│   └── data-model-mapping.md  # Pemetaan data form ke antarmuka kode
├── public/
│   ├── assets/                # Gambar profil, galeri, sertifikat
│   └── favicon.svg            # Favicon kustom monogram Swiss
├── src/
│   ├── components/
│   │   ├── layout/            # Navbar, Footer
│   │   ├── sections/          # 12 Komponen section kanonikal
│   │   └── ui/                # Lightbox, Modal, Button, Badge
│   ├── data/
│   │   └── default-portfolio.ts # Data awal Ahmad Furguso
│   ├── styles/
│   │   ├── swiss-theme.css    # Token CSS Swiss Paper & Obsidian Grid
│   │   └── swiss-grid.css     # Sistem grid matematika 12-kolom
│   ├── types/
│   │   └── content.ts         # Definisi tipe domain kanonikal
│   ├── App.tsx                # Komponen root & orkestrasi scroll
│   └── main.tsx               # Titik masuk aplikasi
└── vite.config.ts             # Konfigurasi Vite & API upload gambar
```

---

## Lisensi & Kredit

Dibuat dan dikembangkan secara resmi oleh **Tim bikin.portofoliomu**.  
Seluruh hak cipta dilindungi undang-undang.
