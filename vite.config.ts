import { defineConfig } from 'vite'
import { isCustomElement, transformAssetUrls } from 'vue3-pixi'
import vue from '@vitejs/plugin-vue'

const isProduction = process.argv.includes('production');

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement
        },
        transformAssetUrls,
      }
    })
  ],
  base: isProduction ? '/vue3-typescript-vite-pixijs-boilerplate/' : '/'
})
