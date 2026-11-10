# Data Model Mapping: Field Form Pelanggan ke Skema Kode
## template-portofolio11: Neue Grid Vanguard | bikin.portofoliomu

Dokumen ini adalah panduan pemetaan resmi antara data formulir pelanggan ([data-form-yang-ada.txt](../data-form-yang-ada.txt)), urutan tampilan ([urutan-yang-benar.txt](../urutan-yang-benar.txt)), dan skema data kanonikal `PortfolioContent` pada [SKILL.md](../SKILL.md).

---

## 1. Prinsip Pemetaan

1. **Field Wajib dari Form Pelanggan:**
   - Seluruh data yang diisi pelanggan pada form bersifat **WAJIB** dan SELALU tersedia.
   - Section yang mengandalkan data ini TIDAK BOLEH disembunyikan dan TIDAK BOLEH gagal render.
2. **Kalkulasi Otomatis (Computed Data):**
   - Field `TANGGAL LAHIR` (14/05/2003) dihitung secara dinamis untuk menghasilkan umur saat ini (23 Tahun) pada kartu metrik Hero.
3. **Data Opsional & Section Fallback:**
   - Field yang hanya disediakan di Studio Admin (mis. galeri tambahan, deskripsi opsional) bersifat opsional. Jika kosong, elemen atau sub-elemen terkait disembunyikan secara bersih tanpa merusak struktur grid.

---

## 2. Tabel Pemetaan Lengkap

| Field Form Pelanggan | Field pada `PortfolioContent` | Section Terkait | Catatan & Penanganan |
|---|---|---|---|
| NAMA | `personal.name` | Navbar, Hero, About, Footer | Wajib. Digunakan juga untuk inisial brand mark (`AF`) |
| PROFESI SEKARANG | `personal.role` | Hero (Subline) | Wajib: *"Corporate Communication Specialist"* |
| QUOTE / KATA-KATA | `personal.quote` | Hero (Blockquote) | Wajib: Kutipan komunikasi yang efektif |
| NOMOR WHATSAPP | `personal.whatsapp`, `contact.whatsapp` | About, Quick Contact, Footer | Wajib: `081234567890` (otomatis dibuat link `https://wa.me/6281234567890`) |
| EMAIL | `personal.email`, `contact.email` | Quick Contact, Footer, Collab Form | Wajib: `ahmad.furguso@email.com` (`mailto:`) |
| TANGGAL LAHIR | `personal.birthDate` | Hero (Umur Dinamis), About | Wajib: `14/05/2003`. Menghasilkan umur 23 tahun |
| TENTANG SAYA | `personal.bioSummary` | About | Wajib: Teks biografi lulusan Manajemen Komunikasi UGM |
| FOTO PROFIL | `personal.avatarUrl` | Navbar (opsional), About | Wajib: Menggunakan foto profil resolusi tinggi |
| FOTO SAYA (Galeri Multi) | `gallery[].imageUrl` | Galeri Saya (Section 02) | 6 foto terstruktur untuk grid 2 baris x 3 kolom |
| PENDIDIKAN | `education[]` | Pendidikan (Section 03) | 4 jenjang berurutan (UGM, SMAN 3, SMPN 5, SDN Percobaan 2) |
| PENGALAMAN PROFESIONAL | `experience[]` | Pengalaman (Section 04) | 3 riwayat instansi terstruktur (PT Narasi, Ruang Ide, PT Wijaya) |
| KEAHLIAN YANG DIKUASAI | `skills[]` | Keahlian (Section 05) | 6 kelompok kompetensi + daftar tools spesifik |
| KEMAMPUAN BAHASA | `languages[]` | Kemampuan Bahasa (Section 06) | 3 bahasa: Indonesia (Fasih), Inggris (Profesional), Jawa (Aktif) |
| FOTO SERTIFIKAT | `certificates[]` | Penghargaan & Sertifikat (Section 07) | Galeri kartu sertifikat visual dengan modal Lightbox |
| PENGHARGAAN | `awards[]` | Penghargaan & Sertifikat (Section 07) | Daftar capaian prestasi formal |
| MEDIA SOSIAL: LINKEDIN | `contact.socials[]` (platform: 'linkedin') | Quick Contact, Footer | URL LinkedIn profil Ahmad Furguso |
| MEDIA SOSIAL: INSTAGRAM | `contact.socials[]` (platform: 'instagram') | Hero Ticker, Quick Contact, Footer | Tautan Instagram & Ticker Followers |
| MEDIA SOSIAL: TIKTOK | `contact.socials[]` (platform: 'tiktok') | Quick Contact, Footer | Tautan TikTok profil edukasi komunikasi |

---

## 3. Penataan 12 Urutan Tampilan Berdasarkan `urutan-yang-benar.txt`

1. **Header / Navbar:** Brand NP ID (`AF`), Foto Profil PP (opsional), Teksline status, Tautan Beranda s/d Kontak, Dual-Mode Toggle.
2. **Hero:** Salam *"HAI, SAYA"*, Nama *"AHMAD FURGUSO"*, Subline Profesi, Quotes, Tombol CTA *"LIHAT GALERI"* & *"HUBUNGI SAYA"*, Kartu Metrik (Total Sertifikat, Umur Saat Ini, Total Keahlian), Ticker Followers Instagram.
3. **01 / Tentang Saya:** Foto Profil PP, Judul Section, Deskripsi Biografi, Tanggal Lahir, Tombol Direct *"HUBUNGI WA (081234567890)"*.
4. **02 / Galeri Saya:** Grid 6 foto (3 baris atas, 3 baris bawah), deskripsi opsional, Lightbox viewer.
5. **03 / Pendidikan:** Kartu dossier capaian akademik format `TAHUN * INSTANSI * JURUSAN`.
6. **04 / Pengalaman Profesional:** Linimasa riwayat kerja berulang (`TAHUN`, `JABATAN`, `DESKRIPSI`).
7. **05 / Keahlian Dikuasai:** Grid Swiss kategori keahlian dan rincian tools.
8. **06 / Kemampuan Bahasa:** Baris kompetensi bahasa dan tingkat kefasihan.
9. **07 / Penghargaan & Sertifikat:** Prestasi penghargaan dan kartu sertifikat.
10. **Quick Contact Bar:** Tombol *"KIRIM VIA WA"*, *"KIRIM VIA EMAIL"*, Nomor WhatsApp, Email, Domisili, dan Ikon Aplikasi Sosial.
11. **Kolaborasi / Final CTA:** Headline *"MARI BERKOLABORASI BERSAMA"*, Form input pesan langsung terhubung ke pengiriman instan.
12. **Footer:** Navigasi Eksplorasi, Kontak & Lokasi, Tautan Media Sosial, dan Hak Cipta resmi bikin.portofoliomu.
