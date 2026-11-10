import { resolve, extname, join } from 'node:path'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, type Plugin } from 'vite'

function localAssetAndDataPlugin(): Plugin {
  return {
    name: 'local-asset-and-data-plugin',
    configureServer(server) {
      // 1. Upload API: simpan file langsung ke public/assets/<folder>/
      server.middlewares.use('/api/upload', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method Not Allowed' }))
          return
        }

        const urlObj = new URL(req.url || '', 'http://localhost')
        const folder = urlObj.searchParams.get('folder') || 'general'
        const rawFileName = urlObj.searchParams.get('filename') || `asset-${Date.now()}`

        const chunks: Buffer[] = []
        req.on('data', (chunk) => chunks.push(chunk))
        req.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks)
            let fileBuffer: Buffer = buffer
            let cleanExt = extname(rawFileName).toLowerCase() || '.png'
            let finalName = rawFileName

            // Tangani JSON base64 jika dikirim via JSON payload
            const contentType = req.headers['content-type'] || ''
            if (contentType.includes('application/json')) {
              const parsed = JSON.parse(buffer.toString('utf8'))
              const dataUrl = parsed.data || parsed.image || ''
              const match = dataUrl.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/)
              if (match) {
                cleanExt = match[1] === 'jpeg' ? '.jpg' : `.${match[1]}`
                fileBuffer = Buffer.from(match[2], 'base64')
              }
              finalName = parsed.filename || `asset-${Date.now()}${cleanExt}`
            }

            if (!extname(finalName)) {
              finalName = `${finalName}${cleanExt}`
            }

            const publicDir = resolve(import.meta.dirname, 'public', 'assets', folder)
            if (!existsSync(publicDir)) {
              mkdirSync(publicDir, { recursive: true })
            }

            const safeName = finalName.replace(/[^a-zA-Z0-9._-]/g, '_')
            const uniqueName = safeName.includes(String(Date.now()).slice(0, 6))
              ? safeName
              : `${Date.now()}-${safeName}`
            const destPath = join(publicDir, uniqueName)

            writeFileSync(destPath, fileBuffer)

            const publicUrl = `/assets/${folder}/${uniqueName}`
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, url: publicUrl, filename: uniqueName }))
          } catch (err: unknown) {
            console.error('Error handling asset upload:', err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Upload failed' }))
          }
        })
      })

      // 2. Save Data API: Simpan langsung ke public/portfolio-data.json
      server.middlewares.use('/api/save-data', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method Not Allowed' }))
          return
        }

        const chunks: Buffer[] = []
        req.on('data', (chunk) => chunks.push(chunk))
        req.on('end', () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
            const { content, config } = body

            if (content) {
              const contentPath = resolve(import.meta.dirname, 'public', 'portfolio-data.json')
              writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf8')
            }

            if (config) {
              const configPath = resolve(import.meta.dirname, 'public', 'template-config.json')
              writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8')
            }

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, message: 'Data berhasil disimpan ke disk' }))
          } catch (err: unknown) {
            console.error('Error saving data to disk:', err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Save failed' }))
          }
        })
      })

      // 3. Load Data API: Baca langsung dari disk
      server.middlewares.use('/api/load-data', (_req, res) => {
        try {
          const contentPath = resolve(import.meta.dirname, 'public', 'portfolio-data.json')
          const configPath = resolve(import.meta.dirname, 'public', 'template-config.json')

          let content = null
          let config = null

          if (existsSync(contentPath)) {
            content = JSON.parse(readFileSync(contentPath, 'utf8'))
          }
          if (existsSync(configPath)) {
            config = JSON.parse(readFileSync(configPath, 'utf8'))
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true, content, config }))
        } catch (err: unknown) {
          console.error('Error loading data from disk:', err)
          res.statusCode = 500
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Load failed' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    localAssetAndDataPlugin(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        studio: resolve(import.meta.dirname, 'buat-template.html'),
      },
    },
  },
})
