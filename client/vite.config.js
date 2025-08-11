import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    strictPort: true,
    allowedHosts: [
      'smart-task-summarizer-app.loca.lt', // LocalTunnel domain
      'heath-sharing-safely-hope.trycloudflare.com', // Current Cloudflare tunnel domain for frontend
      'fix-list-lexmark-techno.trycloudflare.com', // Current Cloudflare tunnel domain for backend
      'focuses-feels-dpi-optimization.trycloudflare.com', // Old Cloudflare tunnel domain
      'defend-during-vanilla-bullet.trycloudflare.com', // Old Cloudflare tunnel domain
      'enable-physiology-programme-examples.trycloudflare.com', // Old Cloudflare tunnel domain
      // Allow all Cloudflare tunnel domains
      '*.trycloudflare.com'
    ],
    hmr: {
      clientPort: 443, // ensure HMR works over HTTPS
    },
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'https://fix-list-lexmark-techno.trycloudflare.com' 
          : 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
