// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              let pkg = id.includes('.pnpm/')
                ? id.split('.pnpm/')[1].split('/')[0]
                : id.split('node_modules/')[1].split('/')[0];
              if (pkg.includes('three') || pkg.includes('postprocessing') || pkg.includes('motion')) {
                return pkg;
              }
              return 'vendor';
            }
          }
        }
      },
    },
    // Extra split code into chunks
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks(id) {
    //         if (id.indexOf('node_modules') !== -1) {
    //           const basic = id.toString().split('node_modules/')[1];
    //           const sub1 = basic.split('/')[0];
    //           if (sub1 !== '.pnpm') {
    //             return sub1.toString();
    //           }
    //           const name2 = basic.split('/')[1];
    //           return name2.split('@')[name2[0] === '@' ? 1 : 0].toString();
    //         }
    //       }
    //     }
    //   }
    // },
    optimizeDeps: {
      include: ['three', 'postprocessing', 'motion/react'],
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
      },
    },
    css: {
      devSourcemap: false,
    },
  },

  integrations: [react(), sitemap()],
});
