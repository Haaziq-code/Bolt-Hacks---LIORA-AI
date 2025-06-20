/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Urbanist', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Futuristic midnight blue base
        midnight: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8191ff',
          500: '#5d6aff',
          600: '#4c4fff',
          700: '#3d3beb',
          800: '#3230c7',
          900: '#1a1b4b',
          950: '#0a0b1e',
        },
        // Neon cyan accents
        neon: {
          50: '#f0fdff',
          100: '#ccf7fe',
          200: '#99effd',
          300: '#60e2fa',
          400: '#22ccf0',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        // Violet-blue gradients
        violet: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Glowing lavender
        lavender: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8191ff',
          500: '#5d6aff',
          600: '#4c4fff',
          700: '#3d3beb',
          800: '#3230c7',
          900: '#1a1b4b',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in': 'slideIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 15s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'theme-switch': 'themeSwitch 0.5s ease-in-out',
        'voice-pulse': 'voicePulse 1.5s ease-in-out infinite',
        'neon-glow': 'neonGlow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'ai-pulse': 'aiPulse 3s ease-in-out infinite',
        'neural-flow': 'neuralFlow 4s ease-in-out infinite',
        'data-stream': 'dataStream 2s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'scramble': 'scramble 0.1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(93, 106, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(93, 106, 255, 0.8)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        shimmer: {
          '0%': {
            'background-position': '-200px 0'
          },
          '100%': {
            'background-position': 'calc(200px + 100%) 0'
          },
        },
        themeSwitch: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        voicePulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.4)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 10px rgba(34, 197, 94, 0)'
          },
        },
        neonGlow: {
          '0%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            textShadow: '0 0 5px currentColor'
          },
          '100%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            textShadow: '0 0 10px currentColor'
          },
        },
        glowPulse: {
          '0%, 100%': { 
            opacity: '0.8',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.05)'
          },
        },
        aiPulse: {
          '0%, 100%': { 
            opacity: '0.6',
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(93, 106, 255, 0.4)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.02)',
            boxShadow: '0 0 0 15px rgba(93, 106, 255, 0)'
          },
        },
        neuralFlow: {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'translateX(0) scale(1)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'translateX(10px) scale(1.1)'
          },
        },
        dataStream: {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '50%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0'
          },
        },
        breathe: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'scale(1.05)',
            opacity: '1'
          },
        },
        scramble: {
          '0%': { opacity: '0.8' },
          '50%': { opacity: '0.4' },
          '100%': { opacity: '0.8' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(93, 106, 255, 0.5)',
        'glow-lg': '0 0 40px rgba(93, 106, 255, 0.6)',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        'neon-lg': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
        'neon-xl': '0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor',
        'luxury': '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 25px rgba(0, 0, 0, 0.07)',
        'luxury-lg': '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 40px rgba(0, 0, 0, 0.1)',
        'luxury-xl': '0 30px 80px rgba(0, 0, 0, 0.2), 0 12px 50px rgba(0, 0, 0, 0.15)',
        'neural': '0 0 20px rgba(93, 106, 255, 0.3), 0 0 40px rgba(168, 85, 247, 0.2)',
        'neural-lg': '0 0 30px rgba(93, 106, 255, 0.4), 0 0 60px rgba(168, 85, 247, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(255, 255, 255, 0.37)',
        'neumorphism-light': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
        'neumorphism-dark': '20px 20px 60px #0f172a, -20px -20px 60px #1e293b',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neural-gradient': 'linear-gradient(135deg, rgba(93, 106, 255, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
        'midnight-gradient': 'linear-gradient(135deg, #0a0b1e 0%, #1a1b4b 50%, #3230c7 100%)',
        'neon-gradient': 'linear-gradient(135deg, #06b6d4 0%, #22ccf0 50%, #60e2fa 100%)',
        'violet-gradient': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
      },
      blur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};