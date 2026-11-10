# AGENTS.md: Panduan & Standar Rekayasa template-portofolio11
## Brand: bikin.portofoliomu | Tema: Neue Grid Vanguard (Swiss Kinetic Minimalist)

> [!IMPORTANT]
> **DOKUMENTASI WAJIB DIBACA SEBELUM MENYENTUH KODE:**
> 1. [`PRD.md`](./PRD.md): *Product Requirements Document (Single Source of Truth).*
> 2. [`SKILL.md`](./SKILL.md): *Spesifikasi Rekayasa Teknis, Kontrak Data, dan Panduan Animasi.*
> 3. [`docs/data-model-mapping.md`](./docs/data-model-mapping.md): *Pemetaan Field Form Pelanggan ke Skema Kode.*
> 4. [`data-form-yang-ada.txt`](./data-form-yang-ada.txt): *Data Konten Pelanggan Asli (Ahmad Furguso).*
> 5. [`urutan-yang-benar.txt`](./urutan-yang-benar.txt): *Urutan Tampilan Wajib 12 Section.*

---

## 0. PROTOKOL WAJIB: SATU SECTION, KONFIRMASI, BARU LANJUT

> [!CAUTION]
> **ATURAN TERTINGGI: TIDAK BOLEH DILANGGAR ATAU DILEWATI DALAM KONDISI APA PUN.**

1. Agen HANYA BOLEH mengimplementasikan **satu section dalam satu giliran pengerjaan** (misalnya Navbar, lalu berhenti; kemudian Hero, lalu berhenti; kemudian Tentang Saya, lalu berhenti; dan seterusnya). Dilarang keras menggabungkan beberapa section dalam satu langkah tanpa izin pengguna.
2. Setiap kali satu section selesai dibangun atau direvisi, agen WAJIB:
   - Menjelaskan komponen yang dibuat, dependensi data yang dihubungkan, dan animasi yang dipasang.
   - Melaporkan status pengujian interaktif (hover, click, responsivitas).
   - **Berhenti dan menunggu konfirmasi eksplisit dari pengguna** (mis. *"Lanjut"*, *"Oke"*, atau catatan revisi) sebelum menyentuh section berikutnya.
3. Keheningan atau ketiadaan pesan dari pengguna TIDAK BOLEH dianggap sebagai persetujuan untuk melanjutkan.
4. Jika pengguna memberikan kritik atau revisi pada section yang baru dibuat, selesaikan revisi tersebut hingga tuntas dan minta konfirmasi ulang. Jangan pernah beralih ke section baru sementara revisi sebelumnya belum disetujui.
5. Urutan pengerjaan wajib mengikuti [urutan-yang-benar.txt](./urutan-yang-benar.txt) (dari Section 0 Navbar hingga Section 11 Footer), kecuali pengguna secara tertulis meminta urutan berbeda.

---

## 1. Konteks Proyek & Arsitektur

**template-portofolio11** (nama edisi: **Neue Grid Vanguard**) adalah template website portofolio interaktif dan editorial premium berbasis **React 19 + TypeScript + Vite + React Compiler**, dikembangkan untuk ekosistem layanan **bikin.portofoliomu**.

### Dua Jalur Akses:
1. **Portofolio Publik (`/` / `index.html`):**
   - Halaman website portofolio yang dibagikan kepada klien dan recruiter.
   - Menampilkan konten dinamis berdasarkan data `PortfolioContent` yang terstruktur murni.
2. **Studio Admin Internal (`/buat-template` / `buat-template.html`):**
   - Panel khusus dan tersembunyi untuk tim internal bikin.portofoliomu mengelola data pelanggan, upload foto, dan memilih preset tema.
   - **TIDAK BOLEH ADA TAUTAN ATAU TOMBOL** menuju `/buat-template` pada halaman publik.

---

## 2. Pedoman Estetika Visual: Swiss Kinetic Minimalist

### 2.1 Nilai Desain Utama
Template ini memadukan **Swiss / International Typographic Style**, **Kinetic Typography**, dan **Minimalist Editorial UI**:
- **Grid Matematika 12-Kolom:** Seluruh elemen tersusun rapi berdasarkan garis grid modular dan ritme vertikal-horizontal yang konsisten.
- **Asimetri Terencana:** Menolak layout kartu bento yang monoton. Gunakan variasi lebar kolom dan penempatan gambar untuk memandu alur pandang pengguna secara natural.
- **Tipografi sebagai Interface:** Judul editorial besar dengan tracking presisi (`-0.03em` hingga `-0.05em`), penomoran section modular raksasa (`01 /`, `02 /`), serta label uppercase monospaced di dalam kurung siku `[01 / TENTANG]`.
- **Breathing Room Luas (Whitespace Generous):** Jarak antar section yang lapang dan bernapas. Ruang kosong adalah elemen arsitektur aktif, bukan sisa layout.

### 2.2 Sistem Aksen Warna Maksimal (Maximized Accent)
Aksen warna dirancang menyala dan bervoltase tinggi untuk memberikan energi visual pada struktur monokromatik:
- **Warna Aksen:** **Swiss Signal Vermilion (`#FF2A00`)** (atau `#FF4015` pada mode gelap).
- **Aplikasi Maksimal:**
  - Tombol CTA primer (*full-bleed solid vermilion*) dengan teks kontras `#FFFFFF` dan reaksi magnetik saat hover.
  - Tipografi kinetik: kata kunci yang disorot memiliki animasi sapuan garis bawah (*kinetic underline sweep*).
  - Penomoran indeks section (`01 /`, `02 /`, dst.) dicetak tebal dengan warna aksen.
  - Kartu metrik hero (Total Sertifikat, Umur, Keahlian) menampilkan angka tebal beraksen menyala.
  - Border aktif kartu saat hover bertransisi menjadi `1.5px solid #FF2A00` dengan ambient lift halus.
  - Indikator status live berdenyut ganda (*live pulse ring*).

### 2.3 Larangan Keras Estetika (Visual Anti-Patterns)
- DILARANG menggunakan gradien warna-warni (biru ke ungu, pelangi) sebagai latar belakang.
- DILARANG menumpuk tren SaaS generik (bento-grid seragam + mesh gradient + glassmorphism berlebihan).
- DILARANG menggunakan shadow hitam pekat tebal yang membuat seluruh elemen terasa mengambang acak.
- DILARANG membuat semua kartu dan input berbentuk lonjong kapsul (*pill-shaped*). Gunakan radius modular terukur (4px hingga 8px untuk kartu, sudut tegas khas Swiss).

---

## 3. Disiplin Salinan & Teks (Copywriting Rules)

1. **LARANGAN MUTLAK KARAKTER EM DASH (R-02):**
   - DILARANG menggunakan karakter em dash (`—`) pada seluruh teks antarmuka, judul, kutipan, dan dokumen pendukung.
   - Gunakan tanda koma (`,`), titik dua (`:`), tanda hubung biasa (`-`), atau tanda kurung `()`.
2. **KONTEN NYATA TANPA FABRIKASI (R-36, R-38):**
   - Seluruh data wajib bersumber langsung dari `data-form-yang-ada.txt`.
   - DILARANG mengarang statistik palsu (mis. *"10K+ Happy Clients"*, *"99.9% Uptime"*).
### 2.4 Standar Logika Kalkulasi & Layout Metrik (Pola Referensi & Urutan Kanonikal)
1. **Hero Section Rata Tengah Penuh (Strict Center Layout)**:
   - Kontainer Hero wajib rata tengah: `margin: 0 auto; text-align: center; align-items: center; max-width: 860px;`.
   - Foto profil (PP) asli ditampilkan secara simetris di puncak Hero dengan bingkai lingkaran rapi dan indikator status online.
2. **Pemisahan 3 Metrik Inti vs. Followers Instagram**:
   - Grid 3 Kolom: `Total Sertifikat`, `Umur Saat Ini`, dan `Keahlian Dikuasai`.
   - Kartu Mandiri Terpisah: `Followers Instagram` dengan handle `@ahmadfurguso` dan tautan interaktif langsung.
3. **Kalkulasi Tanggal Lahir Dinamis**:
   - Seluruh perhitungan umur wajib menggunakan utilitas `calculateAge()` yang mem-parse format tanggal pelanggan `DD/MM/YYYY` (misal `14/05/2003`) secara presisi menghasilkan angka valid (`23 Thn`) tanpa hardcode tahun statis.

### 2.5 Standar UI/UX Editorial & Integritas Kartu
1. **Header Section Bersih & Rata Tengah**:
   - Seluruh section wajib menggunakan `.swiss-section-header` rata tengah.
   - DILARANG menaruh angka indeks dan kurung siku kaku di sebelah judul (`01 /`, `[ 04 / REKAM JEJAK KARIR ]`). Judul harus bersih, berwibawa, dan proporsional.
2. **Integritas Grid & Pencegahan Duplikasi Teks (Zero Text Duplication)**:
   - Setiap kartu kredensial/sertifikat dan penghargaan wajib mematuhi *Single-Source of Information*. Judul, tahun, dan institusi hanya boleh muncul **tepat satu kali** per kartu.
   - Class CSS grid di JSX (`certs-grid-standard`, `gallery-grid-6`) wajib memiliki deklarasi CSS yang sinkron dan teruji responsivitasnya pada 375px hingga desktop.
3. **Penyajian Foto Tanpa Penghalang**:
   - Tag gambar `<img>` wajib tampil langsung di permukaan kartu tanpa tertutup div placeholder statis. Pola fallback hanya dimuat jika terjadi *error* pada file gambar.
4. **Footer Editorial Berimbang (3-Pane Architecture)**:
   - Footer terorganisir rapi dalam 3 pane berimbang: Identitas & Profil di kiri, Navigasi Halaman 2-kolom di tengah, dan Kanal Media Sosial di kanan, dilengkapi pemisah 1px netral, atribusi digital *bikin.portofoliomu*, dan tombol interaktif *Kembali ke Atas*.
5. **Larangan Mutlak Persentase Bahasa & Keahlian (Zero Percentage Invariant)**:
   - DILARANG menggunakan angka persentase (`%`), progress bar meter, atau rating artifisial pada section Bahasa dan Keahlian.
   - Wajib menggunakan klasifikasi kualitatif terverifikasi (*Penutur Asli*, *Tingkat Profesional*, *Tingkat Aktif*) disertai penjelasan konteks komunikasinya.

---

## 4. Standar Kode & Rekayasa Teknis

1. **TypeScript Strict:** Seluruh data wajib menggunakan interface kanonikal dari `src/types/content.ts`. Hindari penggunaan `any`.
2. **CSS Modular & CSS Custom Properties:** Gunakan Vanilla CSS dengan variabel tema (`var(--color-bg)`, `var(--color-text)`, `var(--color-accent)`) agar penggantian tema dan kustomisasi studio bekerja mulus.
3. **Pembersihan GSAP (Scope Safety):** Seluruh animasi GSAP ScrollTrigger wajib diisolasi di dalam `gsap.context()` atau hook pembersih saat unmount untuk mencegah kebocoran memori.
4. **Otoritas Tunggal Scroll (Lenis):** Lenis smooth scroll diinisialisasi pada tingkat root dan disinkronkan ke GSAP Ticker. Matikan saat preferensi `prefers-reduced-motion` aktif.
5. **Dukungan Dual-Mode Penuh:** Mode terang (*Swiss Paper*) dan mode gelap (*Obsidian Grid*) wajib lolos uji kontras WCAG AA di setiap komponen.

---

## 5. Anti-Slop Delivery Gate Checklist

Sebelum agen menyatakan pekerjaan selesai atau siap diserahkan, agen wajib memverifikasi dan melaporkan checklist berikut:

```text
[ ] R-02 PASS: Bebas dari karakter em dash (—) di seluruh kode dan salinan teks.
[ ] R-03 PASS: Layout mobile sempurna pada 375px, tanpa overflow horizontal, touch target >= 44px.
[ ] R-17 PASS: Tidak ada statistik palsu yang ditampilkan; angka metrik bersumber valid.
[ ] R-21 PASS: Dual-mode (Light & Dark) berfungsi 100% tanpa elemen yang pecah atau tidak terbaca.
[ ] R-24 PASS: Seluruh tautan navigasi mengarah ke ID section yang benar-benar ada.
[ ] R-25 PASS: Kontras warna teks memenuhi standar WCAG AA (>= 4.5:1 untuk teks normal).
[ ] R-26 PASS: Tidak ada tombol mati; semua elemen interaktif memberikan respon nyata.
[ ] R-32 PASS: Navigasi keyboard (Tab, Shift+Tab, Enter, Escape) berfungsi dengan fokus visual jelas.
[ ] R-35 PASS: Aplikasi berhasil dijalankan (npm run build) tanpa error TypeScript atau lint.
[ ] R-37 PASS: Mengikuti arah desain resmi Neue Grid Vanguard (Swiss Kinetic Minimalist) dengan dial ENERGY 2 / RHYTHM 3 / MOTION 2.
```
