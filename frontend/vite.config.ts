import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      proxy: {
        [env.VITE_APP_API_ORIGIN]: {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        }
      },
    },
  }
});
