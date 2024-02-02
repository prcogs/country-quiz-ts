import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
   // Load env file based on `mode` in the current working directory.
   // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
   const env = loadEnv(mode, process.cwd())

   // expose .env as process.env instead of import.meta since jest does not import meta yet
   const envWithProcessPrefix = Object.entries(env).reduce(
      (prev, [key, val]) => {
         return {
            ...prev,
            [`process.env.${key}`]: `"${val}"`,
         }
      },
      {},
   )

   return {
      // vite config
      define: envWithProcessPrefix,
      plugins: [
         react(),
         eslint(),
         tsconfigPaths(),
      ],
      server: {
         host: '0.0.0.0',
         port: 3000,
         hmr: {
            port: 3000,
            clientPort: 3000,
            host: 'localhost',
         },
      },
      // base: '/country-quiz-ts/',
   }
})
