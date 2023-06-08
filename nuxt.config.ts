// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/devtools',
        '@pinia/nuxt'
      ],
    srcDir: 'src/',
    css: [
        '~/assets/main.css'
    ]
})
