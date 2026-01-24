// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},   // ← this is the new required package
    autoprefixer: {},
  },
};