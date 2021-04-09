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
      noto: ['Noto Sans TC', '微軟正黑體', 'sans-serif'],
      opensans: ['Open Sans', 'sans-serif']
    },

    extend: {
      colors: {
        primary: '#38470B',
        secondary: '#949C7C'
      },
      height: {
        275: '275px',
        600: '600px'
      },
      margin: {
        '4/12': '33.333333%'
      },
      backgroundImage: theme => ({
        bg1: "url('~/assets/images/bg/1.jpeg')",
        bg2: "url('~/assets/images/bg/2.jpeg')",
        bg3: "url('~/assets/images/bg/3.jpeg')",
        bg4: "url('~/assets/images/bg/4.jpeg')",
        'gradient-room': 'linear-gradient(180deg, #FFFFFF00 0%, #FFFFFF 100%)'
      })
    }
  },

  variants: {
    extend: {}
  },

  plugins: []
}
