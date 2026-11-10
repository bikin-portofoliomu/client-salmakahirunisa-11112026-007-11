import type { PortfolioContent, TemplateConfig } from '../types/content'

export function isFileSystemAccessSupported(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window
}

/**
 * Konversi DataURL (base64) ke Blob biner
 */
export function dataURLToBlob(dataurl: string): { blob: Blob; ext: string } | null {
  if (!dataurl.startsWith('data:')) return null

  try {
    const arr = dataurl.split(',')
    const mimeMatch = arr[0].match(/:(.*?);/)
    const mime = mimeMatch ? mimeMatch[1] : 'image/png'
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    let ext = 'png'
    if (mime.includes('jpeg') || mime.includes('jpg')) ext = 'jpg'
    else if (mime.includes('webp')) ext = 'webp'
    else if (mime.includes('svg')) ext = 'svg'

    return { blob: new Blob([u8arr], { type: mime }), ext }
  } catch {
    return null
  }
}

/**
 * Helper menulis berkas ke FileSystem Directory
 */
async function writeDirectoryFile(
  root: any,
  segments: string[],
  fileName: string,
  content: BlobPart,
): Promise<void> {
  let dir = root
  for (const segment of segments) {
    dir = await dir.getDirectoryHandle(segment, { create: true })
  }
  const fileHandle = await dir.getFileHandle(fileName, { create: true })
  const writable = await fileHandle.createWritable()
  await writable.write(content)
  await writable.close()
}

/**
 * Ekspor Proyek Lengkap:
 * Mengalokasikan seluruh foto upload ke public/assets/**,
 * menamai ulang secara rapi, dan menulis portfolio-data.json serta template-config.json.
 */
export async function exportToProjectDirectory(
  content: PortfolioContent,
  config: TemplateConfig,
  rawFiles?: Record<string, File>,
): Promise<{ success: boolean; filesCount: number }> {
  if (!isFileSystemAccessSupported()) {
    throw new Error('File System Access API tidak didukung pada browser ini. Silakan gunakan Ekspor JSON.')
  }

  // Minta pengguna memilih root folder proyek
  // @ts-expect-error window.showDirectoryPicker modern browser API
  const rootDirHandle = await window.showDirectoryPicker({ mode: 'readwrite' })

  // Salin salinan deep data agar tidak memutasi state sebelum ditulis
  const normalizedContent: PortfolioContent = JSON.parse(JSON.stringify(content))
  let totalFilesWritten = 0

  // 1. ALOKASI AVATAR PROFIL
  const avatarVal = content.personal.avatarUrl
  const rawAvatarFile = rawFiles?.['profile']

  if (rawAvatarFile) {
    const ext = rawAvatarFile.name.split('.').pop() || 'png'
    const fileName = `profile.${ext}`
    await writeDirectoryFile(rootDirHandle, ['public', 'assets', 'profile'], fileName, rawAvatarFile)
    normalizedContent.personal.avatarUrl = `/assets/profile/${fileName}`
    totalFilesWritten++
  } else if (avatarVal && avatarVal.startsWith('data:')) {
    const res = dataURLToBlob(avatarVal)
    if (res) {
      const fileName = `profile.${res.ext}`
      await writeDirectoryFile(rootDirHandle, ['public', 'assets', 'profile'], fileName, res.blob)
      normalizedContent.personal.avatarUrl = `/assets/profile/${fileName}`
      totalFilesWritten++
    }
  }

  // 2. ALOKASI GALERI FOTO (1 - 6)
  for (let i = 0; i < normalizedContent.gallery.length; i++) {
    const item = normalizedContent.gallery[i]
    const rawGalFile = rawFiles?.[`gallery-${item.id}`]
    const num = String(i + 1).padStart(2, '0')

    if (rawGalFile) {
      const ext = rawGalFile.name.split('.').pop() || 'png'
      const fileName = `photo-${num}.${ext}`
      await writeDirectoryFile(rootDirHandle, ['public', 'assets', 'gallery'], fileName, rawGalFile)
      item.imageUrl = `/assets/gallery/${fileName}`
      totalFilesWritten++
    } else if (item.imageUrl && item.imageUrl.startsWith('data:')) {
      const res = dataURLToBlob(item.imageUrl)
      if (res) {
        const fileName = `photo-${num}.${res.ext}`
        await writeDirectoryFile(rootDirHandle, ['public', 'assets', 'gallery'], fileName, res.blob)
        item.imageUrl = `/assets/gallery/${fileName}`
        totalFilesWritten++
      }
    }
  }

  // 3. ALOKASI SERTIFIKAT (1 - 6)
  for (let i = 0; i < normalizedContent.certificates.length; i++) {
    const item = normalizedContent.certificates[i]
    const rawCertFile = rawFiles?.[`cert-${item.id}`]
    const num = String(i + 1).padStart(2, '0')

    if (rawCertFile) {
      const ext = rawCertFile.name.split('.').pop() || 'png'
      const fileName = `cert-${num}.${ext}`
      await writeDirectoryFile(rootDirHandle, ['public', 'assets', 'certificates'], fileName, rawCertFile)
      item.imageUrl = `/assets/certificates/${fileName}`
      totalFilesWritten++
    } else if (item.imageUrl && item.imageUrl.startsWith('data:')) {
      const res = dataURLToBlob(item.imageUrl)
      if (res) {
        const fileName = `cert-${num}.${res.ext}`
        await writeDirectoryFile(rootDirHandle, ['public', 'assets', 'certificates'], fileName, res.blob)
        item.imageUrl = `/assets/certificates/${fileName}`
        totalFilesWritten++
      }
    }
  }

  // 4. TULIS portfolio-data.json
  await writeDirectoryFile(
    rootDirHandle,
    ['public'],
    'portfolio-data.json',
    JSON.stringify(normalizedContent, null, 2),
  )
  totalFilesWritten++

  // 5. TULIS template-config.json
  await writeDirectoryFile(
    rootDirHandle,
    ['public'],
    'template-config.json',
    JSON.stringify(config, null, 2),
  )
  totalFilesWritten++

  return { success: true, filesCount: totalFilesWritten }
}

/**
 * Unduh manual file JSON
 */
export function downloadJSONFile(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
