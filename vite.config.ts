import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { copyFileSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    dts({
      exclude: ['vite.config.ts', '**/*.test.ts', '**/*.test.tsx']
    }),
    {
      name: 'copy-polymorphic-types',
      writeBundle () {
        const src = resolve(__dirname, 'src/utils/polymorphicTypes.d.ts')
        const dir = resolve(__dirname, 'dist/utils')
        copyFileSync(src, resolve(dir, 'polymorphicTypes.d.ts'))
      }
    }
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: [
        resolve(__dirname, 'src/Hooks/useDataTheme.ts'),
        resolve(__dirname, 'src/Background/AnimatedBackground.tsx'),
        resolve(__dirname, 'src/Button/Button.tsx'),
        resolve(__dirname, 'src/Text/Text.tsx')
      ],
      name: 'v12-ui',
      cssFileName: 'styles',
      formats: ['es', 'cjs'],
      // Con preserveModules: true esta función se llama para cada chunk
      fileName: (format, entryName) => {
        return entryName.replace(/^src\//, '') + (format === 'cjs' ? '.cjs' : '.js')
      }
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: true,
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
