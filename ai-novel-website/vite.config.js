import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-chapters',
      writeBundle(options) {
        const srcDir = resolve(__dirname, '../chapter')
        const destDir = resolve(options.dir, 'chapter')
        
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true })
        }
        
        const files = fs.readdirSync(srcDir)
        files.forEach(file => {
          if (file.endsWith('.md')) {
            fs.copyFileSync(
              resolve(srcDir, file),
              resolve(destDir, file)
            )
          }
        })
      }
    }
  ],
  base: '/ai-novel-lab/',
  server: {
    port: 3000,
    fs: {
      allow: ['..']
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
