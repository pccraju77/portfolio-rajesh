/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#6366f1', // Indigo 500
                    dark: '#4f46e5', // Indigo 600
                },
                secondary: {
                    DEFAULT: '#ec4899', // Pink 500
                    dark: '#db2777', // Pink 600
                },
                dark: {
                    100: '#1e293b',
                    200: '#0f172a',
                    300: '#020617',
                }
            },
            backgroundImage: {
                'hero-pattern': "linear-gradient(to right bottom, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            }
        }
    },
    plugins: [],
}
