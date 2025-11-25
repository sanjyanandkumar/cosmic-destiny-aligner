import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        sans: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
		poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cosmic: {
          indigo: "hsl(var(--cosmic-indigo))",
          gold: "hsl(var(--solar-gold))",
          white: "hsl(var(--ethereal-white))",
          black: "hsl(var(--void-black))",
          blue: "hsl(var(--celestial-blue))",
          rose: "hsl(var(--rose-quartz))",
          teal: "hsl(var(--mystic-teal))",
          dark: "hsl(var(--cosmic-dark))",
          deep: "hsl(var(--cosmic-deep))",
          purple: "hsl(var(--cosmic-purple))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        divine: {
          gold: "hsl(var(--divine-gold))",
          glow: "hsl(var(--divine-glow))",
        },
      },
      backgroundImage: {
        "gradient-cosmic": "var(--gradient-cosmic-dawn)",
        "gradient-celestial": "var(--gradient-celestial-veil)",
        "gradient-solar": "var(--gradient-solar-drift)",
        "gradient-gold": "var(--gradient-gold-shimmer)",
        'gradient-divine': 'var(--gradient-divine)',
      },
      boxShadow: {
        cosmic: "var(--shadow-cosmic)",
        deep: "var(--shadow-deep)",
        planet: 'var(--shadow-planet)',
        glow: 'var(--shadow-glow)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        flash: {
            "0%, 100%": { opacity: "1", transform: "scale(1)" },
            "50%": { opacity: ".25", transform: "scale(1.12)" },
          },
          "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        flash: "flash 1.1s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "orbit": "orbit 60s linear infinite",
        "glow": "glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
