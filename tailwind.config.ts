import { CardDescription } from "@/components/ui/card";
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			homeIcon: {
				DEFAULT: 'hsl(var(--homeIcon))'
			},
			coinList: {
				DEFAULT: 'hsl(var(--coin-list))'
			},
			searchBar: {
				DEFAULT: 'hsl(var(--search-bar))'
			},
			magnifierIcon: {
				DEFAULT: 'hsl(var(--magnifier-icon))'
			},
			inputPlaceholder: {
				DEFAULT: 'hsl(var(--input-placeholder))'
			},
			coinTitleColor: {
				DEFAULT: 'hsl(var(--coin-title-color))'
			},
			currencyColor: {
			 DEFAULT: 'hsl(var(--currency-color))'
			},
			currencyContainer: {
			DEFAULT: 'hsl(var(--currency-container))'
			},
			currencyIconContainer: {
			DEFAULT: 'hsl(var(--currencyIcon-container))'
			},
			currencyIcon: {
			DEFAULT: 'hsl(var(--currency-icon))'
			},
			themeContainer: {
			DEFAULT: 'hsl(var(--theme-container))'
			},
			themeButton: {
			DEFAULT: 'hsl(var(--theme-button))'
			},
			compareMode: {
			DEFAULT: 'hsl(var(--compare-mode))'
			},
			compareIcon: {
			DEFAULT: 'hsl(var(--compare-icon))'
			},
			primarycard: {
				DEFAULT: 'hsl(var(--primarycard))',
				foreground: 'hsl(var(--primarycardforeground))'
			},
			copybutton: {
				DEFAULT: 'hsl(var(--copybutton))',
				foreground: 'hsl(var(--copy-button-foreground))'
			},
			borderTop: {
				DEFAULT: 'hsl(var(--borderTop))'
			},
			carouselBackground: {
				DEFAULT: 'hsl(var(--carouselBackground))'
			},
			leftChart: {
				DEFAULT: 'hsl(var(--leftChart))'
			},
			barchart: {
				DEFAULT: 'hsl(var(--bar-chart))'
			},
			coinPageImageBackground: {
				DEFAULT: 'hsl(var(--coinPageImageBackground))'
			},
			titleCardPortfolio: {
				DEFAULT: 'hsl(var(--titleCardPortfolio))'
			},
			infoCardPortfolio: {
				DEFAULT: 'hsl(var(--infoCardPortfolio))'
			},
			popup: {
				DEFAULT: 'hsl(var(--popup))',
				foreground: 'hsl(var(--popup-foreground))'
			},
			popupContainer: {
				DEFAULT: 'hsl(var(--popup-container))'
			},
			saveCoin: {
				DEFAULT: 'hsl(var(--save-coin))'
			},
			cancelCoin: {
				DEFAULT: 'hsl(var(--cancel-coin))'
			},
			navbar: {
				DEFAULT: 'hsl(var(--navbar))',
				foreground: 'hsl(var(--navbarColor))'
			},
			progressbar: {
				DEFAULT: 'hsl(var(--progressbar))',
				foreground: 'hsl(var(--progressbar-foreground))'
			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
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
  		}
  	},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

