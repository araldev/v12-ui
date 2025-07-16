import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import path, { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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
      exclude: ['vite.config.ts', '**/*.test.ts', '**/*.test.tsx']
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: [
        resolve(__dirname, 'src/index.ts')
      ],
      name: 'v12-ui',
      formats: ['es', 'cjs'],
      // Con preserveModules: true esta función se llama para cada chunk
      fileName: (format, entryName) => {
        return entryName.replace(/^src\//, '') + (format === 'cjs' ? '.cjs' : '.js')
      },
      cssFileName: 'styles'
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'class-variance-authority',
        'clsx',
        'tailwind-merge'
      ],
      output: {
        preserveModules: true,
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
          'react/jsx-runtime': 'jsxRuntime',
          'class-variance-authority': 'classVarianceAuthority',
          clsx: 'clsx',
          'tailwind-merge': 'tailwindMerge'
        }
      }
    }
  }
})
