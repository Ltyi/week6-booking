export default {
  head: {
    title: '好室旅店。HOUSE HOTEL',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;400;500&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
      }
    ]
  },

  css: ['swiper/swiper-bundle.min.css', '@fortawesome/fontawesome-svg-core/styles.css'],

  plugins: [
    { src: '~/plugins/notifications', mode: 'client' },
    '~/plugins/fontawesome',
    '~/plugins/swiper',
    '~/plugins/currency'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
