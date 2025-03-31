module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            baby: {
                blue: '#A7C7E7',
                pink: '#FACDE6',
                mint: '#C1E1C1',
                yellow: '#FFEAAC',
                lavender: '#D8C2FF',
            },
            primary: {
                light: '#B8D8F3',
                DEFAULT: '#6EA7DE',
                dark: '#4A83C9',
            },
            secondary: {
                light: '#FACDE6',
                DEFAULT: '#F7A4CF',
                dark: '#E97EB7',
            },
        },
        fontFamily: {
            round: ['Nunito', 'sans-serif'],
        },
        boxShadow: {
            'soft': '0 4px 10px rgba(0, 0, 0, 0.05)',
            'soft-lg': '0 10px 15px rgba(0, 0, 0, 0.05)',
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
