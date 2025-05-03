/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'reddit': ['"Reddit Sans"', 'sans-serif'],
      },
      fontSize: {
        'header': ['52px', {
          lineHeight: '1.2',
          fontWeight: '600',
        }],
        'preset-3': ['32px', {
          lineHeight: '140%',
          fontWeight: '700',
          letterSpacing: '-0.3px',
        }],
        'preset-4': ['24px', {
          lineHeight: '140%',
          fontWeight: '600',
        }],
        'preset-5': ['20px', {
          lineHeight: '140%',
          fontWeight: '600',
        }],
        'preset-6': ['18px', {
          lineHeight: '120%',
          fontWeight: '500',
        }],
        'preset-7': ['15px', {
          lineHeight: '140%',
          fontWeight: '400',
          letterSpacing: '-0.3px',
        }],
      },
      spacing: {
        '125': '10px',
        '150': '12px',
        '200': '16px',
        '250': '20px',
        '300': '24px',
        '400': '32px',
        '800': '64px',
        '1000': '80px',
      },
      borderRadius: {
        '10': '10px',
        '16': '16px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      width: {
        '370': '370px',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(180deg, #F5F5FF 72.99%, #E0E0FF 100%)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        // Neutral colors
        neutral: {
          900: "#21214D",
          800: "#21214D",
          600: "#57577B",
          300: "#939397",
          200: "#C8C8D0",
          0: "#FFFFFF"
        },
        // Blue colors
        blue: {
          700: "#2A3FC4",
          600: "#4865DB",
          200: "#C0C8F7",
          100: "#E0E6FA"
        },
        // Red colors
        red: {
          700: "#E50000"
        },
        // Other colors
        rose: {
          500: "#FF8B97"
        },
        indigo: {
          300: "#B8B1FF"
        },
        sky: {
          300: "#85CAFF"
        },
        green: {
          400: "#88FF7B"
        },
        amber: {
          300: "#FFC97C"
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
