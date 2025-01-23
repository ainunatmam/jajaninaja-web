// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/sanity"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      link: [
        {
          href: 'https://api.fontshare.com/v2/css?f[]=satoshi@500&display=swap',
          rel: 'stylesheet'          
        }
      ]
    }
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: Boolean(process.env.SANITY_CDN) ?? false,
  },
});
