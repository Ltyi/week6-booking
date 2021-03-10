module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],

  darkMode: false, // or 'media' or 'class'

  theme: {
    fontFamily: {
      noto: ['Noto Sans TC', '微軟正黑體', 'sans-serif']
    },

    extend: {
      colors: {
        primary: '#38470B'
      },
      height: {
        275: '275px'
      },
      backgroundImage: theme => ({
        bg1: "url('~/assets/images/bg/1.jpeg')",
        bg2: "url('~/assets/images/bg/2.jpeg')",
        bg3: "url('~/assets/images/bg/3.jpeg')",
        bg4: "url('~/assets/images/bg/4.jpeg')",
        room1: 'url(~/assets/images/rooms/1/cover.jpeg)',
        room2: 'url(~/assets/images/rooms/2/cover.jpeg)',
        room3: 'url(~/assets/images/rooms/3/cover.jpeg)',
        room4: 'url(~/assets/images/rooms/4/cover.jpeg)',
        room5: 'url(~/assets/images/rooms/5/cover.jpeg)',
        room6: 'url(~/assets/images/rooms/6/cover.jpeg)'
      })
    }
  },

  variants: {
    extend: {}
  },

  plugins: []
}
