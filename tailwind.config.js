/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue", // For the root App.vue file
  ],
  safelist: [
    'bg-brand-50',
    'bg-white',
    'bg-gray-100',
    'bg-light-grey',
    'bg-brand-900',
    'bg-brand-primary',
    {
       pattern: /bg-(red|blue|green|yellow|orange|purple|pink|gray)-(100|200)/,
    },
    {
      pattern: /^bg-primary-(25|50|100|200|300|400|500|600|700|800|900|950)$/,
    },
    {
      pattern: /^bg-(sand|pink-light|coral-light|pink-mid|purple-light|blue-light|aqua-light|green-light|light-green|grass-light|navy-dark)$/,
    },
  ],
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
          DEFAULT: '#8B5CF6',
          foreground: 'hsl(var(--primary-foreground))',
          '25': '#FAFAFF',
          '50': '#F7F3FF',
          '100': '#F0EDFE',
          '200': '#E6D8FF',
          '300': '#C9B7FF',
          '400': '#A78BFA',
          '500': '#8B5CF6',
          '600': '#7C3AED',
          '700': '#6D28D9',
          '800': '#5B21B6',
          '900': '#4C1D95',
          '950': '#2E1065'
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
  			'remixco-blue': '#0066ff',
  			'remixco-text-primary': '#111827',
  			'remixco-text-muted': '#6b7280',
  			'remixco-hero-bg': '#E7DEFD',
  			'remixco-purple-accent': '#A78BFA',
  			'remixco-dark-purple': '#1E0D43',
  			'remixco-icon-purple': '#714AE3',
        'brand-primary': '#3713A2',
  			'brand-50': '#F7F3FF',
        'brand-100': '#F0E7FE',
        'brand-900': '#280772',
        'sand': '#fefce7',
        'pink-light': '#fef1e7',
        'coral-light': '#fee7e8',
        'pink-mid': '#fee7fa',
        'purple-light': '#f0e7fe',
        'blue-light': '#e7f0fe',
        'aqua-light': '#e7f9fe',
        'green-light': '#e7fcfe',
        'light-green': '#e7fef9',
        'grass-light': '#e7fee8',
        'light-grey': '#F1F1F1',
        'navy-dark': '#002C3A',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: ['ESRebondGrotesque', '"ES Rebond Grotesque TRIAL"', 'Inter', 'sans-serif'],
  		},
  		keyframes: {
        'slide-ltr': {
          '0%, 100%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-40%)' },
        },
        'slide-rtl': {
          '0%, 100%': { transform: 'translateX(-40%)' },
          '50%': { transform: 'translateX(0%)' },
        },
  			'accordion-down': {
  				from: { height: 0 },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: 0 }
  			}
  		},
  		animation: {
        'slide-ltr': 'slide-ltr 15s ease-in-out infinite alternate',
        'slide-rtl': 'slide-rtl 15s ease-in-out infinite alternate',
  			'accordion-down': 'accordion-down 200ms cubic-bezier(0.215, 0.61, 0.355, 1)',
  			'accordion-up': 'accordion-up 200ms cubic-bezier(0.215, 0.61, 0.355, 1)',
  		},
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.brand-900'),
            '--tw-prose-headings': theme('colors.brand-900'),
            '--tw-prose-lead': theme('colors.brand-900'),
            '--tw-prose-links': theme('colors.brand-primary'),
            '--tw-prose-bold': theme('colors.brand-900'),
            '--tw-prose-invert-body': theme('colors.brand-100'),
            '--tw-prose-invert-headings': theme('colors.brand-100'),
            '--tw-prose-invert-lead': theme('colors.brand-100'),
            '--tw-prose-invert-links': theme('colors.primary.300'),
            '--tw-prose-invert-bold': theme('colors.brand-100'),
            '--tw-prose-bullets': theme('colors.brand-primary'),
            '--tw-prose-invert-bullets': theme('colors.primary.400'),
            '--tw-prose-counters': theme('colors.brand-900'),
            '--tw-prose-invert-counters': theme('colors.primary.400'),
            p: {
              fontSize: theme('fontSize.base'),
              lineHeight: theme('lineHeight.relaxed'),
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.6'),
              fontVariantLigatures: 'stylistic',
              fontFeatureSettings: '"ss01"',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
              fontWeight: theme('fontWeight.normal'),
              fontSize: theme('fontSize.3xl'),
              lineHeight: theme('lineHeight.tight'),
              letterSpacing: theme('letterSpacing.tight'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.4'),
            },
            h3: {
              color: 'var(--tw-prose-headings)',
              fontWeight: theme('fontWeight.normal'),
              fontSize: theme('fontSize.2xl'),
              lineHeight: theme('lineHeight.8'),
              textAlign: 'center',
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.3'),
            },
            ul: {
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.6'),
              paddingLeft: theme('spacing.6'),
              listStyleType: 'disc',
            },
            ol: {
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.6'),
              paddingLeft: theme('spacing.6'),
              listStyleType: 'decimal',
            },
            li: {
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.2'),
              fontSize: theme('fontSize.base'),
              lineHeight: theme('lineHeight.relaxed'),
              color: 'var(--tw-prose-body)',
              fontVariantLigatures: 'stylistic',
              fontFeatureSettings: '"ss01"',
            },
            'li > p': {
              fontSize: theme('fontSize.base'),
              lineHeight: theme('lineHeight.relaxed'),
              color: 'var(--tw-prose-body)',
              fontVariantLigatures: 'stylistic',
              fontFeatureSettings: '"ss01"',
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.2'),
            },
            a: {
              fontWeight: '500',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
        xl: {
          css: {
            p: {
              fontSize: theme('fontSize.lg'),
              lineHeight: theme('lineHeight.relaxed'),
              marginTop: theme('spacing.5'),
              marginBottom: theme('spacing.5'),
              fontVariantLigatures: 'stylistic',
              fontFeatureSettings: '"ss01"',
            },
             h2: {
              fontSize: theme('fontSize.2xl'),
              letterSpacing: theme('letterSpacing.tight'),
              marginTop: theme('spacing.10'),
              marginBottom: theme('spacing.5'),
            },
            h3: {
              fontSize: theme('fontSize.3xl'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.4'),
            },
          },
        },
      }),
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
