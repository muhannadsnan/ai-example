// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY, // Map to the environment variable
  },
  nitro: {}
})
