/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  cacheDir: '../../../node_modules/.vite/solaradmin',

  server: {
    port: 4200,
    host: '0.0.0.0',
  },

  preview: {
    port: 4300,
    host: '0.0.0.0',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  define: {
    'import.meta.vitest': undefined,
  },
});
