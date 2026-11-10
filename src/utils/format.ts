/**
 * Utilitas Kalkulasi & Format Standar Portofolio
 * Sesuai pola referensi pada template-portofolio2, template-portofolio9, dan template-portofolio10.
 */

/**
 * Menghitung umur secara presisi dari tanggal lahir.
 * Mendukung format DD/MM/YYYY (misal: "14/05/2003") maupun format ISO YYYY-MM-DD.
 */
export function calculateAge(birthDateStr?: string): number | null {
  if (!birthDateStr || !birthDateStr.trim()) return null

  const trimmed = birthDateStr.trim()
  let birth: Date

  if (trimmed.includes('/')) {
    // Format DD/MM/YYYY
    const parts = trimmed.split('/')
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10)
      const year = parseInt(parts[2], 10)
      birth = new Date(year, month - 1, day)
    } else {
      birth = new Date(trimmed)
    }
  } else if (trimmed.includes('-')) {
    // Format YYYY-MM-DD atau DD-MM-YYYY
    const parts = trimmed.split('-')
    if (parts.length === 3 && parts[0].length === 4) {
      // YYYY-MM-DD
      birth = new Date(trimmed)
    } else if (parts.length === 3) {
      // DD-MM-YYYY
      const day = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10)
      const year = parseInt(parts[2], 10)
      birth = new Date(year, month - 1, day)
    } else {
      birth = new Date(trimmed)
    }
  } else {
    birth = new Date(trimmed)
  }

  if (Number.isNaN(birth.getTime())) return null

  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age >= 0 ? age : null
}

/**
 * Format nomor WhatsApp ke URL resmi wa.me
 */
export function formatWhatsAppUrl(phone: string, defaultName = 'Salma Khairunisa'): string {
  const cleaned = phone.replace(/\D/g, '')
  const finalNumber = cleaned.startsWith('0')
    ? '62' + cleaned.slice(1)
    : cleaned.startsWith('62')
      ? cleaned
      : '62' + cleaned

  const message = `Halo ${defaultName}, saya tertarik untuk berdiskusi lebih lanjut mengenai portofolio dan peluang kolaborasi Anda.`
  return `https://wa.me/${finalNumber}?text=${encodeURIComponent(message)}`
}
