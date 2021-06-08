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
			white: 'var(--color-white)',
			black: 'var(--color-black)',
			status: {
				active: 'var(--color-status-active)',
				success: 'var(--color-status-success)',
				'success-100': 'var(--color-status-success-100)',
				error: 'var(--color-status-error)',
				'error-100': 'var(--color-status-error-100)',
				warning: 'var(--color-status-warning)',
				'warning-100': 'var(--color-status-warning-100)',
				complete: 'var(--color-status-complete)',
				'complete-100': 'var(--color-status-complete-100)',
			},
			facebook: 'var(--color-facebook)',
			transparent: {
				0: 'var(--color-transparent)',
				600: 'var(--color-transparent-600)',
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
