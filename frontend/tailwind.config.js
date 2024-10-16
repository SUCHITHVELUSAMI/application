module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // This will ensure Tailwind scans your Next.js app directory
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
