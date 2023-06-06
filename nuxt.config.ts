// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/devtools',
      ],
    srcDir: 'src/',
    css: [
        '~/assets/main.css'
    ],
    nitro: {
        storage: {
            db: {
            driver: 'fs',
            base: './.data/db'
            }
        }
    }
})
