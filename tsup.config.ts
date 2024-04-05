import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'clomega', // Replace it with your extension name
  entry: ['src/index.ts', 'src/index.js'],
  target: ['esnext'],
  format: ['iife'],
  outDir: 'dist',
  banner: {
    // Replace it with your extension's metadata
    js: `// Name: CLΩ
// ID: clomega
// Description: API blocks for CloudLink Omega. Unleash your potential.
// By: MikeDEV
// License: MIT
`
  },
  platform: 'browser',
  clean: true
})
