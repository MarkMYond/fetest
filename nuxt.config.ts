// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],

  runtimeConfig: {
    public: {
      // Ensure API URL is correctly formed for both production (from env var) and local development
      apiUrl: `${process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3333'}/api`, 
    }
  }
})
