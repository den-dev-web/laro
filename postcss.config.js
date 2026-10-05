// Function form is required: postcss-cli passes CLI options (e.g. --map) only to a function config
module.exports = (ctx) => {
  const IsProduction = ctx.env === 'production'

  return {
    // Source maps for development builds only; production CSS ships without them
    map: IsProduction ? false : ctx.options.map,
    plugins: {
      '@tailwindcss/postcss': {
        // Optimize (minify) for production build
        optimize: IsProduction,
      },
    },
  }
}

