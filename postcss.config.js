module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // Оптимизация для production сборки
      optimize: process.env.NODE_ENV === 'production',
    },
  },
}

