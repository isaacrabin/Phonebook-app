/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    colors:{
      primary: {
        100: '#eaf6b0',
        200: '#dff183',
        300: '#d4eb55',
        400: '#cae62c',
        500: '#bed600',
        600: '#a5bb00',
        700: '#8c9f00',
        800: '#737e00',
        900: '#5a5d00'
      },
      secondary: {
        100: '#b6e0f0',
        200: '#84cbe4',
        300: '#4bb6d8',
        400: '#219fc8',
        500: '#005B82', // Base color
        600: '#004e71',
        700: '#004160',
        800: '#00354f',
        900: '#00283e',
      },
      tertiary: {
        50: '#fdeaea',
        100: '#f9c7c7',
        200: '#f3a2a2',
        300: '#ed7c7c',
        400: '#e86060',
        500: '#d45b5b', // Base color
        600: '#b14f4f',
        700: '#8f4242',
        800: '#6c3535',
        900: '#492828',
      },
      accent: {
        50: '#fff7e8',
        100: '#ffebc2',
        200: '#fedf9a',
        300: '#fdd372',
        400: '#fcc84d',
        500: '#f7c152', // Base color
        600: '#d4a048',
        700: '#b0803c',
        800: '#8c6030',
        900: '#694022',
      },
      gray: {
        50: '#f9fafb',  // Lightest
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',  // Neutral Gray
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',  // Darkest
      },

    },
    extend: {
      backgroundImage: {
        'home': "url('assets/images/home-bg.webp')"
      }
    },
  },
  plugins: [],
}

