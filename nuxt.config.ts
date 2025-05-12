// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],

  runtimeConfig: {
    public: {
      // Use the taash-payld.vercel.app URL for production
      apiUrl: `${process.env.NUXT_PUBLIC_API_URL || 'https://taash-payld.vercel.app'}/api`, 
    }
  }
})
