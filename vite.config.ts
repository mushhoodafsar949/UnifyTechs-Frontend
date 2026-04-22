import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Proxies `/api` → localhost:5183 — run backend with `dotnet run` in the folder containing `UnifyTechs.Api.csproj` */
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5183',
        changeOrigin: true,
      },
    },
  },
  build: {
    /** Split bulky third-party deps into cacheable chunks so repeat visits avoid re-downloading
     *  stable libraries when only app code changes. */
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('framer-motion')) return 'vendor-framer'
          if (id.includes('cobe')) return 'vendor-globe'
          if (id.includes('lucide-react')) return 'vendor-icons'
          if (id.includes('react-countup') || id.includes('react-type-animation')) return 'vendor-fx'
          if (id.includes('react-dom')) return 'vendor-react-dom'
          if (id.includes('/react/') || id.endsWith('/react')) return 'vendor-react'
          return 'vendor'
        },
      },
    },
  },
})
