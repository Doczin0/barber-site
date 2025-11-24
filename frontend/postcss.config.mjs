/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},  // plugin oficial do Tailwind v4
    autoprefixer: {},            // autoprefixer normal
  },
};

export default config;
