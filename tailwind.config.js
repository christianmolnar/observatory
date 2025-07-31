/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
    },
    fontWeight: {
      'thin': '100',
      'extralight': '200',
      'light': '200',        // Override font-light to use Extra Light
      'normal': '200',       // Override font-normal to use Extra Light  
      'medium': '300',       // Map font-medium to Light
      'semibold': '400',     // Map font-semibold to Regular
      'bold': '500',         // Map font-bold to Medium
      'extrabold': '600',    // Map font-extrabold to SemiBold
      'black': '700',        // Map font-black to Bold
    }
  },
  plugins: [],
}
