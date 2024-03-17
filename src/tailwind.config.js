module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      mobile: '320px',
      tablet: '768px',
      desktop: '1152px',
      maxDesktop: '1600px',
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        pixel: ['Pkmn', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
