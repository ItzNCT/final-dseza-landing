
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Custom colors for the DSEZA website
        'dseza': {
          // Dark mode colors
          'dark-main-bg': '#1E272F',
          'dark-secondary': '#2C3640',
          'dark-secondary-bg': '#2C3640',
          'dark-hover': '#3A4750',
          'dark-hover-bg': '#3A4750',
          'dark-main-text': '#FFFFFF',
          'dark-secondary-text': '#B0BEC5',
          'dark-primary': '#19DBCF',
          'dark-primary-hover': '#66FFEB',
          'dark-primary-accent': '#19DBCF',
          'dark-primary-accent-hover': '#66FFEB',
          'dark-secondary-accent': '#26A69A',
          'dark-accent': '#26A69A',
          'dark-secondary-accent-hover': '#3CAEA3',
          'dark-accent-hover': '#3CAEA3',
          'dark-border': '#455A64',
          // Light mode colors
          'light-main-bg': '#FFFFFF',
          'light-secondary': '#F2F2F2',
          'light-secondary-bg': '#F2F2F2',
          'light-hover': '#E9E9E9',
          'light-hover-bg': '#E9E9E9',
          'light-main-text': '#000000',
          'light-secondary-text': '#545454',
          'light-primary': '#416628',
          'light-primary-hover': '#5A8C3E',
          'light-primary-accent': '#416628',
          'light-primary-accent-hover': '#5A8C3E',
          'light-secondary-accent': '#6B8E23',
          'light-accent': '#6B8E23',
          'light-secondary-accent-hover': '#85AC4D',
          'light-accent-hover': '#85AC4D',
          'light-border': '#DCDCDC',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-out': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(10px)'
          }
        },
        'scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'slide-in-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'slide-out-top': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-out-right': 'slide-out-right 0.3s ease-out',
        'slide-in-top': 'slide-in-top 0.3s ease-out',
        'slide-out-top': 'slide-out-top 0.3s ease-out',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.2)',
        DEFAULT: '1px 1px 3px rgba(0, 0, 0, 0.3)',
        lg: '2px 2px 5px rgba(0, 0, 0, 0.4)',
      },
      scale: {
        '103': '1.03',
      },
    }
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
