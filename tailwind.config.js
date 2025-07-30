/**  Brand tokens taken from hunter‑galloway/style.css  **/
module.exports = {
  content: ['./src/**/*.{astro,mdx,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary:  '#262626',   // dark gray text from CSS
        accent:   '#fdb948',   // yellow CTA from original site
        accent2:  '#318ec3',   // link / secondary  
        neutral:  '#f4f4f4',   // light gray section bg
        border:   '#eeeeee',
        yellow:   '#fdb948',   // alias for accent
      },
      fontFamily: {
        sans: ['"Gotham Pro"', 'Open Sans', 'sans-serif'],
        bold: ['"Gotham Pro Bold"', 'Open Sans', 'sans-serif'],
      },
      spacing: {
        section: '4.375rem',   // 70 px top/bottom section rhythm
      },
      borderRadius: {
        pill: '2.0625rem',     // 33 px pill buttons
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};