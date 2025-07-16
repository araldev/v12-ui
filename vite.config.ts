import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import path, { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { copyFileSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    react(),
    tailwindcss(),
    dts({
      rollupTypes: true,
      exclude: ['vite.config.ts', '**/*.test.ts', '**/*.test.tsx']
    }),
    {
      name: 'copy-polymorphic-types',
      writeBundle () {
        const src = resolve(__dirname, 'src/utils/polymorphicTypes.d.ts')
        const dir = resolve(__dirname, 'dist/')
        copyFileSync(src, resolve(dir, 'polymorphicTypes.d.ts'))
      }
    }
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'v12-ui',
      fileName: 'v12-ui',
      cssFileName: 'styles',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
          'react/jsx-runtime': 'jsxRuntime'
        }
      }
    }
  }
})
