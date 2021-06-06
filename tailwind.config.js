module.exports = {
	mode: 'jit',
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./hooks/modal/modal.tsx',
	],
	darkMode: false,
	theme: {
		fontFamily: {
			roboto: ['Roboto', 'sans-serif'],
			montserrat: ['Montserrat', 'sans-serif'],
		},
		colors: {
			primary: 'var(--color-primary)',
			secondary: 'var(--color-secondary)',
			active: 'var(--color-active)',
			white: 'var(--color-white)',
			black: 'var(--color-black)',
			alert: {
				success: 'var(--color-alert-success)',
				error: 'var(--color-alert-error)',
			},
			facebook: 'var(--color-facebook)',
			transparent: 'rgba(0, 0, 0, 0)',
			'transparent-color': {
				gray: {
					200: 'var(--transparent-gray-200)',
					800: 'var(--transparent-gray-800)',
				},
			},
			gray: {
				50: 'var(--color-gray-50)',
				100: 'var(--color-gray-100)',
				200: 'var(--color-gray-200)',
				300: 'var(--color-gray-300)',
				400: 'var(--color-gray-400)',
				500: 'var(--color-gray-500)',
				600: 'var(--color-gray-600)',
				700: 'var(--color-gray-700)',
				800: 'var(--color-gray-800)',
				900: 'var(--color-gray-900)',
			},
		},
		customForms: (theme) => ({
			default: {
				checkbox: {
					iconColor: theme('colors.primary'),
				},
			},
		}),
		extend: {
			backgroundSize: {
				full: '100% 100%',
			},
			inset: {
				15: '3.563rem',
			},
			borderRadius: {
				10: '0.625rem',
				20: '1.25rem',
			},
			spacing: {
				0.5: '0.063rem',
				37: '9.125rem',
				41: '10.5rem',
				61: '15.313rem',
				75: '18.875rem',
			},
			padding: {
				18: '4.375rem',
				21: '5.313rem',
			},
			fontSize: {
				caption: '0.5rem',
				'4.5xl': '2.5rem',
			},
			borderWidth: {
				10: '0.625rem',
			},
			rotate: {
				135: '135deg',
				'-135': '-135deg',
			},
		},
	},
	variants: {
		extends: {
			backgroundOpacity: ['active'],
			// 		backgroundColor: ['disabled'],
			// 		borderColor: ['disabled'],
			// 		borderStyle: ['disabled'],
			// 		cursor: ['disabled'],
			// 		fontWeight: ['hover'],
			// 		textColor: ['disabled'],
			// 		opacity: ['disabled'],
			// 		placeholderColor: ['disabled'],
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/aspect-ratio'),
	],
};
