import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'Poppins', ...defaultTheme.fontFamily.sans],
                display: ['Outfit', 'Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    navy: '#061A3A',
                    dark: '#030E1F',
                    deep: '#041228',
                    blue: '#1769FF',
                    'blue-hover': '#0054E8',
                    cyan: '#19C8F5',
                    'cyan-glow': 'rgba(25, 200, 245, 0.4)',
                    light: '#F5F8FF',
                    surface: '#0A234B',
                    card: '#082046',
                    cardBorder: 'rgba(23, 105, 255, 0.2)',
                },
            },
            boxShadow: {
                'neon': '0 0 25px -5px rgba(25, 200, 245, 0.35)',
                'neon-blue': '0 0 30px -5px rgba(23, 105, 255, 0.4)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'brand-gradient': 'linear-gradient(135deg, #1769FF 0%, #19C8F5 100%)',
                'dark-gradient': 'linear-gradient(180deg, #030E1F 0%, #061A3A 100%)',
                'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(23, 105, 255, 0.25), transparent 70%)',
            },
        },
    },

    plugins: [forms],
};
