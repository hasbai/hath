// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: '拾遗录',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        },
        {'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1'},
        {name: 'apple-mobile-web-app-capable', content: 'yes'},
        {name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
        {name: 'apple-mobile-web-app-title', content: 'Hath'},
        {name: 'apple-touch-fullscreen', content: 'yes'},
        {name: 'apple-touch-startup-image', content: '/image/apple-touch-icon.png'},
        {name: 'msapplication-TileColor', content: '#ffffff'},
        {name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)'},
        {name: 'theme-color', content: '#252525', media: '(prefers-color-scheme: dark)'},
      ],
      htmlAttrs: {
        lang: 'zh-CN',
        'data-theme': 'default',
      },
      link: [
        {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
        {rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: 'anonymous'},
        {rel: 'shortcut icon', href: 'favicon.ico'},
        {rel: 'icon', href: '/image/favicon-16x16.png', type: 'image/png', sizes: '16x16'},
        {rel: 'icon', href: '/image/favicon-32x32.png', type: 'image/png', sizes: '32x32'},
        {rel: 'apple-touch-icon', href: '/image/apple-touch-icon.png'},
      ],
    }
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/rest/v1/**': {
      proxy: `${process.env.BASE_URL}/rest/v1/**`,
    },
    '/auth/v1/**': {
      proxy: `${process.env.BASE_URL}/auth/v1/**`,
    },
    '/storage/v1/**': {
      proxy: `${process.env.BASE_URL}/storage/v1/**`,
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    devProxy: {
      '/rest/v1': {
        target: `${process.env.BASE_URL}/rest/v1`,
        changeOrigin: true,
      },
      '/auth/v1': {
        target: `${process.env.BASE_URL}/auth/v1`,
        changeOrigin: true,
      },
      '/storage/v1': {
        target: `${process.env.BASE_URL}/storage/v1`,
        changeOrigin: true,
      },
    },
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/admin(/*)?'],
      cookieRedirect: false,
    }
  },
  devtools: {enabled: true},
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  i18n: {
    locales: ['en', 'zh-CN'], // used in URL path prefix
    defaultLocale: 'zh-CN',
  },
  compatibilityDate: '2024-04-03',
})