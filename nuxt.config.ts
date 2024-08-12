// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Hath',
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
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"]
})