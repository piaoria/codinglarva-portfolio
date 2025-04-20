/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        bungee: ["var(--font-bungee-hairline)"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
        scaleIn: "scaleIn 0.2s ease-out",
        fadeInDown: "fadeInDown 0.3s ease-out forwards",
        slideDown: "slideDown 0.3s ease-out forwards",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: '500',
              borderBottom: '1px solid',
              borderColor: 'rgb(226 232 240)',
              '&:hover': {
                borderColor: 'rgb(148 163 184)',
              },
            },
            strong: {
              color: 'inherit',
              fontWeight: '600',
            },
            'p code, li code': {
              color: 'rgb(239 68 68)',
              fontWeight: '400',
              backgroundColor: 'rgb(241 245 249)',
              borderRadius: '0.25rem',
              paddingTop: '0.125rem',
              paddingRight: '0.25rem',
              paddingBottom: '0.125rem',
              paddingLeft: '0.25rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
            },
            'pre': {
              backgroundColor: 'rgb(30 41 59)',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'blockquote p:first-of-type::before': {
              content: '""',
            },
            'blockquote p:last-of-type::after': {
              content: '""',
            },
            'blockquote': {
              borderLeftColor: 'rgb(148 163 184)',
              color: 'inherit',
            },
            'h1': {
              color: 'inherit',
            },
            'h2': {
              color: 'inherit',
            },
            'h3': {
              color: 'inherit',
            },
            'h4': {
              color: 'inherit',
            },
            'img': {
              margin: '0',
            },
            'figure': {
              margin: '0',
            },
            'figcaption': {
              textAlign: 'center',
              fontStyle: 'italic',
              fontSize: '0.875rem',
              marginTop: '1rem',
            },
          },
        },
        invert: {
          css: {
            'p code, li code': {
              backgroundColor: 'rgb(30 41 59)',
            },
            'pre': {
              backgroundColor: 'rgb(15 23 42)',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
