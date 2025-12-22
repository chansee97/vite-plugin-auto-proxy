import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  minify: false,
  target: 'es2020',
  outDir: 'dist',
  // Ensure proper module exports
  cjsInterop: true,
  // Add shims for proper CJS/ESM interop
  shims: true,
})