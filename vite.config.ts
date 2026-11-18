import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // dev-only equivalent of api/analyze.ts (vercel dev runs the real function);
  // the key stays in this process and never reaches the bundle
  const proxy =
    env.ATUE_AI_URL && env.ATUE_API_KEY
      ? {
          '/api/analyze': {
            target: env.ATUE_AI_URL,
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api\/analyze/, '/analyze'),
            headers: { 'X-Api-Key': env.ATUE_API_KEY },
          },
        }
      : undefined

  return {
    plugins: [react(), tailwindcss()],
    server: { proxy },
  }
})
